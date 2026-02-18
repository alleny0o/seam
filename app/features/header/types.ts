/**
 * Shared types for header feature
 */
import type {ROOT_QUERYResult} from 'types/sanity/sanity.generated';

/** Header configuration data from Sanity CMS (non-nullable for use after context validation) */
export type HeaderData = NonNullable<ROOT_QUERYResult['header']>;

/** Common props for all header layout components (desktop and mobile) */
export type HeaderLayoutProps = {
  logoWidth?: string;
};

/** Single announcement bar entry from Sanity CMS */
export type AnnouncementBarEntry = NonNullable<
  NonNullable<ROOT_QUERYResult['header']>['announcementBar']
>[number];

/** Utility link entry from header configuration */
export type UtilityLink = NonNullable<
  NonNullable<ROOT_QUERYResult['header']>['announcementBarUtilityLinks']
>[number];
