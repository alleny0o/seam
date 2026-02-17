import {defineQuery} from 'groq';

import {
  EXTERNAL_LINK_FRAGMENT,
  INTERNAL_LINK_FRAGMENT,
  LINK_REFERENCE_FRAGMENT,
  LINKS_LIST_SELECTION,
} from './links';
import {getIntValue} from './utils';

/**
 * IMAGE FRAGMENTS
 * Common fragments for image handling.
 */
export const IMAGE_FRAGMENT = defineQuery(`{
  _type,
  asset,
  "altText": asset -> altText,
  "_ref": asset._ref,
  hotspot,
  crop,
}`);

/**
 * COLOR FRAGMENTS
 * Shared fragments for color and color schemes.
 */
export const COLOR_FRAGMENT = defineQuery(`{
  alpha,
  hex,
  hsl,
  rgb,
}`);

export const COLOR_SCHEME_FRAGMENT = defineQuery(`{
  background ${COLOR_FRAGMENT},
  border ${COLOR_FRAGMENT},
  card ${COLOR_FRAGMENT},
  cardForeground ${COLOR_FRAGMENT},
  foreground ${COLOR_FRAGMENT},
  primary ${COLOR_FRAGMENT},
  primaryForeground ${COLOR_FRAGMENT},
}`);

/**
 * ASIDE CONFIG FRAGMENTS
 * Reusable fragments for drawer and overlay UI configuration.
 * Used by mobile navigation, cart drawer, search drawer, locale selector, etc.
 */
export const DROPDOWN_CONFIG_FRAGMENT = defineQuery(`{
  borderRadius,
  shadow,
  showBorder,
  borderWidth,
}`);

export const SIDEBAR_CONFIG_FRAGMENT = defineQuery(`{
  position,
  width,
  maxWidth,
  fullWidthBelow,
  animation,
  animationDuration,
  overlayOpacity,
}`);

export const MODAL_CONFIG_FRAGMENT = defineQuery(`{
  insetX,
  insetY,
  maxWidth,
  maxHeight,
  fullScreenBelow,
  borderRadius,
  borderRadiusOnFullScreen,
  animation,
  animationDuration,
  overlayOpacity,
}`);

/**
 * LOCALE SELECTOR FRAGMENT
 * Configuration for the locale/country selector UI component with full mode options.
 *
 * Fetches trigger appearance (variant + chevron), color scheme,
 * display mode (single or responsive per breakpoint), and the embedded
 * dropdown/sidebar/modal configs used when the selector opens.
 *
 * Used in two placements:
 * - Header actions area (headerLocaleSelector)
 * - Announcement bar utility links (announcementBarLocaleSelector)
 *
 * Resolved to a fully typed LocaleSelectorConfig via resolveLocaleSelectorConfig().
 */
export const LOCALE_SELECTOR_FRAGMENT = defineQuery(`{
  triggerVariant,
  showChevron,
  colorScheme -> ${COLOR_SCHEME_FRAGMENT},
  displayModeKind,
  mode,
  modeBase,
  modeSm,
  modeMd,
  modeLg,
  dropdownConfig ${DROPDOWN_CONFIG_FRAGMENT},
  sidebarConfig ${SIDEBAR_CONFIG_FRAGMENT},
  modalConfig ${MODAL_CONFIG_FRAGMENT},
}`);

/**
 * DROPDOWN COUNTRY SELECTOR FRAGMENT
 * Simplified locale selector config that only supports dropdown mode.
 *
 * Used in mobile navigation where a dropdown is the only sensible UI pattern
 * (since the selector is already inside a drawer/modal). No display mode options,
 * no sidebar/modal configs — just trigger, color, and dropdown styling.
 *
 * Resolved to a fully typed DropdownCountrySelectorConfig via resolveDropdownCountrySelectorConfig().
 */
export const DROPDOWN_COUNTRY_SELECTOR_FRAGMENT = defineQuery(`{
  triggerVariant,
  showChevron,
  colorScheme -> ${COLOR_SCHEME_FRAGMENT},
  dropdownConfig ${DROPDOWN_CONFIG_FRAGMENT},
}`);

