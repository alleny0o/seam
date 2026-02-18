import {useEffect, type CSSProperties} from 'react';
import {AnimatePresence, m} from 'motion/react';
import * as Popover from '@radix-ui/react-popover';
import {cn} from '~/lib/utils';
import type {RawDropdownConfig} from '../types';

interface LocaleDropdownProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  /**
   * When true, always opens upward.
   * Used when locale selector is rendered inside the mobile menu.
   */
  forceUpward?: boolean;
  /** Dropdown container styling from Sanity dropdownConfig */
  dropdownConfig?: RawDropdownConfig;
  children: React.ReactNode;
}

const ENTER_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/**
 * Resolves Sanity dropdownConfig into inline styles for the panel.
 * Uses inline styles because values are dynamic — can't use Tailwind classes.
 */
function resolveDropdownStyles(config: RawDropdownConfig): CSSProperties {
  if (!config) return {};

  const styles: CSSProperties = {};

  if (config.borderRadius != null) {
    styles.borderRadius = `${config.borderRadius}px`;
  }

  if (config.shadow) {
    const shadowMap: Record<string, string> = {
      none: 'none',
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    };
    styles.boxShadow = shadowMap[config.shadow] ?? shadowMap.md;
  }

  if (config.showBorder && config.borderWidth != null) {
    styles.borderWidth = `${config.borderWidth}px`;
    styles.borderStyle = 'solid';
  } else if (!config.showBorder) {
    styles.border = 'none';
  }

  return styles;
}

/**
 * Locale selector dropdown container using Radix Popover.
 *
 * - Portals to document.body — never trapped under headers or stacking contexts
 * - Collision-aware positioning out of the box (flips, shifts, stays in viewport)
 * - forceUpward forces upward alignment (used inside mobile menu)
 * - Click outside and Escape handled by Radix
 * - Closes on scroll via document capture listener
 * - Motion animation via AnimatePresence + m.div
 * - dropdownConfig applies dynamic border radius, shadow, and border from Sanity
 */
export function LocaleDropdown({
  isOpen,
  onOpenChange,
  trigger,
  forceUpward = false,
  dropdownConfig,
  children,
}: LocaleDropdownProps) {
  // Radix has no built-in close-on-scroll. We attach to document in capture
  // phase so scroll on any element (not just window) triggers the close.
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => onOpenChange(false);
    document.addEventListener('scroll', handleScroll, {
      passive: true,
      capture: true,
    });
    return () =>
      document.removeEventListener('scroll', handleScroll, {capture: true});
  }, [isOpen, onOpenChange]);

  const dropdownStyles = resolveDropdownStyles(dropdownConfig);

  return (
    <Popover.Root open={isOpen} onOpenChange={onOpenChange}>
      {/* asChild merges Radix trigger behaviour onto our button */}
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Popover.Portal>
        {/*
         * forceMount keeps content in the DOM so AnimatePresence can
         * play the exit animation before unmounting.
         * pointer-events-none when closed prevents the invisible panel
         * from intercepting clicks.
         */}
        <Popover.Content
          forceMount
          side={forceUpward ? 'top' : 'bottom'}
          align="start"
          sideOffset={6}
          avoidCollisions={!forceUpward}
          collisionPadding={8}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn('z-70 outline-none', !isOpen && 'pointer-events-none')}
        >
          <AnimatePresence>
            {isOpen && (
              <m.div
                key="locale-dropdown"
                role="dialog"
                aria-label="Select country and language"
                className={cn(
                  'w-[min(320px,calc(100vw-16px))]',
                  'border bg-background p-4',
                  'max-h-[min(400px,calc(100vh-80px))] overflow-y-auto',
                )}
                style={dropdownStyles}
                initial={{opacity: 0, y: forceUpward ? 4 : -4}}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {duration: 0.2, ease: ENTER_EASE},
                }}
                exit={{
                  opacity: 0,
                  y: forceUpward ? 4 : -4,
                  transition: {duration: 0.15},
                }}
              >
                {children}
              </m.div>
            )}
          </AnimatePresence>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
