import {defineField} from 'sanity';

export default defineField({
  name: 'testField',
  title: 'Test Field',
  type: 'object',
  fields: [
    defineField({
      name: 'testString',
      title: 'Test String',
      type: 'string',
    }),
  ],
});