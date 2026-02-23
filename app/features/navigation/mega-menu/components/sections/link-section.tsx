import {isType} from '~/utils/sanity-utils';
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
                {isType(link, 'internalLink') && (
                  <SanityInternalLink data={link} />
                )}
                {isType(link, 'externalLink') && (
                  <SanityExternalLink data={link} />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
