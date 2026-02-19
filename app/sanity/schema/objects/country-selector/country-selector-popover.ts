import {defineField} from 'sanity';
import popoverConfig from '../aside/popover-config';

/**
 * COUNTRY SELECTOR (POPOVER ONLY)
 * Simplified locale selector config that only supports popover mode.
 * Used in mobile navigation where a popover is the only sensible UI pattern
 * (since the selector is already inside a drawer/modal).
 *
 * This removes all display mode options and sidebar/modal configs,
 * keeping only the trigger, color, and popover-specific settings.
 */
export default defineField({
  name: 'countrySelectorPopover',
  title: 'Locale Selector (Popover Only)',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    // ============================================================================
    // TRIGGER
    // ============================================================================
    defineField({
      name: 'triggerVariant',
      title: 'Trigger variant',
      type: 'string',
      description: 'What the locale selector button displays',
      options: {
        list: [
          {title: 'Icon only (Globe)', value: 'icon'},
          {title: 'Flag only', value: 'flag'},
          {title: 'Flag + Country', value: 'flag-country'},
          {title: 'Flag + Country + Language', value: 'flag-country-lang'},
        ],
        layout: 'radio',
      },
      initialValue: 'flag-country',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showChevron',
      title: 'Show chevron',
      type: 'boolean',
      description: 'Show a chevron icon next to the trigger button',
      initialValue: true,
    }),

    // ============================================================================
    // COLOR
    // ============================================================================
    defineField({
      name: 'colorScheme',
      title: 'Color scheme',
      type: 'reference',
      to: [{type: 'colorScheme'}],
      validation: (Rule) => Rule.required(),
    }),

    // ============================================================================
    // POPOVER CONFIG
    // ============================================================================
    defineField({
      ...popoverConfig,
      name: 'popoverConfig',
      title: 'Popover configuration',
    }),
  ],
});
