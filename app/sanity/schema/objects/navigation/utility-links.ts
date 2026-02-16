import {defineField, defineArrayMember} from 'sanity';

export default defineField({
  name: 'utilityLinks',
  type: 'array',
  of: [
    defineArrayMember({type: 'internalLink'}),
    defineArrayMember({type: 'externalLink'}),
    defineArrayMember({type: 'localeSelectorItem'}),
  ],
  validation: (Rule) =>
    Rule.custom((items) => {
      if (!Array.isArray(items)) return true;
      const count = items.filter(
        (item: any) => item._type === 'localeSelectorItem',
      ).length;
      if (count > 1) {
        return 'Only one locale selector is allowed in the utility links bar';
      }
      return true;
    }),
});