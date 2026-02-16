import {defineField} from 'sanity';

/**
 * FONT STYLE OVERRIDE
 * Lightweight typography override for adjusting weight, size, spacing, and style
 * without changing the font family. Use this for component-level customizations.
 */

export default defineField({
  name: 'localeSelectorSettings',
  title: 'Font Style Override',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'role',
      title: 'Typography role',
      type: 'string',
      description: 'Select the base typography to inherit from',
      options: {
        list: [
          {title: 'Heading', value: 'heading'},
          {title: 'Body', value: 'body'},
          {title: 'Extra 1', value: 'extra1'},
          {title: 'Extra 2', value: 'extra2'},
          {title: 'Extra 3', value: 'extra3'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'enabled',
      title: 'Enable overrides',
      type: 'boolean',
      description: 'Toggle to override the selected typography settings',
      initialValue: false,
    }),
    defineField({
      name: 'fontWeight',
      title: 'Font weight',
      type: 'fontWeight',
      description: 'Override the font weight',
      hidden: ({parent}) => !parent?.enabled,
      validation: (Rule) => Rule.optional(),
    }),
    defineField({
      name: 'fontSize',
      title: 'Font size',
      type: 'rangeSlider',
      options: {
        min: 12,
        max: 150,
        step: 1,
        suffix: 'px',
      },
      description: 'Override the font size',
      hidden: ({parent}) => !parent?.enabled,
    }),
    defineField({
      name: 'fontStyle',
      title: 'Font style',
      type: 'string',
      options: {
        list: [
          {title: 'Normal', value: 'normal'},
          {title: 'Italic', value: 'italic'},
        ],
        layout: 'radio',
      },
      description: 'Override the font style',
      hidden: ({parent}) => !parent?.enabled,
    }),
    defineField({
      name: 'letterSpacing',
      title: 'Letter spacing',
      type: 'rangeSlider',
      options: {
        min: -20,
        max: 50,
        step: 0.5,
        suffix: 'px',
      },
      initialValue: 0,
      description: 'Override letter spacing in pixels',
      hidden: ({parent}) => !parent?.enabled,
    }),
    defineField({
      name: 'lineHeight',
      title: 'Line height',
      type: 'rangeSlider',
      options: {
        min: 0.8,
        max: 2,
        step: 0.1,
      },
      initialValue: 1.2,
      description: 'Override line height',
      hidden: ({parent}) => !parent?.enabled,
    }),
    defineField({
      name: 'capitalize',
      title: 'Capitalize',
      type: 'boolean',
      description: 'Uppercase all text',
      hidden: ({parent}) => !parent?.enabled,
    }),
  ],
});
