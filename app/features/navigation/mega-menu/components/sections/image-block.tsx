import {stegaClean} from '@sanity/client/stega';
import {SanityReferenceLink} from '~/components/sanity/link/sanity-reference-link';
import {SanityImage} from '~/components/sanity/sanity-image';
import {useHeaderSettings} from '~/features/header';
import {useTypographyCssVars} from '~/hooks/use-typography-css-vars';
import {getHoverClasses} from '~/utils/hover-classes';
import {getCardHoverClasses} from '~/utils/card-hover-classes';
import {
  ASPECT_RATIOS,
  BORDER_RADIUS,
  CTA_BORDER_RADIUS,
  OVERLAY_TEXT_COLORS,
  CTA_COLOR_SCHEMES,
  type AspectRatio,
  type BorderRadius,
  type CTABorderRadius,
  type OverlayTextColor,
  type CTAColorScheme,
} from '~/features/navigation/mega-menu/constants';
import type {ImageBlockType} from '~/features/navigation/types';
import type {SanityImage as SanityImageType} from 'types';
import type {CSSProperties} from 'react';

// Default values for image block styling
const DEFAULT_OVERLAY_OPACITY = 60;
const DEFAULT_CTA_PADDING_X = 16;
const DEFAULT_CTA_PADDING_Y = 8;

interface ImageBlockProps {
  data: ImageBlockType;
  className?: string;
}

/**
 * Renders an image block within the mega menu
 * Supports overlay and below-image content layouts with customizable CTAs
 */