/**
 * THEME CONTENT FRAGMENT
 * Localized interface copy for all theme components.
 */
export const THEME_CONTENT_FRAGMENT = defineQuery(`{
  account {
    "accountDetails": ${getIntValue('accountDetails')},
    "addAddress": ${getIntValue('addAddress')},
    "addName": ${getIntValue('addName')},
    "addressBook": ${getIntValue('addressBook')},
    "addressLine1": ${getIntValue('addressLine1')},
    "addressLine2": ${getIntValue('addressLine2')},
    "cancel": ${getIntValue('cancel')},
    "city": ${getIntValue('city')}, 
    "company": ${getIntValue('company')},
    "country": ${getIntValue('country')},
    "default": ${getIntValue('default')},
    "defaultAddress": ${getIntValue('defaultAddress')},
    "discounts": ${getIntValue('discounts')},
    "discountsOff": ${getIntValue('discountsOff')},
    "edit": ${getIntValue('edit')},
    "editAddress": ${getIntValue('editAddress')},
    "emailAddress": ${getIntValue('emailAddress')},
    "firstName": ${getIntValue('firstName')},
    "fulfillmentStatus": ${getIntValue('fulfillmentStatus')},
    "lastName": ${getIntValue('lastName')},
    "name": ${getIntValue('name')},
    "noAddress": ${getIntValue('noAddress')},
    "noOrdersMessage": ${getIntValue('noOrdersMessage')},
    "noShippingAddress": ${getIntValue('noShippingAddress')},
    "orderDate": ${getIntValue('orderDate')},
    "orderDetail": ${getIntValue('orderDetail')},
    "orderHistory": ${getIntValue('orderHistory')},
    "orderId": ${getIntValue('orderId')},
    "orderNumber": ${getIntValue('orderNumber')},
    "orderStatusCancelled": ${getIntValue('orderStatusCancelled')},
    "orderStatusError": ${getIntValue('orderStatusError')},
    "orderStatusFailure": ${getIntValue('orderStatusFailure')},
    "orderStatusOpen": ${getIntValue('orderStatusOpen')},
    "orderStatusPending": ${getIntValue('orderStatusPending')},
    "orderStatusSuccess": ${getIntValue('orderStatusSuccess')},
    "phone": ${getIntValue('phone')},
    "phoneNumber": ${getIntValue('phoneNumber')},
    "placedOn": ${getIntValue('placedOn')},
    "postalCode": ${getIntValue('postalCode')},
    "price": ${getIntValue('price')},
    "product": ${getIntValue('product')},
    "profile": ${getIntValue('profile')},
    "quantity": ${getIntValue('quantity')},
    "remove": ${getIntValue('remove')},
    "returnToAccount": ${getIntValue('returnToAccount')},
    "save": ${getIntValue('save')},
    "saving": ${getIntValue('saving')},
    "shippingAddress": ${getIntValue('shippingAddress')},
    "signOut": ${getIntValue('signOut')},
    "startShopping": ${getIntValue('startShopping')},
    "stateProvince": ${getIntValue('stateProvince')},
    "status": ${getIntValue('status')},
    "subtotal": ${getIntValue('subtotal')},
    "tax": ${getIntValue('tax')},
    "total": ${getIntValue('total')},
    "updateYourProfile": ${getIntValue('updateYourProfile')},
    "viewDetails": ${getIntValue('viewDetails')},
    "welcome": ${getIntValue('welcome')},
    "welcomeToYourAccount": ${getIntValue('welcomeToYourAccount')},
  },

  cart {
    "applyDiscount": ${getIntValue('applyDiscount')},
    "continueShopping": ${getIntValue('continueShopping')},
    "discountCode": ${getIntValue('discountCode')},
    "discounts": ${getIntValue('discounts')},
    "emptyMessage": ${getIntValue('emptyMessage')},
    "heading": ${getIntValue('heading')},
    "orderSummary": ${getIntValue('orderSummary')},
    "proceedToCheckout": ${getIntValue('proceedToCheckout')},
    "quantity": ${getIntValue('quantity')},
    "remove": ${getIntValue('remove')},
    "subtotal": ${getIntValue('subtotal')},
  },

  collection {
    "apply": ${getIntValue('apply')},
    "clear": ${getIntValue('clear')},
    "clearFilters": ${getIntValue('clearFilters')},
    "filterAndSort": ${getIntValue('filterAndSort')},
    "filterInStock": ${getIntValue('filterInStock')},
    "filterOutOfStock": ${getIntValue('filterOutOfStock')},
    "from": ${getIntValue('from')},
    "loading": ${getIntValue('loading')},
    "loadMoreProducts": ${getIntValue('loadMoreProducts')},
    "loadPrevious": ${getIntValue('loadPrevious')},
    "noCollectionFound": ${getIntValue('noCollectionFound')},
    "noProductFound": ${getIntValue('noProductFound')},
    "sortBestSelling": ${getIntValue('sortBestSelling')},
    "sortBy": ${getIntValue('sortBy')},
    "sortFeatured": ${getIntValue('sortFeatured')},
    "sortHighLow": ${getIntValue('sortHighLow')},
    "sortLowHigh": ${getIntValue('sortLowHigh')},
    "sortNewest": ${getIntValue('sortNewest')},
    "to": ${getIntValue('to')}, 
    "viewAll": ${getIntValue('viewAll')},
  },

  error {
    "addressCreation": ${getIntValue('addressCreation')},
    "missingAddressId": ${getIntValue('missingAddressId')},
    "pageNotFound": ${getIntValue('pageNotFound')},
    "reloadPage": ${getIntValue('reloadPage')},
    "sectionError": ${getIntValue('sectionError')},
    "serverError": ${getIntValue('serverError')},
  },

  product {
    "addToCart": ${getIntValue('addToCart')},
    "quantitySelector": ${getIntValue('quantitySelector')},
    "sale": ${getIntValue('sale')},
    "soldOut": ${getIntValue('soldOut')},
  },
}`);

