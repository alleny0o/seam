/**
 * PLUGINS
 * Imports plugin utilities used across the schema.
 */
import colorPicker from '../plugins/color-picker';
import rangeSlider from '../plugins/range-slider';

/**
 * DOCUMENT TYPES
 * Imports document-level schema definitions.
 */
import blogPost from './documents/blog-post';
import collection from './documents/collection';
import collectionTemplate from './documents/collection-template';
import color from './documents/color';
import font from './documents/font';
import page from './documents/page';
import product from './documents/product';
import productTemplate from './documents/product-template';
import productVariant from './documents/product-variant';

/**
 * GLOBAL OBJECTS
 * Shared utilities for layout, style, and content.
 */
import announcementBar from './objects/global/announcement-bar';
import aspectRatios from './objects/global/aspect-ratios';
import bannerRichtext from './objects/global/banner-richtext';
import contentAlignment from './objects/global/content-alignment';
import contentPosition from './objects/global/content-position';
import footersList from './objects/global/footers-list';
import padding from './objects/global/padding';
import productRichtext from './objects/global/product-richtext';
import richtext from './objects/global/richtext';
import sectionSettings from './objects/global/section-settings';
import separatorLine from './objects/global/separator-line';
import seo from './objects/global/seo';
import sectionsList, {
  collectionSections,
  productSections,
} from './objects/global/sections-list';

/**
 * ASIDE OBJECTS
 * Configuration for overlay UI patterns (sidebars, modals, popovers).
 */
import popoverConfig from './objects/aside/popover-config';
import modalConfig from './objects/aside/modal-config';
import sidebarConfig from './objects/aside/sidebar-config';

/**
 * COUNTRY SELECTOR
 * Locale/country selector configuration.
 */
import countrySelector from './objects/country-selector/country-selector';
import countrySelectorPopover from './objects/country-selector/country-selector-popover';

/**
 * NAVIGATION OBJECTS
 * Navigation-related schema utilities.
 */
import anchor from './objects/navigation/anchor';
import externalLink from './objects/navigation/external-link';
import headerNavigation from './objects/navigation/menus/header/header-navigation';
import internalButton from './objects/navigation/internal-button';
import internalLink from './objects/navigation/internal-link';
import link from './objects/navigation/link';
import links from './objects/navigation/links';
import megaMenu from './objects/navigation/menus/mega-menu/mega-menu';
import linkSection from './objects/navigation/menus/mega-menu/sections/link-section';
import imageBlock from './objects/navigation/menus/mega-menu/sections/image-block';

/**
 * FONT OBJECTS
 * Font-related schema definitions.
 */
import fontAsset from './objects/font/font-asset';
import fontCategory from './objects/font/font-category';
import fontStyleOverride from './objects/font/font-style-override';
import fontWeight from './objects/font/font-weight';

/**
 * FOOTER OBJECTS
 * Footer-specific schema elements.
 */
import socialLinksOnly from './objects/footers/social-links-only';

/**
 * SHOPIFY OBJECTS
 * Shopify integration schema types.
 */
import inventory from './objects/shopify/inventory';
import options from './objects/shopify/options';
import placeholderString from './objects/shopify/placeholder-string';
import priceRange from './objects/shopify/price-range';
import proxyString from './objects/shopify/proxy-string';
import shopifyCollection from './objects/shopify/shopify-collection';
import shopifyCollectionRule from './objects/shopify/shopify-collection-rule';
import shopifyProduct from './objects/shopify/shopify-product';
import shopifyProductVariant from './objects/shopify/shopify-product-variant';

/**
 * SECTION OBJECTS
 * Schema components used for page sections.
 */
import carouselSection from './objects/sections/carousel-section';
import collectionBanner from './objects/sections/collection-banner';
import collectionListSection from './objects/sections/collection-list-section';
import collectionProductGrid from './objects/sections/collection-product-grid';
import featuredCollectionSection from './objects/sections/featured-collection-section';
import featuredProductSection from './objects/sections/featured-product-section';
import imageBannerSection from './objects/sections/image-banner-section';
import productHeroSection from './objects/sections/product-hero-section';
import relatedProductsSection from './objects/sections/related-products-section';
import richtextSection from './objects/sections/richtext-section';

/**
 * SINGLETONS
 * Single-instance schema types for site-wide configuration.
 */
import footer from './singletons/footer';
import header from './singletons/header';
import home from './singletons/home';
import settings from './singletons/settings';
import themeContent from './singletons/theme-content';
import productSectionDesign from './singletons/product-section-design';

/**
 * SCHEMA GROUPS
 * Groups of schema items for organized export.
 */
const singletons = [
  home,
  header,
  footer,
  settings,
  themeContent,
  productSectionDesign,
];

const documents = [
  blogPost,
  collection,
  collectionTemplate,
  color,
  font,
  page,
  product,
  productTemplate,
  productVariant,
];

const sections = [
  carouselSection,
  collectionBanner,
  collectionListSection,
  collectionProductGrid,
  featuredCollectionSection,
  featuredProductSection,
  imageBannerSection,
  productHeroSection,
  relatedProductsSection,
  richtextSection,
];

const footers = [socialLinksOnly];

const objects = [
  /* Global */
  announcementBar,
  aspectRatios,
  bannerRichtext,
  colorPicker,
  contentAlignment,
  contentPosition,
  footersList,
  padding,
  productRichtext,
  rangeSlider,
  richtext,
  sectionSettings,
  sectionsList,
  collectionSections,
  productSections,
  separatorLine,
  seo,

  /* Aside */
  popoverConfig,
  modalConfig,
  sidebarConfig,

  /* Country Selector */
  countrySelector,
  countrySelectorPopover,

  /* Navigation */
  anchor,
  externalLink,
  headerNavigation,
  internalButton,
  internalLink,
  link,
  links,
  megaMenu,
  linkSection,
  imageBlock,

  /* Font */
  fontAsset,
  fontCategory,
  fontStyleOverride,
  fontWeight,

  /* Shopify */
  inventory,
  options,
  placeholderString,
  priceRange,
  proxyString,
  shopifyProduct,
  shopifyProductVariant,
  shopifyCollection,
  shopifyCollectionRule,
];

/**
 * EXPORT SCHEMA
 * Final schema export consumed by Sanity.
 */
export const schemaTypes = [
  ...objects,
  ...documents,
  ...sections,
  ...footers,
  ...singletons,
];
