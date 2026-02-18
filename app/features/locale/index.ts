// Components
export {
  LocaleSelector,
  DropdownLocaleSelector,
} from './components/locale-selector';

// Context
export {
  LocaleSelectorProvider,
  useLocaleSelectorContext,
} from './context/locale-selector-context';

// Hooks
export {useLocaleSelector} from './hooks/use-locale-selector';

// Utils
export {
  resolveLocaleSelectorConfig,
  resolveDropdownLocaleSelectorConfig,
} from './utils/resolve-locale-selector-config';

// Types
export type {
  LocaleSelectorProps,
  DropdownLocaleSelectorProps,
  LocaleSelectorConfig,
  DropdownLocaleSelectorConfig,
  RawLocaleSelectorConfig,
  RawDropdownConfig,
  RawColorScheme,
  TriggerVariant,
  SelectorMode,
  DisplayMode,
  SingleDisplayMode,
  ResponsiveDisplayMode,
  PlacementId,
} from './types';
export type {
  RawSanityLocaleSelectorConfig,
  RawSanityDropdownLocaleSelectorConfig,
} from './utils/resolve-locale-selector-config';
