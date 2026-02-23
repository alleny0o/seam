import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import {useNavigation} from 'react-router';
import {stegaClean} from '@sanity/client/stega';
import {useHeaderSettings} from '~/features/header';
import type {MegaMenuType} from '../../types';

// Timing and threshold constants
const HOVER_ACTIVATION_DELAY_MS = 100;
const MOUSE_TOLERANCE_PX = 5;
const LG_BREAKPOINT_PX = 1024;

interface MegaMenuContextType {
  openMenu: MegaMenuType | null;
  setOpenMenu: (menu: MegaMenuType | null) => void;
  closeMenu: () => void;
  behavior: 'hover' | 'click';
  allowParentLinks: boolean;
  registerItemRef: (ref: HTMLElement | null) => void;
  registerDropdownRef: (ref: HTMLElement | null) => void;
}

const MegaMenuContext = createContext<MegaMenuContextType | null>(null);

/**
 * Provides mega menu state and behavior to child components
 * Handles open/close logic, mouse tracking, and click-outside detection
 */
export function MegaMenuProvider({children}: {children: ReactNode}) {
  const [openMenu, setOpenMenu] = useState<MegaMenuType | null>(null);
  const navigation = useNavigation();

  const dropdownRef = useRef<HTMLElement | null>(null);

  const header = useHeaderSettings();
  const behaviorSetting = stegaClean(header?.desktopMegaMenuBehavior) ?? 'hover';
  const behavior: 'hover' | 'click' =
    behaviorSetting === 'click' ? 'click' : 'hover';
  const allowParentLinks = header?.desktopAllowMegaMenuParentLinks ?? true;

  const closeMenu = useCallback(() => {
    setOpenMenu(null);
  }, []);

  const registerItemRef = useCallback((ref: HTMLElement | null) => {
    // No longer needed - keeping for backwards compatibility
  }, []);

  const registerDropdownRef = useCallback((ref: HTMLElement | null) => {
    dropdownRef.current = ref;
  }, []);

  // Auto-close when navigating
  useEffect(() => {
    if (navigation.state === 'loading') {
      closeMenu();
    }
  }, [navigation.state, closeMenu]);

  // HOVER MODE: Track mouse with requestAnimationFrame for best performance
  useEffect(() => {
    if (!openMenu || behavior !== 'hover') return;

    let isMouseMoveActive = false;
    let rafId: number | null = null;

    const activationTimeout = setTimeout(() => {
      isMouseMoveActive = true;
    }, HOVER_ACTIVATION_DELAY_MS);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseMoveActive) return;

      // If we already have a pending frame, skip this event
      if (rafId !== null) return;

      // Schedule check for next animation frame
      rafId = requestAnimationFrame(() => {
        rafId = null;

        if (!dropdownRef.current) return;

        const navBar = document.querySelector('#header-nav');
        if (!navBar) return;

        const navRect = navBar.getBoundingClientRect();
        const dropdownRect = dropdownRef.current.getBoundingClientRect();

        const isInNav =
          e.clientX >= navRect.left - MOUSE_TOLERANCE_PX &&
          e.clientX <= navRect.right + MOUSE_TOLERANCE_PX &&
          e.clientY >= navRect.top - MOUSE_TOLERANCE_PX &&
          e.clientY <= navRect.bottom + MOUSE_TOLERANCE_PX;

        const isInDropdown =
          e.clientX >= dropdownRect.left - MOUSE_TOLERANCE_PX &&
          e.clientX <= dropdownRect.right + MOUSE_TOLERANCE_PX &&
          e.clientY >= dropdownRect.top - MOUSE_TOLERANCE_PX &&
          e.clientY <= dropdownRect.bottom + MOUSE_TOLERANCE_PX;

        if (!isInNav && !isInDropdown) {
          closeMenu();
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove, {passive: true});

    return () => {
      clearTimeout(activationTimeout);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [openMenu, behavior, closeMenu]);

  // CLICK MODE: Click outside to close
  useEffect(() => {
    if (!openMenu || behavior !== 'click') return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInNav = target.closest('#header-nav');
      const isInDropdown = target.closest('[data-mega-menu-dropdown]');

      if (!isInNav && !isInDropdown) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenu, behavior, closeMenu]);

  // Close menu when screen becomes smaller than lg breakpoint
  useEffect(() => {
    if (!openMenu) return;

    const handleResize = () => {
      if (window.innerWidth < LG_BREAKPOINT_PX) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [openMenu, closeMenu]);

  return (
    <MegaMenuContext.Provider
      value={{
        openMenu,
        setOpenMenu,
        closeMenu,
        behavior,
        allowParentLinks,
        registerItemRef,
        registerDropdownRef,
      }}
    >
      {children}
    </MegaMenuContext.Provider>
  );
}

/**
 * Hook to access mega menu state and controls
 * Must be used within a MegaMenuProvider
 */
export function useMegaMenu(): MegaMenuContextType {
  const context = useContext(MegaMenuContext);
  if (!context) {
    throw new Error('useMegaMenu must be used within MegaMenuProvider');
  }
  return context;
}
