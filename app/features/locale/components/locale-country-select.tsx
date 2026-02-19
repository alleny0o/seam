import * as Select from '@radix-ui/react-select';
import {ChevronDown, ChevronUp} from 'lucide-react';
import {cn} from '~/lib/utils';
import {LocaleFlag} from './locale-flag';
import type {I18nLocale} from 'types';

interface LocaleCountrySelectProps {
  countries: I18nLocale[];
  value: string;
  onChange: (country: string) => void;
}

/**
 * Custom country select with flag icons per option.
 * Uses Radix Select for full accessibility (keyboard nav, screen readers, mobile).
 * Replaces the native <select> for country picking in LocaleForm.
 *
 * Language select stays native — text only, few options, not worth the complexity.
 */
export function LocaleCountrySelect({
  countries,
  value,
  onChange,
}: LocaleCountrySelectProps) {
  const current = countries.find((c) => c.country === value);

  return (
    <Select.Root value={value} onValueChange={onChange}>
      {/* ── Trigger ─────────────────────────────────────────────────────── */}
      <Select.Trigger
        className={cn(
          'flex w-full items-center justify-between gap-2',
          'rounded-md border bg-transparent px-3 py-1.5',
          'text-sm focus:outline-none',
          'data-placeholder:text-muted-foreground',
        )}
        aria-label="Select country"
      >
        <span className="flex items-center gap-2 truncate">
          {current && (
            <LocaleFlag
              countryCode={current.country}
              size={18}
              className="shrink-0"
            />
          )}
          <Select.Value />
        </span>
        <Select.Icon asChild>
          <ChevronDown size={14} className="shrink-0 opacity-60" aria-hidden />
        </Select.Icon>
      </Select.Trigger>

      {/* ── Dropdown content ─────────────────────────────────────────────── */}
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className={cn(
            'z-100 w-(--radix-select-trigger-width)',
            'max-h-[min(280px,var(--radix-select-content-available-height))]',
            'overflow-hidden rounded-md border bg-background shadow-md',
          )}
        >
          <Select.ScrollUpButton className="flex items-center justify-center py-1 text-muted-foreground">
            <ChevronUp size={14} aria-hidden />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            {countries.map((locale) => (
              <Select.Item
                key={locale.country}
                value={locale.country}
                className={cn(
                  'flex cursor-pointer items-center gap-2 select-none',
                  'rounded-sm px-2 py-1.5 text-sm outline-none',
                  'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
                  'data-[state=checked]:font-medium',
                )}
              >
                <LocaleFlag
                  countryCode={locale.country}
                  size={18}
                  className="shrink-0"
                />
                {/* ItemText is what screen readers and Radix use for value matching */}
                <Select.ItemText>{locale.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center py-1 text-muted-foreground">
            <ChevronDown size={14} aria-hidden />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
