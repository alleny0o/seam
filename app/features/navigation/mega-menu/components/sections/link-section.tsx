import {stegaClean} from '@sanity/client/stega';
import {SanityInternalLink} from '~/components/sanity/link/sanity-internal-link';
import {SanityExternalLink} from '~/components/sanity/link/sanity-external-link';
import {SanityReferenceLink} from '~/components/sanity/link/sanity-reference-link';
import type {LinkSectionType} from '~/features/navigation/types';

interface LinkSectionProps {
  data: LinkSectionType;
  className?: string;
}

/**
 * Renders a link section within the mega menu
 * Displays an optional heading with links below
 */
export function LinkSection({data, className}: LinkSectionProps) {
  return (
    <nav className={className} aria-label={data.heading || 'Menu section'}>
      <div className="space-y-4">
        {data.heading && (
          <h3 className="mega-menu-heading">
            {data.headingLink ? (
              <SanityReferenceLink data={data.headingLink}>
                {data.heading}
              </SanityReferenceLink>
            ) : (
              data.heading
            )}
          </h3>
        )}

        {data.links && data.links.length > 0 && (
          <ul className="space-y-4">
            {data.links.map((link) => (
              <li key={link._key} className="mega-menu-link">
                {stegaClean(link._type) === 'internalLink' && (
                  <SanityInternalLink data={link as Extract<typeof link, {_type: 'internalLink'}>} />
                )}
                {stegaClean(link._type) === 'externalLink' && (
                  <SanityExternalLink data={link as Extract<typeof link, {_type: 'externalLink'}>} />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
