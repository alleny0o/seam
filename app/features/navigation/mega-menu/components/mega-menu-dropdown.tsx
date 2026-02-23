import {useRef, useEffect, useState} from 'react';
import {m, AnimatePresence} from 'motion/react';
import {stegaClean} from '@sanity/client/stega';

import {useMegaMenu} from '../context/mega-menu-context';
import {useHeaderSettings} from '~/features/header';
import {useMegaMenuStyles} from '../hooks/use-mega-menu-styles';
import {useMegaMenuHeight} from '../hooks/use-mega-menu-height';
import {useMegaMenuScrollLock} from '../hooks/use-mega-menu-scroll-lock';
import {useMegaMenuOverlay} from '../hooks/use-mega-menu-overlay';

import {GridRenderer} from './renderers/grid-renderer';
import {SectionRenderer} from './renderers/section-renderer';

import {getDropdownVariant} from '../animations/dropdown-variants';

// Animation defaults
const DEFAULT_ANIMATION_TYPE = 'slideFade';
const DEFAULT_ANIMATION_DURATION_MS = 250;
const MS_TO_SECONDS = 1000;
const ANIMATION_EASING: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/**
 * Main mega menu dropdown container
 * Handles visibility, refs, and delegates rendering to mode-specific renderers
 */
export function MegaMenuDropdown() {
  const {openMenu, registerDropdownRef, closeMenu} = useMegaMenu();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const [shouldAnimateContent, setShouldAnimateContent] = useState(false);

  const styles = useMegaMenuStyles();
  const header = useHeaderSettings();
  const animationType = stegaClean(header?.desktopMegaMenuAnimation) ?? DEFAULT_ANIMATION_TYPE;
  const duration =
    (header?.desktopMegaMenuAnimationDuration ?? DEFAULT_ANIMATION_DURATION_MS) /
    MS_TO_SECONDS;
  const maxHeight = useMegaMenuHeight(!!openMenu);

  // Apply scroll lock when menu is open (if enabled)
  useMegaMenuScrollLock(!!openMenu);

  // Get overlay configuration
  const overlayConfig = useMegaMenuOverlay(!!openMenu);

  // Track if menu is opening for first time vs switching tabs
  useEffect(() => {
    if (openMenu && !wasOpenRef.current) {
      // Menu just opened from closed state - ANIMATE
      setShouldAnimateContent(true);
      wasOpenRef.current = true;
    } else if (openMenu && wasOpenRef.current) {
      // Menu was already open, just switching tabs - NO ANIMATION
      setShouldAnimateContent(false);
    } else if (!openMenu) {
      // Menu closed - reset
      wasOpenRef.current = false;
      setShouldAnimateContent(false);
    }
  }, [openMenu]);

  useEffect(() => {
    if (dropdownRef.current) {
      registerDropdownRef(dropdownRef.current);
    }
  }, [registerDropdownRef, openMenu]);

  // Close mega menu on page scroll
  useEffect(() => {
    if (!openMenu) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        closeMenu();
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openMenu, closeMenu]);

  // Check if menu has any content
  const hasContent =
    stegaClean(openMenu?.layout) === 'grid'
      ? openMenu?.content?.length
      : [
          openMenu?.section1,
          openMenu?.section2,
          openMenu?.section3,
          openMenu?.section4,
          openMenu?.section5,
          openMenu?.section6,
        ].some((section) => section?.length);

  return (
    <>
      {/* Styles - always rendered so CSS vars are available */}
      <style dangerouslySetInnerHTML={{__html: styles}} />

      {/* Overlay */}
      {overlayConfig.showOverlay && (
        <div
          className="absolute top-full right-0 bottom-0 left-0 z-30 bg-black"
          style={{
            ...overlayConfig.overlayStyles,
            height: '100vh',
          }}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Animated Dropdown */}
      <AnimatePresence>
        {openMenu && hasContent && (
          <m.div
            ref={dropdownRef}
            id="mega-menu-dropdown"
            role="menu"
            aria-label="Submenu"
            data-mega-menu-dropdown
            className="absolute top-full right-0 left-0 z-40 overflow-y-auto bg-background"
            style={{maxHeight}}
            initial="hidden"
            animate="visible"
            exit="visible"
            variants={getDropdownVariant(animationType)}
            transition={{
              duration,
              ease: ANIMATION_EASING,
            }}
          >
            <div className="container">
              {stegaClean(openMenu.layout) === 'grid' ? (
                <GridRenderer
                  menu={openMenu}
                  shouldAnimate={shouldAnimateContent}
                />
              ) : (
                <SectionRenderer
                  menu={openMenu}
                  shouldAnimate={shouldAnimateContent}
                />
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}