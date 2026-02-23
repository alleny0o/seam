import React from 'react';
import {stegaClean} from '@sanity/client/stega';

import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useColorsCssVars} from '~/hooks/use-colors-css-vars';
import {useTypographyCssVars} from '~/hooks/use-typography-css-vars';
import {useRootLoaderData} from '~/root';

import {
  AnnouncementRotator,
  AnnouncementRotatorContent,
  AnnouncementRotatorItem,
  AnnouncementRotatorNext,
  AnnouncementRotatorPrevious,
} from '~/components/ui/announcement-rotator';

import {AnnouncementItem} from './announcement-item';

import {SanityInternalLink} from '~/components/sanity/link/sanity-internal-link';
import {SanityExternalLink} from '~/components/sanity/link/sanity-external-link';
import type {AnnouncementBarEntry, UtilityLink} from '../../types';
import {
  LocaleSelector,
  resolveLocaleSelectorConfig,
  type RawSanityLocaleSelectorConfig,
} from '~/features/locale';

/** Default padding value in pixels when not specified */
const DEFAULT_PADDING = 0;
/** Default arrow icon size in pixels */
const DEFAULT_ARROW_SIZE = 24;
/** Default arrow stroke width */
const DEFAULT_ARROW_STROKE_WIDTH = 2;
/** Padding offset for visual alignment in pixels */
const PADDING_OFFSET = 2;

/**
 * Displays a rotating announcement bar with optional navigation arrows and utility links.
 * Supports auto-rotation, fade/slide transitions, and customizable styling via Sanity CMS.
 */
export function AnnouncementBar() {
  const {sanityRoot} = useRootLoaderData();
  const data = sanityRoot?.data as ROOT_QUERYResult | undefined;
  const header = data?.header;
  const announcementBar = header?.announcementBar;
  const utilityLinks = header?.announcementBarUtilityLinks;

  const paddingTop = header?.announcementBarPadding?.top ?? DEFAULT_PADDING;
  const paddingBottom =
    header?.announcementBarPadding?.bottom ?? DEFAULT_PADDING;

  const isArrowsActive =
    header?.showAnnouncementArrows && (announcementBar?.length ?? 0) > 1;

  const showLocaleSelector = header?.showAnnouncementBarLocaleSelector ?? false;

  const isUtilitiesActive =
    (utilityLinks?.length ?? 0) > 0 || showLocaleSelector;

  const colorsCssVars = useColorsCssVars({
    selector: `#announcement-bar`,
    settings: {
      colorScheme: header?.announcementBarColorScheme ?? null,
      customCss: null,
      hide: null,
      padding: header?.announcementBarPadding ?? null,
    },
  });

  const announcementTypographyCss = useTypographyCssVars({
    selector: '#announcement-bar .announcement-text',
    override: header?.announcementBarTypography,
  });

  const utilityLinksTypographyCss = useTypographyCssVars({
    selector: '#announcement-bar .utility-links',
    override: header?.utilityLinksTypography,
  });

  const arrowStyleCss = `
    #announcement-bar {
      --arrow-size: ${header?.announcementArrowSize ?? DEFAULT_ARROW_SIZE}px;
      --arrow-stroke-width: ${header?.announcementArrowStrokeWidth ?? DEFAULT_ARROW_STROKE_WIDTH};
    }
  `;

  if (!announcementBar) return null;

  return (
    <section
      className="relative container overflow-hidden bg-background px-0! text-foreground sm:px-0! md:px-0!"
      id="announcement-bar"
      data-announcement-bar
    >
      <div
        className={`${isArrowsActive && isUtilitiesActive ? 'lg:px-(--container-padding)' : ''} ${
          isArrowsActive ? 'lg:pl-(--container-padding)' : ''
        } ${isUtilitiesActive ? 'lg:pr-(--container-padding)' : ''}`}
      >
        {/* Inject color and typography CSS vars */}
        <style
          dangerouslySetInnerHTML={{
            __html:
              colorsCssVars +
              announcementTypographyCss +
              utilityLinksTypographyCss +
              arrowStyleCss,
          }}
        />

        <div>
          <AnnouncementRotator
            autoRotate={header?.autoRotateAnnouncements ?? false}
            transitionMode={header?.fadeTransition ? 'fade' : 'slide'}
            className="relative"
          >
            {isArrowsActive && (
              <div className="pointer-events-auto absolute top-0 bottom-0 left-0 z-10 hidden items-center gap-0 bg-background lg:flex">
                <AnnouncementRotatorPrevious
                  className="shrink-0 rounded-md"
                  aria-label="Previous announcement"
                >
                  <ChevronLeft
                    className="announcement-arrow"
                    aria-hidden="true"
                  />
                </AnnouncementRotatorPrevious>

                <AnnouncementRotatorNext
                  className="shrink-0 rounded-md"
                  aria-label="Next announcement"
                >
                  <ChevronRight
                    className="announcement-arrow"
                    aria-hidden="true"
                  />
                </AnnouncementRotatorNext>
              </div>
            )}

            <AnnouncementRotatorContent
              className={`select-none [&>div]:pointer-events-auto [&>div]:overflow-visible ${
                isArrowsActive && !isUtilitiesActive
                  ? 'lg:pr-(--container-padding)'
                  : ''
              } ${!isArrowsActive && isUtilitiesActive ? 'lg:pl-(--container-padding)' : ''}`}
              style={{
                paddingTop: `calc(${paddingTop}px + ${PADDING_OFFSET}px)`,
                paddingBottom: `calc(${paddingBottom}px + ${PADDING_OFFSET}px)`,
              }}
            >
              {announcementBar.map((item: AnnouncementBarEntry) => (
                <AnnouncementRotatorItem key={item._key}>
                  <div className="announcement-text flex items-center justify-center lg:px-[var(--container-padding)*2]">
                    <AnnouncementItem {...item} />
                  </div>
                </AnnouncementRotatorItem>
              ))}
            </AnnouncementRotatorContent>
          </AnnouncementRotator>
        </div>
      </div>

      {isUtilitiesActive && (
        <nav
          className="utility-links pointer-events-auto absolute top-0 right-(--container-padding) bottom-0 z-10 hidden items-center justify-end gap-5 border-l border-current bg-background pl-4 lg:flex"
          aria-label="Utility links"
        >
          {utilityLinks?.map((link: UtilityLink) => (
            <React.Fragment key={link._key}>
              {stegaClean(link._type) === 'internalLink' && (
                <SanityInternalLink
                  data={link as Extract<UtilityLink, {_type: 'internalLink'}>}
                  className="cursor-pointer"
                >
                  {link.name}
                </SanityInternalLink>
              )}
              {stegaClean(link._type) === 'externalLink' && (
                <SanityExternalLink
                  data={link as Extract<UtilityLink, {_type: 'externalLink'}>}
                  className="cursor-pointer"
                >
                  {link.name}
                </SanityExternalLink>
              )}
            </React.Fragment>
          ))}
          {showLocaleSelector && header?.announcementBarLocaleSelector && (
            <LocaleSelector
              config={resolveLocaleSelectorConfig(
                header.announcementBarLocaleSelector as RawSanityLocaleSelectorConfig,
              )}
              placementId="announcementBar"
            />
          )}
        </nav>
      )}
    </section>
  );
}
