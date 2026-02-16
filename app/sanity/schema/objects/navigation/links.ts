import {defineField, defineArrayMember} from 'sanity';

export default defineField({
  name: 'links',
  type: 'array',
  of: [
    defineArrayMember({type: 'internalLink'}),
    defineArrayMember({type: 'externalLink'}),
  ],
});