/**
 * SETTINGS FRAGMENT
 * Style, spacing, media, integrations, and global configuration.
 */
export const SETTINGS_FRAGMENT = defineQuery(`{
  badgesCornerRadius,
  badgesPosition,
  badgesSaleColorScheme -> ${COLOR_SCHEME_FRAGMENT},
  badgesSoldOutColorScheme -> ${COLOR_SCHEME_FRAGMENT},
  blogCards,
  buttonsBorder,
  buttonsShadow,
  cartCollection -> {
    store {
      gid,
      title,
    },
  },
  cartColorScheme -> ${COLOR_SCHEME_FRAGMENT},
  collectionCards,
  containerMaxWidth,
  description,
  dropdownsAndPopupsBorder,
  dropdownsAndPopupsShadow,
  facebook,
  favicon ${IMAGE_FRAGMENT},
  grid,
  inputsBorder,
  inputsShadow,
  instagram,
  linkedin,
  logo ${IMAGE_FRAGMENT},
  mediaBorder,
  mediaShadow,
  pinterest,
  productCards,
  showCurrencyCodes,
  showTrailingZeros,
  siteName,
  snapchat,
  socialSharingImagePreview ${IMAGE_FRAGMENT},
  spaceBetweenTemplateSections,
  tiktok,
  tumblr,
  twitter,
  vimeo,
  youtube,
}`);

/**
 * FONT FRAGMENTS
 * Handles font families, assets, sizing, and typography rules.
 */
const FONT_ASSET_FRAGMENT = defineQuery(`{
  "extension": asset -> extension,
  "mimeType": asset -> mimeType,
  "url": asset -> url,
}`);

export const FONT_FRAGMENT = defineQuery(`{
  baseSize,
  capitalize,
  font[] {
    antialiased,
    fontAssets[] {
      "fontName": ^.fontName,
      fontStyle,
      fontWeight,
      ttf ${FONT_ASSET_FRAGMENT},
      woff ${FONT_ASSET_FRAGMENT},
      woff2 ${FONT_ASSET_FRAGMENT},
    },
    fontName,
    fontType,
  },
  letterSpacing,
  lineHeight,
}`);

/**
 * FONT STYLE OVERRIDE FRAGMENT
 * Component-level typography overrides (role + optional customizations).
 */
