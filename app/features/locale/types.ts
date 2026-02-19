import type {I18nLocale} from 'types';
import type {RawSidebarConfig, RawModalConfig} from '~/features/aside';

// ============================================================================
// TRIGGER VARIANTS
// Controls how the locale selector button looks.
// ============================================================================

/** What the trigger button renders */
export type TriggerVariant =
  | 'icon' // Globe icon only
  | 'flag' // Flag only
  | 'flag-country' // Flag + country name
  | 'flag-country-lang'; // Flag + country name + language name

// ============================================================================
// DISPLAY MODE
// Controls how the selector opens and at which breakpoints.
// ============================================================================

/** The three container types */
export type SelectorMode = 'popover' | 'modal' | 'sidebar';

/** Single mode — same on all screen sizes */
export type SingleDisplayMode = {
  kind: 'single';
  mode: SelectorMode;
};

/**
 * Responsive mode — different modes at different breakpoints.
 * Mobile-first: base applies below sm,
 * each breakpoint overrides above its threshold.
 */
export type ResponsiveDisplayMode = {
  kind: 'responsive';
  base: SelectorMode;
  sm?: SelectorMode;
  md?: SelectorMode;
  lg?: SelectorMode;
};

export type DisplayMode = SingleDisplayMode | ResponsiveDisplayMode;

// ============================================================================
// POPOVER CONFIG
// Raw shape for popover container styling from Sanity popoverConfig.
// Matches POPOVER_CONFIG_FRAGMENT fields exactly.
// ============================================================================

export type RawPopoverConfig =
  | {
      borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | null;
      shadow?: 'none' | 'sm' | 'md' | 'lg' | null;
      showBorder?: boolean | null;
      borderWidth?: number | null;
    }
  | null
  | undefined;

// ============================================================================
// COLOR SCHEME
// Raw resolved color scheme from Sanity (colorScheme -> projection).
// Fields match COLOR_SCHEME_FRAGMENT exactly.
// ============================================================================

type ColorValue = {
  alpha?: number | null;
  hex?: string | null;
  hsl?: unknown;
  rgb?: unknown;
} | null;

export type RawColorScheme =
  | {
      background?: ColorValue;
      border?: ColorValue;
      card?: ColorValue;
      cardForeground?: ColorValue;
      foreground?: ColorValue;
      primary?: ColorValue;
      primaryForeground?: ColorValue;
    }
  | null
  | undefined;

// ============================================================================
// PLACEMENT
// Identifies which header placement a locale selector instance belongs to.
// Used by LocaleSelectorProvider to isolate open/close state per placement.
// ============================================================================

export type PlacementId = 'header' | 'announcementBar' | 'mobile';

// ============================================================================
// SANITY RAW CONFIG (legacy shape — superseded by RawSanity* types
// in resolve-locale-selector-config.ts but kept for compatibility)
// ============================================================================

export type RawLocaleSelectorConfig = {
  triggerVariant?: TriggerVariant | null;
  showChevron?: boolean | null;
  displayMode?: RawDisplayMode | null;
  sidebarConfig?: RawSidebarConfig | null;
  modalConfig?: RawModalConfig | null;
};

export type RawDisplayMode = {
  kind?: 'single' | 'responsive' | null;
  mode?: SelectorMode | null;
  base?: SelectorMode | null;
  sm?: SelectorMode | null;
  md?: SelectorMode | null;
  lg?: SelectorMode | null;
};

// ============================================================================
// RESOLVED CONFIGS
// Fully resolved, no nulls — ready to use in components.
// ============================================================================

/**
 * Full config for header actions and announcement bar placements.
 * Supports all three display modes (popover, modal, sidebar) and
 * responsive breakpoint configuration.
 */
export type LocaleSelectorConfig = {
  triggerVariant: TriggerVariant;
  showChevron: boolean;
  colorScheme: RawColorScheme;
  displayMode: DisplayMode;
  popoverConfig: RawPopoverConfig;
  sidebarConfig: RawSidebarConfig;
  modalConfig: RawModalConfig;
};

/**
 * Simplified config for the mobile placement.
 * Always popover mode — no display mode logic needed since
 * it's already inside a drawer (mobileLocaleSelector uses
 * countrySelectorPopover schema type).
 */
export type PopoverLocaleSelectorConfig = {
  triggerVariant: TriggerVariant;
  showChevron: boolean;
  colorScheme: RawColorScheme;
  popoverConfig: RawPopoverConfig;
};

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface LocaleSelectorProps {
  /** Resolved config from Sanity */
  config: LocaleSelectorConfig;
  /** Which header placement this instance belongs to */
  placementId: PlacementId;
  /**
   * When true, forces popover mode opening upward.
   * Used when locale selector is rendered inside the mobile menu aside.
   */
  inMobileMenu?: boolean;
}

export interface PopoverLocaleSelectorProps {
  /** Resolved popover-only config from Sanity */
  config: PopoverLocaleSelectorConfig;
}

export interface LocaleTriggerProps {
  variant: TriggerVariant;
  showChevron: boolean;
  locale: I18nLocale;
  isOpen: boolean;
  onClick: () => void;
}

export interface LocaleFlagProps {
  countryCode: string;
  size?: number;
  className?: string;
}

export interface LocaleFormProps {
  /** Called after successful navigation — closes the container */
  onClose: () => void;
}
