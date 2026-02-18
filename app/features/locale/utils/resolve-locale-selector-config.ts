import {stegaClean} from '@sanity/client/stega';
import type {
  LocaleSelectorConfig,
  DropdownLocaleSelectorConfig,
  SelectorMode,
  DisplayMode,
  TriggerVariant,
  RawDropdownConfig,
  RawColorScheme,
} from '../types';
import {
  LOCALE_SELECTOR_DEFAULTS,
  DROPDOWN_LOCALE_SELECTOR_DEFAULTS,
} from '../constants';

// ─────────────────────────────────────────────────────────────────────────────
// RAW SANITY SHAPES
// Flat fields as returned by LOCALE_SELECTOR_FRAGMENT and
// DROPDOWN_COUNTRY_SELECTOR_FRAGMENT respectively.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Raw shape from LOCALE_SELECTOR_FRAGMENT.
 * Used for header actions and announcement bar placements.
 */
export type RawSanityLocaleSelectorConfig =
  | {
      triggerVariant?: string | null;
      showChevron?: boolean | null;
      // Color scheme — already resolved via -> projection in GROQ
      colorScheme?: RawColorScheme;
      // Display mode
      displayModeKind?: string | null;
      mode?: string | null; // used when kind = 'single'
      modeBase?: string | null; // used when kind = 'responsive'
      modeSm?: string | null;
      modeMd?: string | null;
      modeLg?: string | null;
      // Container configs
      dropdownConfig?: RawDropdownConfig;
      sidebarConfig?: Record<string, unknown> | null;
      modalConfig?: Record<string, unknown> | null;
    }
  | null
  | undefined;

/**
 * Raw shape from DROPDOWN_COUNTRY_SELECTOR_FRAGMENT.
 * Used for the mobile placement — no display mode fields.
 */
export type RawSanityDropdownLocaleSelectorConfig =
  | {
      triggerVariant?: string | null;
      showChevron?: boolean | null;
      // Color scheme — already resolved via -> projection in GROQ
      colorScheme?: RawColorScheme;
      dropdownConfig?: RawDropdownConfig;
    }
  | null
  | undefined;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const TRIGGER_VARIANTS: TriggerVariant[] = [
  'icon',
  'flag',
  'flag-country',
  'flag-country-lang',
];

function cleanTriggerVariant(
  value: string | null | undefined,
): TriggerVariant | null {
  const cleaned = stegaClean(value);
  if (TRIGGER_VARIANTS.includes(cleaned as TriggerVariant)) {
    return cleaned as TriggerVariant;
  }
  return null;
}

function cleanMode(value: string | null | undefined): SelectorMode | null {
  const cleaned = stegaClean(value);
  if (cleaned === 'dropdown' || cleaned === 'modal' || cleaned === 'sidebar') {
    return cleaned;
  }
  return null;
}

function resolveDisplayMode(
  raw: NonNullable<RawSanityLocaleSelectorConfig>,
): DisplayMode {
  const kind = stegaClean(raw.displayModeKind) ?? 'single';

  if (kind === 'responsive') {
    return {
      kind: 'responsive',
      base: cleanMode(raw.modeBase) ?? 'dropdown',
      sm: cleanMode(raw.modeSm) ?? undefined,
      md: cleanMode(raw.modeMd) ?? undefined,
      lg: cleanMode(raw.modeLg) ?? undefined,
    };
  }

  // Default: single
  return {
    kind: 'single',
    mode: cleanMode(raw.mode) ?? 'dropdown',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// RESOLVERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resolves raw Sanity locale selector config into a fully typed
 * LocaleSelectorConfig with no nulls.
 *
 * For header actions and announcement bar placements.
 * Handles full display mode logic (single + responsive breakpoints).
 *
 * @param raw - Raw data from LOCALE_SELECTOR_FRAGMENT
 * @returns Fully resolved LocaleSelectorConfig
 */
export function resolveLocaleSelectorConfig(
  raw: RawSanityLocaleSelectorConfig,
): LocaleSelectorConfig {
  if (!raw) return LOCALE_SELECTOR_DEFAULTS;

  return {
    triggerVariant:
      cleanTriggerVariant(raw.triggerVariant) ??
      LOCALE_SELECTOR_DEFAULTS.triggerVariant,
    showChevron: raw.showChevron ?? LOCALE_SELECTOR_DEFAULTS.showChevron,
    colorScheme: raw.colorScheme ?? null,
    displayMode: resolveDisplayMode(raw),
    dropdownConfig: raw.dropdownConfig ?? null,
    sidebarConfig: raw.sidebarConfig ?? null,
    modalConfig: raw.modalConfig ?? null,
  };
}

/**
 * Resolves raw Sanity dropdown-only locale selector config into a fully typed
 * DropdownLocaleSelectorConfig with no nulls.
 *
 * For the mobile placement only. No display mode logic — always dropdown.
 *
 * @param raw - Raw data from DROPDOWN_COUNTRY_SELECTOR_FRAGMENT
 * @returns Fully resolved DropdownLocaleSelectorConfig
 */
export function resolveDropdownLocaleSelectorConfig(
  raw: RawSanityDropdownLocaleSelectorConfig,
): DropdownLocaleSelectorConfig {
  if (!raw) return DROPDOWN_LOCALE_SELECTOR_DEFAULTS;

  return {
    triggerVariant:
      cleanTriggerVariant(raw.triggerVariant) ??
      DROPDOWN_LOCALE_SELECTOR_DEFAULTS.triggerVariant,
    showChevron:
      raw.showChevron ?? DROPDOWN_LOCALE_SELECTOR_DEFAULTS.showChevron,
    colorScheme: raw.colorScheme ?? null,
    dropdownConfig: raw.dropdownConfig ?? null,
  };
}