export const FONT_STYLE_OVERRIDE_FRAGMENT = defineQuery(`{
  role,
  enabled,
  fontWeight,
  fontSize,
  fontStyle,
  letterSpacing,
  lineHeight,
  capitalize,
}`);

/**
 * RICHTEXT FRAGMENT
 * Richtext block processing with inline links and images.
 */
export const RICHTEXT_FRAGMENT = defineQuery(`{
  ...,
  _type == 'image' => ${IMAGE_FRAGMENT},
  _type == 'button' => {
    ...,
    link -> ${LINK_REFERENCE_FRAGMENT},
  },
  _type == 'block' => {
    ...,
    markDefs[] {
      ...,
      _type == 'internalLink' => ${INTERNAL_LINK_FRAGMENT},
      _type == 'externalLink' => ${EXTERNAL_LINK_FRAGMENT},
    }
  }
}`);

/**
 * PRODUCT SECTION DESIGN FRAGMENT
 * Controls layout options for product hero/section variants.
 */
export const PRODUCT_SECTION_DESIGN_FRAGMENT = defineQuery(`{
  breakpoint,
  flipLayout,
  columnRatio,
  gap {
    desktop,
    mobile
  },
  detailsPadding {
    desktop { x, y },
    mobile { x, y }
  },
  mobileLayout,
  mobileHeaderContent {
    showVendor,
    showTitle,
    showReviews,
    showPrice
  },
  mobileHeaderPaddingY,
  galleryDisplay,
  gridGap,
  mediaBorderRadius,
  showArrows,
  showThumbnails,
  thumbnailOptions {
    position,
    overlayOnImage,
    borderRadius
  },
  showThumbnailsOnMobile,
  mediaInteraction,
  showDots
}`);

/**
 * HEADER FRAGMENT
 * Full header configuration including announcement bar, navigation,
 * desktop mega menu, mobile navigation, layout, appearance, actions, and behavior.
 */