export function ImageBlock({data, className}: ImageBlockProps) {
  const header = useHeaderSettings();

  // Generate typography CSS for all three text elements
  const headingTypographyCss = useTypographyCssVars({
    selector: '#mega-menu-dropdown .image-block-heading',
    override: header?.desktopMegaMenuImageBlockHeadingTypography,
  });

  const descriptionTypographyCss = useTypographyCssVars({
    selector: '#mega-menu-dropdown .image-block-description',
    override: header?.desktopMegaMenuImageBlockDescriptionTypography,
  });

  const ctaTypographyCss = useTypographyCssVars({
    selector: '#mega-menu-dropdown .image-block-cta',
    override: header?.desktopMegaMenuCTATypography,
  });

  // Map Sanity values to classes/values
  const aspectRatioValue = ASPECT_RATIOS[stegaClean(data.aspectRatio) as AspectRatio] || '1/1';
  const borderRadiusClass = BORDER_RADIUS[stegaClean(data.borderRadius) as BorderRadius] || BORDER_RADIUS['none'];
  const overlayTextColorClass = OVERLAY_TEXT_COLORS[stegaClean(data.overlayTextColor) as OverlayTextColor] || OVERLAY_TEXT_COLORS['white'];

  // Get content layout mode and overlay opacity
  const contentLayout = stegaClean(data.contentLayout) || 'overlay';
  const overlayOpacity = data.overlayOpacity ?? DEFAULT_OVERLAY_OPACITY;

  // Get image hover effect class
  const imageHoverClass = getCardHoverClasses(stegaClean(data.hoverEffect));

  // CTA rendering helper function
  const renderCTA = () => {
    if (!data.linkText) return null;

    const linkStyle = stegaClean(data.linkStyle) || 'text';
    const ctaHoverClass = getHoverClasses(stegaClean(data.ctaHoverEffect));

    // TEXT ONLY STYLE
    if (linkStyle === 'text') {
      const textContent = (
        <span className={`image-block-cta ${ctaHoverClass}`}>
          {data.linkText}
        </span>
      );

      return data.link ? (
        <SanityReferenceLink data={data.link}>
          {textContent}
        </SanityReferenceLink>
      ) : (
        textContent
      );
    }

    // BUTTON STYLES (filled, outlined, ghost)
    const colorScheme =
      CTA_COLOR_SCHEMES[stegaClean(data.ctaColorScheme) as CTAColorScheme] ||
      CTA_COLOR_SCHEMES.primary;
    const borderRadius =
      CTA_BORDER_RADIUS[stegaClean(data.ctaBorderRadius) as CTABorderRadius] ||
      CTA_BORDER_RADIUS.md;
    const paddingX = data.ctaPaddingX ?? DEFAULT_CTA_PADDING_X;
    const paddingY = data.ctaPaddingY ?? DEFAULT_CTA_PADDING_Y;

    const baseClasses = `inline-block image-block-cta ${borderRadius} ${ctaHoverClass}`;
    
    let styleClasses = '';
    let inlineStyles: CSSProperties = {
      paddingLeft: `${paddingX}px`,
      paddingRight: `${paddingX}px`,
      paddingTop: `${paddingY}px`,
      paddingBottom: `${paddingY}px`,
    };

    switch (linkStyle) {
      case 'filled':
        inlineStyles = {
          ...inlineStyles,
          backgroundColor: colorScheme.bg,
          color: colorScheme.text,
        };
        break;

      case 'outlined':
        styleClasses = 'border-2 bg-transparent';
        inlineStyles = {
          ...inlineStyles,
          borderColor: colorScheme.border,
          color: contentLayout === 'overlay' ? 'inherit' : colorScheme.text,
        };
        break;

      case 'ghost':
        styleClasses = 'bg-white/10 hover:bg-white/20 transition-colors';
        inlineStyles = {
          ...inlineStyles,
          color: contentLayout === 'overlay' ? 'inherit' : colorScheme.text,
        };
        break;
    }

    const buttonContent = (
      <span className={`${baseClasses} ${styleClasses}`} style={inlineStyles}>
        {data.linkText}
      </span>
    );

    return data.link ? (
      <SanityReferenceLink data={data.link}>
        {buttonContent}
      </SanityReferenceLink>
    ) : (
      buttonContent
    );
  };

  // Type guard for image
  if (!data.image) return null;

  // OVERLAY MODE
  if (contentLayout === 'overlay') {
    const overlayContent = (
      <>
        {/* Image */}
        <SanityImage
          data={data.image as SanityImageType}
          aspectRatio={aspectRatioValue}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="h-full w-full object-cover"
          showBorder={false}
          showShadow={false}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-linear-to-t from-black to-transparent pointer-events-none"
          style={{opacity: overlayOpacity / 100}}
        />

        {/* Text Content - Bottom Left (Not clickable) */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
          <div className={`space-y-3 ${overlayTextColorClass}`}>
            {data.heading && (
              <h3 className="image-block-heading">
                {data.heading}
              </h3>
            )}

            {data.description && (
              <p className="image-block-description">
                {data.description}
              </p>
            )}

            {/* CTA is clickable - restore pointer events */}
            <div className="image-block-cta pointer-events-auto">
              {renderCTA()}
            </div>
          </div>
        </div>
      </>
    );

    return (
      <div className={className}>
        {/* Typography CSS */}
        <style dangerouslySetInnerHTML={{__html: headingTypographyCss + descriptionTypographyCss + ctaTypographyCss}} />

        {data.link ? (
          <SanityReferenceLink data={data.link} className="block">
            <div className={`group relative overflow-hidden ${borderRadiusClass} ${imageHoverClass}`}>
              {overlayContent}
            </div>
          </SanityReferenceLink>
        ) : (
          <div className={`group relative overflow-hidden ${borderRadiusClass} ${imageHoverClass}`}>
            {overlayContent}
          </div>
        )}
      </div>
    );
  }

  // BELOW MODE
  const belowImage = (
    <SanityImage
      data={data.image as SanityImageType}
      aspectRatio={aspectRatioValue}
      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
      className="h-full w-full object-cover"
      showBorder={false}
      showShadow={false}
    />
  );

  return (
    <div className={className}>
      <div className="space-y-4">
        {/* Typography CSS */}
        <style dangerouslySetInnerHTML={{__html: headingTypographyCss + descriptionTypographyCss + ctaTypographyCss}} />

        {/* Heading Above Image (Not clickable) */}
        {data.heading && (
          <h3 className="image-block-heading">
            {data.heading}
          </h3>
        )}

        {/* Image - Clickable */}
        {data.link ? (
          <SanityReferenceLink data={data.link} className="block">
            <div className={`group relative overflow-hidden ${borderRadiusClass} ${imageHoverClass}`}>
              {belowImage}
            </div>
          </SanityReferenceLink>
        ) : (
          <div className={`group relative overflow-hidden ${borderRadiusClass} ${imageHoverClass}`}>
            {belowImage}
          </div>
        )}

        {/* Content Below Image (Not clickable except CTA) */}
        <div className="space-y-3">
          {data.description && (
            <p className="image-block-description text-muted-foreground">
              {data.description}
            </p>
          )}

          {renderCTA()}
        </div>
      </div>
    </div>
  );
}