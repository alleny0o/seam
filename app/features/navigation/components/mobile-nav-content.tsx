import {stegaClean} from '@sanity/client/stega';
import {useHeaderSettings} from '~/features/header';
import {useAsideClose} from '~/features/aside';
import {SanityInternalLink} from '~/components/sanity/link/sanity-internal-link';
import {SanityExternalLink} from '~/components/sanity/link/sanity-external-link';
import type {HeaderMenu} from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULTS
// Mirror Sanity schema initialValues
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_PADDING_X = 20;
const DEFAULT_PADDING_Y = 20;
const DEFAULT_ITEM_PADDING_Y = 12;
const DEFAULT_LINK_SPACING = 0;

interface MobileNavContentProps {
  data: HeaderMenu;
}

/**
 * Content rendered inside the mobile navigation aside.
 * Reads nav-specific config from useHeaderSettings.
 *
 * Currently renders flat links only.
 * Accordion/sequential behavior will be added in a future iteration.
 */
export function MobileNavContent({data}: MobileNavContentProps) {
  const header = useHeaderSettings();
  const {handleClose} = useAsideClose();

  const paddingX =
    header?.mobileDrawerContentPaddingX ?? DEFAULT_PADDING_X;
  const paddingY =
    header?.mobileDrawerContentPaddingY ?? DEFAULT_PADDING_Y;
  const itemPaddingY =
    header?.mobileNavigationItemPaddingY ?? DEFAULT_ITEM_PADDING_Y;
  const linkSpacing =
    header?.mobileMegaMenuLinkSpacing ?? DEFAULT_LINK_SPACING;

  if (!data?.length) return null;

  return (
    <nav
      aria-label="Mobile navigation"
      style={{
        padding: `${paddingY}px ${paddingX}px`,
      }}
    >
      <ul
        className="flex flex-col"
        style={{gap: `${linkSpacing}px`}}
        role="menu"
      >
        {data.map((item) => (
          <li
            key={item._key}
            role="none"
            style={{paddingTop: `${itemPaddingY}px`, paddingBottom: `${itemPaddingY}px`}}
          >
            {stegaClean(item._type) === 'internalLink' && (
              <SanityInternalLink
                data={item as Extract<typeof item, {_type: 'internalLink'}>}
                onClick={handleClose}
              />
            )}
            {stegaClean(item._type) === 'externalLink' && (
              <SanityExternalLink data={item as Extract<typeof item, {_type: 'externalLink'}>} />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}