export const HEADER_FRAGMENT = defineQuery(`{
  // ─────────────────────────────────────────────────────────────────────────
  // ANNOUNCEMENT BAR
  // ─────────────────────────────────────────────────────────────────────────

  // Content (localized)
  "announcementBar": coalesce(
    announcementBar[_key == $language][0].value[],
    announcementBar[_key == $defaultLanguage][0].value[],
  )[] {
    _type == "announcement" => {
      _key,
      externalLink,
      link -> ${LINK_REFERENCE_FRAGMENT},
      openInNewTab,
      text,
    },
  },

  // Utility links (localized)
  "utilityLinks": coalesce(
    utilityLinks[_key == $language][0].value[],
    utilityLinks[_key == $defaultLanguage][0].value[],
  )[] ${LINKS_LIST_SELECTION},

  // Locale selector
  showAnnouncementBarLocaleSelector,
  announcementBarLocaleSelector ${LOCALE_SELECTOR_FRAGMENT},

  // Appearance
  announcementBarColorScheme -> ${COLOR_SCHEME_FRAGMENT},
  announcementBarTypography ${FONT_STYLE_OVERRIDE_FRAGMENT},
  utilityLinksTypography ${FONT_STYLE_OVERRIDE_FRAGMENT},
  announcementBarPadding,

  // Behavior
  fadeTransition,
  autoRotateAnnouncements,
  showAnnouncementArrows,
  announcementArrowSize,
  announcementArrowStrokeWidth,

  // ─────────────────────────────────────────────────────────────────────────
  // NAVIGATION MENU
  // Shared between desktop and mobile.
  // ─────────────────────────────────────────────────────────────────────────

  "menu": coalesce(
    menu[_key == $language][0].value[],
    menu[_key == $defaultLanguage][0].value[],
  )[] ${LINKS_LIST_SELECTION},

  // ─────────────────────────────────────────────────────────────────────────
  // DESKTOP NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────

  // Typography + spacing
  desktopNavigationTypography ${FONT_STYLE_OVERRIDE_FRAGMENT},
  desktopMenuItemPaddingX,
  desktopMenuItemPaddingY,
  desktopNavigationHoverEffect,

  // ─────────────────────────────────────────────────────────────────────────
  // DESKTOP MEGA MENU
  // ─────────────────────────────────────────────────────────────────────────

  // Appearance
  desktopMegaMenuColorScheme -> ${COLOR_SCHEME_FRAGMENT},
  desktopMegaMenuPadding,
  desktopMegaMenuSeparatorLine {
    show,
    opacity,
    height,
  },

  // Typography
  desktopMegaMenuHeadingTypography ${FONT_STYLE_OVERRIDE_FRAGMENT},
  desktopMegaMenuHeadingHoverEffect,
  desktopMegaMenuLinkTypography ${FONT_STYLE_OVERRIDE_FRAGMENT},
  desktopMegaMenuLinkHoverEffect,
  desktopMegaMenuImageBlockHeadingTypography ${FONT_STYLE_OVERRIDE_FRAGMENT},
  desktopMegaMenuImageBlockDescriptionTypography ${FONT_STYLE_OVERRIDE_FRAGMENT},
  desktopMegaMenuCTATypography ${FONT_STYLE_OVERRIDE_FRAGMENT},

  // Behavior
  desktopMegaMenuBehavior,
  desktopAllowMegaMenuParentLinks,
  desktopMegaMenuDisableScroll,

  // Overlay
  desktopMegaMenuShowOverlay,
  desktopMegaMenuOverlayOpacity,

  // Animation
  desktopMegaMenuAnimation,
  desktopMegaMenuAnimationDuration,
  desktopMegaMenuContentStagger,
  desktopMegaMenuStaggerDelay,
  desktopMegaMenuStaggerStartDelay,

  // ─────────────────────────────────────────────────────────────────────────
  // MOBILE NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────

  // Drawer type + config
  mobileDrawerType,
  mobileSidebarConfig ${SIDEBAR_CONFIG_FRAGMENT},
  mobileModalConfig ${MODAL_CONFIG_FRAGMENT},

  // Structure + behavior
  mobileMegaMenuDepth,
  mobileMegaMenuBehavior,

  // Spacing
  mobileDrawerContentPaddingX,
  mobileDrawerContentPaddingY,
  mobileNavigationItemPaddingY,
  mobileMegaMenuLinkSpacing,

  // Typography
  mobileNavigationTypography ${FONT_STYLE_OVERRIDE_FRAGMENT},
  mobileMegaMenuHeadingTypography ${FONT_STYLE_OVERRIDE_FRAGMENT},
  mobileMegaMenuLinkTypography ${FONT_STYLE_OVERRIDE_FRAGMENT},

  // Color scheme + appearance
  mobileNavigationColorScheme -> ${COLOR_SCHEME_FRAGMENT},
  mobileMegaMenuSectionBackgroundProperty,
  mobileMegaMenuLinkBackgroundProperty,
  mobileNavigationSeparatorLine {
    show,
    opacity,
    height,
  },

  // Locale selector (dropdown only)
  showMobileLocaleSelector,
  mobileLocaleSelector ${DROPDOWN_COUNTRY_SELECTOR_FRAGMENT},

  // ─────────────────────────────────────────────────────────────────────────
  // HEADER APPEARANCE
  // ─────────────────────────────────────────────────────────────────────────

  colorScheme -> ${COLOR_SCHEME_FRAGMENT},
  blur,
  separatorLine {
    show,
    opacity,
    height,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LAYOUT
  // ─────────────────────────────────────────────────────────────────────────

  desktopLayout,
  mobileLayout,
  desktopLogoWidth,
  headerMinHeight,

  // ─────────────────────────────────────────────────────────────────────────
  // ACTIONS
  // Account, cart, wishlist, locale selector.
  // ─────────────────────────────────────────────────────────────────────────

  showWishlist,
  showHeaderLocaleSelector,
  headerLocaleSelector ${LOCALE_SELECTOR_FRAGMENT},
  accountStyleDesktop,
  actionsTypography ${FONT_STYLE_OVERRIDE_FRAGMENT},
  cartStyleDesktop,
  cartStyleMobile,

  // ─────────────────────────────────────────────────────────────────────────
  // BEHAVIOR
  // ─────────────────────────────────────────────────────────────────────────

  sticky,
}`);
