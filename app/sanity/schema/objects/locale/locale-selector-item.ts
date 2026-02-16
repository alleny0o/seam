import {Globe} from 'lucide-react';
import {defineField} from 'sanity';

export default defineField({
  type: 'object',
  name: 'localeSelectorItem',
  icon: Globe,
  fields: [
    defineField({
      name: 'triggerVariant',
      title: 'Trigger variant',
      type: 'string',
      initialValue: 'flag-country',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Locale Selector',
      subtitle: 'Country & language switcher',
    }),
  },
});