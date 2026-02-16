import {defineField} from 'sanity';
import dropdownConfig from '../aside/dropdown-config';
import sidebarConfig from '../aside/sidebar-config';
import modalConfig from '../aside/modal-config';

/**
 * LOCALE SELECTOR CONFIG
 * Reusable object field embedded directly into each placement
 * (announcement bar, mobile navigation, footer).
 *
 * Usage — spread into a parent defineField:
 *   defineField({
 *     ...localeSelectorConfig,
 *     name: 'announcementBarLocaleSelector',
 *     group: 'announcementBar',
 *   })
 */
const localeSelectorConfig = {
  type: 'object' as const,
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
    }),

    // ============================================================================
    // DISPLAY MODE
    // ============================================================================
    defineField({
      name: 'displayModeKind',
      title: 'Display mode',
      type: 'string',
      description:
        'Use the same mode on all screen sizes, or different modes per breakpoint',
      options: {
        list: [
          {title: 'Single (same on all screens)', value: 'single'},
          {title: 'Responsive (different per breakpoint)', value: 'responsive'},
        ],
        layout: 'radio',
      },
      initialValue: 'single',
      validation: (Rule) => Rule.required(),
    }),

    // — Single mode —
    defineField({
      name: 'mode',
      title: 'Mode',
      type: 'string',
      description: 'How the locale selector opens on all screen sizes',
      options: {
        list: [
          {title: 'Dropdown', value: 'dropdown'},
          {title: 'Modal', value: 'modal'},
          {title: 'Sidebar', value: 'sidebar'},
        ],
        layout: 'radio',
      },
      initialValue: 'dropdown',
      hidden: ({parent}) => {
        const p = parent as Record<string, string | undefined>;
        return p?.displayModeKind !== 'single';
      },
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const p = ctx.parent as Record<string, string | undefined>;
          if (p?.displayModeKind === 'single' && !value) {
            return 'Required when display mode is Single';
          }
          return true;
        }),
    }),

    // — Responsive mode —
    defineField({
      name: 'modeBase',
      title: 'Base mode (below sm / 640px)',
      type: 'string',
      options: {
        list: [
          {title: 'Dropdown', value: 'dropdown'},
          {title: 'Modal', value: 'modal'},
          {title: 'Sidebar', value: 'sidebar'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'modal',
      hidden: ({parent}) => {
        const p = parent as Record<string, string | undefined>;
        return p?.displayModeKind !== 'responsive';
      },
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const p = ctx.parent as Record<string, string | undefined>;
          if (p?.displayModeKind === 'responsive' && !value) {
            return 'Required when display mode is Responsive';
          }
          return true;
        }),
    }),
    defineField({
      name: 'modeSm',
      title: 'Mode from sm (640px)',
      type: 'string',
      description: 'Leave blank to inherit from base',
      options: {
        list: [
          {title: 'Dropdown', value: 'dropdown'},
          {title: 'Modal', value: 'modal'},
          {title: 'Sidebar', value: 'sidebar'},
        ],
        layout: 'dropdown',
      },
      hidden: ({parent}) => {
        const p = parent as Record<string, string | undefined>;
        return p?.displayModeKind !== 'responsive';
      },
    }),
    defineField({
      name: 'modeMd',
      title: 'Mode from md (768px)',
      type: 'string',
      description: 'Leave blank to inherit from sm',
      options: {
        list: [
          {title: 'Dropdown', value: 'dropdown'},
          {title: 'Modal', value: 'modal'},
          {title: 'Sidebar', value: 'sidebar'},
        ],
        layout: 'dropdown',
      },
      hidden: ({parent}) => {
        const p = parent as Record<string, string | undefined>;
        return p?.displayModeKind !== 'responsive';
      },
    }),
    defineField({
      name: 'modeLg',
      title: 'Mode from lg (1024px)',
      type: 'string',
      description: 'Leave blank to inherit from md',
      options: {
        list: [
          {title: 'Dropdown', value: 'dropdown'},
          {title: 'Modal', value: 'modal'},
          {title: 'Sidebar', value: 'sidebar'},
        ],
        layout: 'dropdown',
      },
      hidden: ({parent}) => {
        const p = parent as Record<string, string | undefined>;
        return p?.displayModeKind !== 'responsive';
      },
    }),

    // ============================================================================
    // CONTAINER CONFIGS
    // ============================================================================
    defineField({
      ...dropdownConfig,
      name: 'dropdownConfig',
      title: 'Dropdown configuration',
      hidden: ({parent}) => {
        const p = parent as Record<string, string | undefined>;
        if (p?.displayModeKind === 'single') return p?.mode !== 'dropdown';
        return !['modeBase', 'modeSm', 'modeMd', 'modeLg'].some(
          (key) => p?.[key] === 'dropdown',
        );
      },
    }),
    defineField({
      ...sidebarConfig,
      name: 'sidebarConfig',
      title: 'Sidebar configuration',
      hidden: ({parent}) => {
        const p = parent as Record<string, string | undefined>;
        if (p?.displayModeKind === 'single') return p?.mode !== 'sidebar';
        return !['modeBase', 'modeSm', 'modeMd', 'modeLg'].some(
          (key) => p?.[key] === 'sidebar',
        );
      },
    }),
    defineField({
      ...modalConfig,
      name: 'modalConfig',
      title: 'Modal configuration',
      hidden: ({parent}) => {
        const p = parent as Record<string, string | undefined>;
        if (p?.displayModeKind === 'single') return p?.mode !== 'modal';
        return !['modeBase', 'modeSm', 'modeMd', 'modeLg'].some(
          (key) => p?.[key] === 'modal',
        );
      },
    }),
  ],
};

export default localeSelectorConfig;
