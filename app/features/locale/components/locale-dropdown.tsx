import {useEffect} from 'react';
import * as Popover from '@radix-ui/react-popover';
import {cn} from '~/lib/utils';

interface LocaleDropdownProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  /**
   * When true, always opens upward.
   * Used when locale selector is rendered inside the mobile menu.
   */
  forceUpward?: boolean;
  children: React.ReactNode;
}

/**
 * Locale selector dropdown container using Radix Popover.
 *
 * - Portals to document.body — never trapped under headers or stacking contexts
 * - Collision-aware positioning out of the box (flips, shifts, stays in viewport)
 * - forceUpward forces upward alignment (used inside mobile menu)
 * - Click outside and Escape handled by Radix
 * - Closes on scroll via document capture listener
 * - Border and shadow consume --dropdown-popup-* CSS vars from useSettingsCssVars
 */
export function LocaleDropdown({
  isOpen,
  onOpenChange,
  trigger,
  forceUpward = false,
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

  return (
    <Popover.Root open={isOpen} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side={forceUpward ? 'top' : 'bottom'}
          align="start"
          sideOffset={6}
          avoidCollisions={!forceUpward}
          collisionPadding={8}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="z-70 outline-none"
        >
          <div
            role="dialog"
            aria-label="Select country and language"
            className={cn(
              'w-[min(320px,calc(100vw-16px))]',
              'bg-background p-4',
              'max-h-[min(400px,calc(100vh-80px))] overflow-y-auto',
            )}
            style={{
              borderWidth: 'var(--dropdown-popup-border-thickness)',
              borderStyle: 'solid',
              borderColor: `rgb(var(--border) / var(--dropdown-popup-border-opacity))`,
              borderRadius: 'var(--dropdown-popup-border-corner-radius)',
              boxShadow: `var(--dropdown-popup-shadow-horizontal-offset) var(--dropdown-popup-shadow-vertical-offset) var(--dropdown-popup-shadow-blur-radius) rgb(var(--shadow) / var(--dropdown-popup-shadow-opacity))`,
            }}
          >
            {children}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
