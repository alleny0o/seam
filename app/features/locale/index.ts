// Components
export {
  LocaleSelector,
  PopoverLocaleSelector,
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
  resolvePopoverLocaleSelectorConfig,
} from './utils/resolve-locale-selector-config';

// Types
export type {
  LocaleSelectorProps,
  PopoverLocaleSelectorProps,
  LocaleSelectorConfig,
  PopoverLocaleSelectorConfig,
  RawLocaleSelectorConfig,
  RawPopoverConfig,
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
  RawSanityPopoverLocaleSelectorConfig,
} from './utils/resolve-locale-selector-config';
