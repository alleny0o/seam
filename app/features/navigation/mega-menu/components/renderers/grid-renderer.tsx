import {m} from 'motion/react';
import {stegaClean} from '@sanity/client/stega';
import {isType} from '~/utils/sanity-utils';
import {LinkSection} from '../sections/link-section';
import {ImageBlock} from '../sections/image-block';
import {GRID_LAYOUTS, type GridLayout} from '~/features/navigation/mega-menu/constants';
import type {MegaMenuType} from '~/features/navigation/types';
import {useHeaderSettings} from '~/features/header';
import {getStaggerVariant} from '../../animations/stagger-variants';

// Animation constants
const DEFAULT_STAGGER_DELAY_MS = 50;
const DEFAULT_STAGGER_START_DELAY_MS = 0;
const STAGGER_ANIMATION_DURATION = 0.3;
const STAGGER_ANIMATION_EASING: [number, number, number, number] = [0.04, 0.62, 0.23, 0.98];
const MS_TO_SECONDS = 1000;
const DEFAULT_GRID_COLUMN_CLASS = 'col-span-3';

interface GridRendererProps {
  menu: MegaMenuType;
  shouldAnimate: boolean;
}

/**
 * Renders mega menu in grid mode
 * All blocks flow in a uniform grid with the same column span
 */
export function GridRenderer({menu, shouldAnimate}: GridRendererProps) {
  const gridColumnClass =
    GRID_LAYOUTS[stegaClean(menu.gridLayout) as GridLayout] || DEFAULT_GRID_COLUMN_CLASS;

  // Get stagger settings from header
  const header = useHeaderSettings();
  const staggerType = stegaClean(header?.desktopMegaMenuContentStagger) ?? 'none';
  const staggerDelay =
    (header?.desktopMegaMenuStaggerDelay ?? DEFAULT_STAGGER_DELAY_MS) / MS_TO_SECONDS;
  const staggerStartDelay =
    (header?.desktopMegaMenuStaggerStartDelay ?? DEFAULT_STAGGER_START_DELAY_MS) /
    MS_TO_SECONDS;

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-9 section-padding">
      {menu.content?.map((block, index) => {
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
              className={gridColumnClass}
              initial="hidden"
              animate="visible"
              variants={getStaggerVariant(staggerType)}
              transition={{
                duration: STAGGER_ANIMATION_DURATION,
                ease: STAGGER_ANIMATION_EASING,
                delay: staggerStartDelay + index * staggerDelay,
              }}
            >
              {content}
            </m.div>
          );
        }

        // Otherwise, just render plain div
        return (
          <div key={block._key} className={gridColumnClass}>
            {content}
          </div>
        );
      })}
    </div>
  );
}