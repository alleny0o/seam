import {defineField} from 'sanity';

/**
 * POPOVER CONFIG
 * Configuration for inline popover panels (locale selector, etc).
 * Width is intentionally omitted — Radix Popover handles sizing automatically.
 */
export default defineField({
  name: 'popoverConfig',
  title: 'Popover Configuration',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'borderRadius',
      title: 'Border radius',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
          {title: 'Extra Large', value: 'xl'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'md',
    }),
    defineField({
      name: 'shadow',
      title: 'Shadow',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'md',
    }),
    defineField({
      name: 'showBorder',
      title: 'Show border',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'borderWidth',
      title: 'Border width',
      type: 'rangeSlider',
      options: {min: 1, max: 4, suffix: 'px', step: 0.5},
      initialValue: 1,
      hidden: ({parent}) => !parent?.showBorder,
    }),
  ],
});
