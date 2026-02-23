import {Link} from 'react-router';
import type { ROOT_QUERYResult } from 'types/sanity/sanity.generated';
import {stegaClean} from '@sanity/client/stega';
import {cn} from '~/lib/utils';
import {useRootLoaderData} from '~/root';
import * as React from 'react';

// Extract the expanded link type from the generated query result
type MenuItem = NonNullable<ROOT_QUERYResult['header']>['menu'];
type MenuItemUnion = NonNullable<MenuItem>[number];
type MegaMenuItem = Extract<MenuItemUnion, { _type: 'megaMenu' }>;
type ExpandedLink = NonNullable<MegaMenuItem['link']>;

interface SanityReferenceLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  data?: ExpandedLink | null;
  children?: React.ReactNode;
  className?: string;
}

export const SanityReferenceLink = React.forwardRef<
  HTMLAnchorElement,
  SanityReferenceLinkProps
>(({data, children, className, ...props}, ref) => {
  const {locale} = useRootLoaderData();

  if (!data) return null;

  const type = stegaClean(data.documentType);
  const slug = 'slug' in data && data.slug ? data.slug.current : null;

  const buildUrl = () => {
    switch (type) {
      case 'home':
        return locale.pathPrefix || '/';
      case 'page':
        return slug ? `${locale.pathPrefix}/${slug}` : '/';
      case 'product':
        return slug ? `${locale.pathPrefix}/products/${slug}` : '/';
      case 'collection':
        return slug ? `${locale.pathPrefix}/collections/${slug}` : '/';
      case 'blogPost':
        return slug ? `${locale.pathPrefix}/blog/${slug}` : '/';
      default:
        return '/';
    }
  };

  const url = stegaClean(buildUrl());

  return (
    <Link
      ref={ref}
      className={cn([
        'focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden',
        className,
      ])}
      prefetch="intent"
      to={url}
      {...props}
    >
      {children}
    </Link>
  );
});

SanityReferenceLink.displayName = 'SanityReferenceLink';