import {useHeaderSettings} from '~/features/header';
import {isType} from '~/utils/sanity-utils';

import type {HeaderMenu} from '../types';

import {InternalLinkItem} from './nav-items/internal-link-item';
import {ExternalLinkItem} from './nav-items/external-link-item';
import {MegaMenuItem} from './nav-items/mega-menu-item';

// Default padding in pixels for nav items
const DEFAULT_NAV_PADDING = 4;

/**
 * Desktop navigation bar component
 * Renders the main horizontal navigation with support for internal links,
 * external links, and mega menu dropdowns
 */
export function DesktopNavigation() {
  const header = useHeaderSettings();
  const items: HeaderMenu = header.menu ?? [];

  if (!items.length) return null;

  const paddingX = header.desktopMenuItemPaddingX ?? DEFAULT_NAV_PADDING;
  const paddingY = header.desktopMenuItemPaddingY ?? DEFAULT_NAV_PADDING;

  const navStyles: React.CSSProperties = {
    '--nav-padding-x': `${paddingX}px`,
    '--nav-padding-y': `${paddingY}px`,
  } as React.CSSProperties;

  return (
    <nav
      id="header-nav"
      aria-label="Main navigation"
      className="h-full [&_:is(a,button).nav-text]:px-(--nav-padding-x) [&_:is(a,button).nav-text]:py-(--nav-padding-y)"
      style={navStyles}
    >
      <ul className="flex h-full items-center" role="menubar">
        {items.map((item) => {
          if (isType(item, 'internalLink'))
            return <InternalLinkItem key={item._key} item={item} />;
          if (isType(item, 'externalLink'))
            return <ExternalLinkItem key={item._key} item={item} />;
          if (isType(item, 'megaMenu'))
            return <MegaMenuItem key={item._key} item={item} />;
          return null;
        })}
      </ul>
    </nav>
  );
}
