import * as Select from '@radix-ui/react-select';
import {ChevronDown, ChevronUp} from 'lucide-react';
import {cn} from '~/lib/utils';
import {LocaleFlag} from './locale-flag';

export interface LocaleSelectOption {
  value: string;
  label: string;
  /** If provided, renders a flag before the label */
  countryCode?: string;
}

interface LocaleSelectProps {
  options: LocaleSelectOption[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
  ariaLabel?: string;
}

/**
 * Generic accessible select using Radix Select.
 * Optionally renders a flag per option when countryCode is provided.
 *
 * Used for both country and language picking in LocaleForm:
 * - Country: pass countryCode per option → renders flag + label
 * - Language: omit countryCode → renders label only
 *
 * Styling consumes global settings CSS vars written by useSettingsCssVars:
 * - Trigger uses --input-border-* vars
 * - Content panel uses --dropdown-popup-border-* and --dropdown-popup-shadow-* vars
 */
export function LocaleSelect({
  options,
  value,
  onChange,
  id,
  ariaLabel,
}: LocaleSelectProps) {
  const current = options.find((o) => o.value === value);

  return (
    <Select.Root value={value} onValueChange={onChange}>
      {/* ── Trigger ─────────────────────────────────────────────────────── */}
      <Select.Trigger
        id={id}
        className={cn(
          'flex w-full items-center justify-between gap-2',
          'bg-transparent px-3 py-1.5',
          'text-sm focus:outline-none',
          'data-placeholder:text-muted-foreground',
        )}
        style={{
          borderWidth: 'var(--input-border-thickness)',
          borderStyle: 'solid',
          borderColor: `rgb(var(--border) / var(--input-border-opacity))`,
          borderRadius: 'var(--input-border-corner-radius)',
        }}
        aria-label={ariaLabel}
      >
        <span className="flex items-center gap-2 truncate">
          {current?.countryCode && (
            <LocaleFlag
              countryCode={current.countryCode}
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
            'overflow-hidden bg-background',
          )}
          style={{
            borderWidth: 'var(--dropdown-popup-border-thickness)',
            borderStyle: 'solid',
            borderColor: `rgb(var(--border) / var(--dropdown-popup-border-opacity))`,
            borderRadius: 'var(--dropdown-popup-border-corner-radius)',
            boxShadow: `var(--dropdown-popup-shadow-horizontal-offset) var(--dropdown-popup-shadow-vertical-offset) var(--dropdown-popup-shadow-blur-radius) rgb(var(--shadow) / var(--dropdown-popup-shadow-opacity))`,
          }}
        >
          <Select.ScrollUpButton className="flex items-center justify-center py-1 text-muted-foreground">
            <ChevronUp size={14} aria-hidden />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className={cn(
                  'flex cursor-pointer items-center gap-2 select-none',
                  'rounded-sm px-2 py-1.5 text-sm outline-none',
                  'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
                  'data-[state=checked]:font-medium',
                )}
              >
                {option.countryCode && (
                  <LocaleFlag
                    countryCode={option.countryCode}
                    size={18}
                    className="shrink-0"
                  />
                )}
                <Select.ItemText>{option.label}</Select.ItemText>
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
