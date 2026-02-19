import type {LocaleSelectorConfig, PopoverLocaleSelectorConfig} from './types';

// ============================================================================
// FLAG CDN
// ============================================================================

export const FLAG_CDN_BASE_URL = 'https://cdn.shopify.com/static/images/flags';

/**
 * Returns the full URL for a country flag SVG.
 * Country code must be lowercase (e.g. 'us', 'fr', 'de').
 */
export function getFlagUrl(countryCode: string): string {
  return `${FLAG_CDN_BASE_URL}/${countryCode.toLowerCase()}.svg`;
}

// ============================================================================
// DEFAULTS
// Fallback values when Sanity fields are not configured.
// Mirror the initialValues in the Sanity schema.
// ============================================================================

export const LOCALE_SELECTOR_DEFAULTS: LocaleSelectorConfig = {
  triggerVariant: 'flag-country',
  showChevron: true,
  colorScheme: null,
  displayMode: {
    kind: 'single',
    mode: 'popover',
  },
  popoverConfig: null,
  sidebarConfig: null,
  modalConfig: null,
};

export const POPOVER_LOCALE_SELECTOR_DEFAULTS: PopoverLocaleSelectorConfig = {
  triggerVariant: 'flag-country',
  showChevron: true,
  colorScheme: null,
  popoverConfig: null,
};
