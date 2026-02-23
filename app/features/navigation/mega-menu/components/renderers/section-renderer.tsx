import {m} from 'motion/react';
import {stegaClean} from '@sanity/client/stega';
import {isType} from '~/utils/sanity-utils';
import {LinkSection} from '../sections/link-section';
import {ImageBlock} from '../sections/image-block';
import {SECTION_PRESETS, type SectionPreset} from '~/features/navigation/mega-menu/constants';
import type {MegaMenuType} from '~/features/navigation/types';
import {useHeaderSettings} from '~/features/header';
import {getStaggerVariant} from '../../animations/stagger-variants';

// Animation constants
const DEFAULT_STAGGER_DELAY_MS = 50;
const DEFAULT_STAGGER_START_DELAY_MS = 0;
const STAGGER_ANIMATION_DURATION = 0.3;
const STAGGER_ANIMATION_EASING: [number, number, number, number] = [0.04, 0.62, 0.23, 0.98];
const MS_TO_SECONDS = 1000;

interface SectionRendererProps {
  menu: MegaMenuType;
  shouldAnimate: boolean;
}

/**
 * Renders mega menu in section mode
 * Blocks are organized into vertical columns based on the selected preset
 */
export function SectionRenderer({menu, shouldAnimate}: SectionRendererProps) {
  const preset =
    SECTION_PRESETS[stegaClean(menu.sectionPreset) as SectionPreset] ||
    SECTION_PRESETS['4-sections'];

  // Get stagger settings from header
  const header = useHeaderSettings();
  const staggerType = stegaClean(header?.desktopMegaMenuContentStagger) ?? 'none';
  const staggerDelay =
    (header?.desktopMegaMenuStaggerDelay ?? DEFAULT_STAGGER_DELAY_MS) / MS_TO_SECONDS;
  const staggerStartDelay =
    (header?.desktopMegaMenuStaggerStartDelay ?? DEFAULT_STAGGER_START_DELAY_MS) /
    MS_TO_SECONDS;

  return (
    <div className={`grid ${preset.gridCols} gap-6 section-padding`}>
      {preset.spanClasses.map((spanClass, idx) => {
        const sectionKey = `section${idx + 1}` as
          | 'section1'
          | 'section2'
          | 'section3'
          | 'section4'
          | 'section5'
          | 'section6';
        const blocks = menu[sectionKey];

        // Always render the section container, even if empty
        return (
          <div
            key={sectionKey}
            className={`${spanClass} flex flex-col gap-x-6 gap-y-9`}
          >
            {blocks?.map((block, blockIndex) => {
              let content = null;

              if (isType(block, 'linkSection')) {
                content = <LinkSection data={block} />;
              } else if (isType(block, 'imageBlock')) {
                content = <ImageBlock data={block} />;
              }

              if (!content) return null;

              // If should animate, wrap in motion div
              if (shouldAnimate && staggerType !== 'none') {
                return (
                  <m.div
                    key={block._key}
                    initial="hidden"
                    animate="visible"
                    variants={getStaggerVariant(staggerType)}
                    transition={{
                      duration: STAGGER_ANIMATION_DURATION,
                      ease: STAGGER_ANIMATION_EASING,
                      delay: staggerStartDelay + blockIndex * staggerDelay,
                    }}
                  >
                    {content}
                  </m.div>
                );
              }

              // Otherwise, just render plain div
              return <div key={block._key}>{content}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
}