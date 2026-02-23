import {stegaClean} from '@sanity/client/stega';
import {useHeaderSettings} from '~/features/header';
import {getHoverClasses} from '~/utils/hover-classes';

type NavHoverType = 'navigation' | 'heading' | 'link';

/**
 * Returns hover effect classes for navigation elements based on header settings
 * @param type - The type of navigation element (navigation, heading, or link)
 */
export function useNavHoverClasses(type: NavHoverType): string {
  const header = useHeaderSettings();

  let effect: string | null | undefined;

  switch (type) {
    case 'navigation':
      effect = header?.desktopNavigationHoverEffect;
      break;
    case 'heading':
      effect = header?.desktopMegaMenuHeadingHoverEffect;
      break;
    case 'link':
      effect = header?.desktopMegaMenuLinkHoverEffect;
      break;
  }

  return getHoverClasses(stegaClean(effect));
}
