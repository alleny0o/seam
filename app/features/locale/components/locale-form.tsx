import {useMemo} from 'react';
import type {I18nLocale} from 'types';
import type {LocaleFormProps} from '../types';
import type {LocaleSelectorState} from '../hooks/use-locale-selector';
import {LocaleSelect} from './locale-select';

interface LocaleFormInternalProps extends LocaleFormProps {
  currentLocale: I18nLocale;
  locales: LocaleSelectorState['locales'];
  selectedCountry: string;
  setSelectedCountry: LocaleSelectorState['setSelectedCountry'];
  availableLanguages: LocaleSelectorState['availableLanguages'];
  handleLocaleChange: LocaleSelectorState['handleLocaleChange'];
}

/**
 * Country + language select form.
 *
 * - Country uses LocaleSelect with countryCode → renders flag + label per option
 * - Language uses LocaleSelect without countryCode → renders label only
 * - Language change auto-navigates via handleLocaleChange
 * - Noscript fallback renders a submit button for JS-disabled environments
 */
export function LocaleForm({
  currentLocale,
  locales,
  selectedCountry,
  setSelectedCountry,
  availableLanguages,
  handleLocaleChange,
  onClose,
}: LocaleFormInternalProps) {
  // Unique countries derived from full locales list
  const countryOptions = useMemo(() => {
    const seen = new Set<string>();
    return locales
      .filter((l) => {
        if (seen.has(l.country)) return false;
        seen.add(l.country);
        return true;
      })
      .map((l) => ({
        value: l.country,
        label: l.label,
        countryCode: l.country,
      }));
  }, [locales]);

  const languageOptions = useMemo(
    () =>
      availableLanguages.map((l) => ({
        value: l.isoCode,
        label: l.label,
      })),
    [availableLanguages],
  );

  // Current language for the selected country — defaults to current locale's language
  const selectedLanguage =
    availableLanguages.find((l) => l.isoCode === currentLocale.language)
      ?.isoCode ??
    availableLanguages[0]?.isoCode ??
    '';

  return (
    <div className="flex flex-col gap-4">
      {/* Country select — with flags */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="locale-country" className="text-sm font-medium">
          Country
        </label>
        <LocaleSelect
          id="locale-country"
          options={countryOptions}
          value={selectedCountry}
          onChange={setSelectedCountry}
          ariaLabel="Select country"
        />
      </div>

      {/* Language select — text only */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="locale-language" className="text-sm font-medium">
          Language
        </label>
        <LocaleSelect
          id="locale-language"
          options={languageOptions}
          value={selectedLanguage}
          onChange={(lang) => handleLocaleChange(selectedCountry, lang)}
          ariaLabel="Select language"
        />
      </div>

      {/* Noscript fallback — only visible when JS is disabled */}
      <noscript>
        <button
          type="submit"
          onClick={() => handleLocaleChange(selectedCountry, selectedLanguage)}
          className="mt-2 w-full rounded border px-4 py-2 text-sm"
        >
          Apply
        </button>
      </noscript>
    </div>
  );
}
