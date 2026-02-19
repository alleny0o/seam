import {defineField, defineType} from 'sanity';

/**
 * GROUPS
 * Each group maps to a top-level tab in the Sanity studio editor.
 * Order here controls the order of tabs in the UI.
 */
const GROUPS = [
  {name: 'navigation', title: 'Navigation', default: true},
  {name: 'desktopNavigation', title: 'Desktop Navigation'},
  {name: 'desktopMegaMenu', title: 'Desktop Mega Menu'},
  {name: 'mobileNavigation', title: 'Mobile Navigation'},
  {name: 'announcementBar', title: 'Announcement Bar'},
  {name: 'layout', title: 'Layout'},
  {name: 'appearance', title: 'Appearance'},
  {name: 'actions', title: 'Actions'},
  {name: 'behavior', title: 'Behavior'},
];

export default defineType({
  name: 'header',
  type: 'document',
  __experimental_formPreviewTitle: false,
  groups: GROUPS,

  fields: [
    // ============================================================================
    // NAVIGATION
    // Menu structure shared across desktop and mobile.
    // ============================================================================
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'internationalizedArrayHeaderNavigation',
      group: 'navigation',
      description: 'Navigation structure used for both desktop and mobile',
    }),

    // ============================================================================
    // DESKTOP NAVIGATION
    // Link styling and hover effects for the top-level desktop nav bar.
    // ============================================================================
    defineField({
      name: 'desktopNavigationTypography',
      title: 'Typography',
      type: 'fontStyleOverride',
      group: 'desktopNavigation',
      description: 'Typography for desktop navigation links',
    }),
    defineField({
      name: 'desktopMenuItemPaddingX',
      title: 'Item horizontal padding',
      type: 'rangeSlider',
      group: 'desktopNavigation',
      options: {min: 0, max: 30, suffix: 'px'},
      initialValue: 4,
    }),
    defineField({
      name: 'desktopMenuItemPaddingY',
      title: 'Item vertical padding',
      type: 'rangeSlider',
      group: 'desktopNavigation',
      options: {min: 0, max: 30, suffix: 'px'},
      initialValue: 4,
    }),
    defineField({
      name: 'desktopNavigationHoverEffect',
      title: 'Link hover effect',
      type: 'string',
      group: 'desktopNavigation',
      description: 'Hover animation for desktop navigation links',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Underline (Animated)', value: 'underline'},
          {title: 'Underline (Instant)', value: 'underlineInstant'},
          {title: 'Color Change', value: 'color'},
          {title: 'Background Fill', value: 'background'},
          {title: 'Scale', value: 'scale'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
    }),

    // ============================================================================
    // DESKTOP MEGA MENU
    // Appearance, typography, behavior, and animation for the desktop mega menu.
    // ============================================================================

    // — Appearance —
    defineField({
      name: 'desktopMegaMenuColorScheme',
      title: 'Color scheme',
      type: 'reference',
      to: [{type: 'colorScheme'}],
      group: 'desktopMegaMenu',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desktopMegaMenuPadding',
      title: 'Padding',
      type: 'padding',
      group: 'desktopMegaMenu',
    }),
    defineField({
      name: 'desktopMegaMenuSeparatorLine',
      title: 'Separator line',
      type: 'separatorLine',
      group: 'desktopMegaMenu',
      description: 'Separator between the header and the open mega menu',
    }),

    // — Typography —
    defineField({
      name: 'desktopMegaMenuHeadingTypography',
      title: 'Section heading typography',
      type: 'fontStyleOverride',
      group: 'desktopMegaMenu',
      description: 'Typography for mega menu section headings',
    }),
    defineField({
      name: 'desktopMegaMenuLinkTypography',
      title: 'Link typography',
      type: 'fontStyleOverride',
      group: 'desktopMegaMenu',
      description: 'Typography for mega menu links',
    }),
    defineField({
      name: 'desktopMegaMenuImageBlockHeadingTypography',
      title: 'Image block heading typography',
      type: 'fontStyleOverride',
      group: 'desktopMegaMenu',
      description: 'Typography for image block headings',
    }),
    defineField({
      name: 'desktopMegaMenuImageBlockDescriptionTypography',
      title: 'Image block description typography',
      type: 'fontStyleOverride',
      group: 'desktopMegaMenu',
      description: 'Typography for image block descriptions',
    }),
    defineField({
      name: 'desktopMegaMenuCTATypography',
      title: 'CTA typography',
      type: 'fontStyleOverride',
      group: 'desktopMegaMenu',
      description: 'Typography for CTA buttons in image blocks',
    }),

    // — Hover effects —
    defineField({
      name: 'desktopMegaMenuHeadingHoverEffect',
      title: 'Section heading hover effect',
      type: 'string',
      group: 'desktopMegaMenu',
      description: 'Hover animation for mega menu section heading links',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Underline (Animated)', value: 'underline'},
          {title: 'Underline (Instant)', value: 'underlineInstant'},
          {title: 'Color Change', value: 'color'},
          {title: 'Background Fill', value: 'background'},
          {title: 'Scale', value: 'scale'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'desktopMegaMenuLinkHoverEffect',
      title: 'Link hover effect',
      type: 'string',
      group: 'desktopMegaMenu',
      description: 'Hover animation for mega menu links',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Underline (Animated)', value: 'underline'},
          {title: 'Underline (Instant)', value: 'underlineInstant'},
          {title: 'Color Change', value: 'color'},
          {title: 'Background Fill', value: 'background'},
          {title: 'Scale', value: 'scale'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
    }),

    // — Behavior —
    defineField({
      name: 'desktopMegaMenuBehavior',
      title: 'Open interaction',
      type: 'string',
      group: 'desktopMegaMenu',
      description: 'How desktop mega menus open. Touch devices always use tap.',
      options: {
        list: [
          {title: 'Hover to open (Traditional)', value: 'hover'},
          {title: 'Click to open (Shinola style)', value: 'click'},
        ],
        layout: 'radio',
      },
      initialValue: 'hover',
    }),
    defineField({
      name: 'desktopAllowMegaMenuParentLinks',
      title: 'Allow parent navigation links',
      type: 'boolean',
      group: 'desktopMegaMenu',
      initialValue: true,
      description:
        'If enabled, parent menu items can have links. If disabled, they only toggle the menu.',
    }),
    defineField({
      name: 'desktopMegaMenuDisableScroll',
      title: 'Disable page scroll when open',
      type: 'boolean',
      group: 'desktopMegaMenu',
      initialValue: false,
    }),

    // — Overlay —
    defineField({
      name: 'desktopMegaMenuShowOverlay',
      title: 'Show overlay when open',
      type: 'boolean',
      group: 'desktopMegaMenu',
      initialValue: false,
    }),
    defineField({
      name: 'desktopMegaMenuOverlayOpacity',
      title: 'Overlay opacity',
      type: 'rangeSlider',
      group: 'desktopMegaMenu',
      options: {min: 0, max: 100, suffix: '%'},
      initialValue: 50,
      hidden: ({parent}) => !parent?.desktopMegaMenuShowOverlay,
    }),

    // — Animation —
    defineField({
      name: 'desktopMegaMenuAnimation',
      title: 'Entrance animation',
      type: 'string',
      group: 'desktopMegaMenu',
      description: 'Animation when the mega menu appears',
      options: {
        list: [
          {title: 'None (Instant)', value: 'none'},
          {title: 'Fade', value: 'fade'},
          {title: 'Slide Down', value: 'slideDown'},
          {title: 'Slide + Fade (Recommended)', value: 'slideFade'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'slideFade',
    }),
    defineField({
      name: 'desktopMegaMenuAnimationDuration',
      title: 'Animation duration',
      type: 'rangeSlider',
      group: 'desktopMegaMenu',
      description: 'How fast the mega menu animates in',
      options: {min: 100, max: 800, suffix: 'ms', step: 50},
      initialValue: 250,
    }),
    defineField({
      name: 'desktopMegaMenuContentStagger',
      title: 'Content stagger animation',
      type: 'string',
      group: 'desktopMegaMenu',
      description: 'How links and sections appear inside the mega menu',
      options: {
        list: [
          {title: 'None (All at once)', value: 'none'},
          {title: 'Fade', value: 'fade'},
          {title: 'Lift (Fade + Rise)', value: 'lift'},
          {title: 'Scale (Fade + Zoom)', value: 'scale'},
          {title: 'Blur (Premium)', value: 'blur'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'desktopMegaMenuStaggerDelay',
      title: 'Stagger delay between items',
      type: 'rangeSlider',
      group: 'desktopMegaMenu',
      description: 'Delay between each item animating in',
      options: {min: 30, max: 150, suffix: 'ms', step: 10},
      initialValue: 50,
      hidden: ({parent}) => parent?.desktopMegaMenuContentStagger === 'none',
    }),
    defineField({
      name: 'desktopMegaMenuStaggerStartDelay',
      title: 'Stagger start delay',
      type: 'rangeSlider',
      group: 'desktopMegaMenu',
      description:
        'Delay before stagger begins (useful for matching the dropdown entrance animation)',
      options: {min: 0, max: 600, suffix: 'ms', step: 50},
      initialValue: 0,
      hidden: ({parent}) => parent?.desktopMegaMenuContentStagger === 'none',
    }),

    // ============================================================================
    // MOBILE NAVIGATION
    // Drawer type, structure, spacing, typography, color, and separators.
    // Image blocks from desktop mega menus are hidden on mobile.
    // ============================================================================

    // — Drawer —
    defineField({
      name: 'mobileDrawerType',
      title: 'Drawer type',
      type: 'string',
      group: 'mobileNavigation',
      description:
        'Choose between side drawer or centered modal for mobile navigation',
      options: {
        list: [
          {title: 'Sidebar (Slide from side)', value: 'sidebar'},
          {title: 'Modal (Center overlay)', value: 'modal'},
        ],
        layout: 'radio',
      },
      initialValue: 'sidebar',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileSidebarConfig',
      title: 'Sidebar configuration',
      type: 'sidebarConfig',
      group: 'mobileNavigation',
      hidden: ({parent}) => parent?.mobileDrawerType !== 'sidebar',
    }),
    defineField({
      name: 'mobileModalConfig',
      title: 'Modal configuration',
      type: 'modalConfig',
      group: 'mobileNavigation',
      hidden: ({parent}) => parent?.mobileDrawerType !== 'modal',
    }),

    // — Structure —
    defineField({
      name: 'mobileMegaMenuDepth',
      title: 'Navigation structure',
      type: 'string',
      group: 'mobileNavigation',
      description:
        'FLAT: Tap main navigation → see all submenu links directly. GROUPED: Tap main navigation → tap section heading → see links.',
      options: {
        list: [
          {title: 'Flat (One tap to links)', value: 'flat'},
          {title: 'Grouped (Two taps: section → links)', value: 'nested'},
        ],
        layout: 'radio',
      },
      initialValue: 'nested',
    }),
    defineField({
      name: 'mobileMegaMenuBehavior',
      title: 'Submenu display style',
      type: 'string',
      group: 'mobileNavigation',
      description:
        'ACCORDION: Submenus expand below. SEQUENTIAL: Submenus replace the screen with a back button.',
      options: {
        list: [
          {title: 'Accordion (Expands in place)', value: 'accordion'},
          {title: 'Sequential (Slides to new screen)', value: 'sequential'},
        ],
        layout: 'radio',
      },
      initialValue: 'accordion',
      validation: (Rule) => Rule.required(),
    }),

    // — Spacing —
    defineField({
      name: 'mobileDrawerContentPaddingX',
      title: 'Drawer horizontal padding',
      type: 'rangeSlider',
      group: 'mobileNavigation',
      options: {min: 0, max: 100, suffix: 'px'},
      initialValue: 20,
      description: 'Left and right spacing inside the drawer',
    }),
    defineField({
      name: 'mobileDrawerContentPaddingY',
      title: 'Drawer vertical padding',
      type: 'rangeSlider',
      group: 'mobileNavigation',
      options: {min: 0, max: 100, suffix: 'px'},
      initialValue: 20,
      description: 'Top and bottom spacing inside the drawer',
    }),
    defineField({
      name: 'mobileNavigationItemPaddingY',
      title: 'Navigation item vertical padding',
      type: 'rangeSlider',
      group: 'mobileNavigation',
      options: {min: 0, max: 40, suffix: 'px'},
      initialValue: 12,
      description:
        'Vertical padding inside each tappable navigation item (affects tap target size)',
    }),
    defineField({
      name: 'mobileMegaMenuLinkSpacing',
      title: 'Submenu link spacing',
      type: 'rangeSlider',
      group: 'mobileNavigation',
      options: {min: 0, max: 40, suffix: 'px'},
      initialValue: 0,
      description: 'Vertical spacing between submenu links',
    }),

    // — Typography —
    defineField({
      name: 'mobileNavigationTypography',
      title: 'Top-level navigation typography',
      type: 'fontStyleOverride',
      group: 'mobileNavigation',
      description: 'Typography for top-level navigation items',
    }),
    defineField({
      name: 'mobileMegaMenuHeadingTypography',
      title: 'Section heading typography',
      type: 'fontStyleOverride',
      group: 'mobileNavigation',
      description: 'Typography for section headings',
    }),
    defineField({
      name: 'mobileMegaMenuLinkTypography',
      title: 'Link typography',
      type: 'fontStyleOverride',
      group: 'mobileNavigation',
      description: 'Typography for submenu links',
    }),

    // — Color —
    defineField({
      name: 'mobileNavigationColorScheme',
      title: 'Color scheme',
      type: 'reference',
      to: [{type: 'colorScheme'}],
      group: 'mobileNavigation',
      description: 'Color scheme for the mobile navigation drawer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileMegaMenuSectionBackgroundProperty',
      title: 'Section heading background color',
      type: 'string',
      group: 'mobileNavigation',
      description:
        'Which color property to use for section heading backgrounds',
      options: {
        list: [
          {title: 'Background', value: 'background'},
          {title: 'Card', value: 'card'},
          {title: 'Primary', value: 'primary'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'card',
      hidden: ({parent}) => !parent?.mobileNavigationColorScheme,
    }),
    defineField({
      name: 'mobileMegaMenuLinkBackgroundProperty',
      title: 'Link background color',
      type: 'string',
      group: 'mobileNavigation',
      description: 'Which color property to use for link backgrounds',
      options: {
        list: [
          {title: 'Background', value: 'background'},
          {title: 'Card', value: 'card'},
          {title: 'Primary', value: 'primary'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'background',
      hidden: ({parent}) => !parent?.mobileNavigationColorScheme,
    }),

    // — Separators —
    defineField({
      name: 'mobileNavigationSeparatorLine',
      title: 'Navigation separator line',
      type: 'separatorLine',
      group: 'mobileNavigation',
      description: 'Separator line between navigation items',
    }),

    // — Locale selector —
    defineField({
      name: 'showMobileLocaleSelector',
      title: 'Show locale selector',
      type: 'boolean',
      group: 'mobileNavigation',
      description: 'Show a locale selector in the mobile navigation drawer',
      initialValue: false,
    }),
    defineField({
      name: 'mobileLocaleSelector',
      title: 'Locale selector',
      type: 'dropdownCountrySelector', // was: 'countrySelector'
      group: 'mobileNavigation',
      hidden: ({parent}) => !parent?.showMobileLocaleSelector,
    }),

    // ============================================================================
    // ANNOUNCEMENT BAR
    // Content, appearance, and behavior for the top announcement strip.
    // ============================================================================

    // — Content —
    defineField({
      name: 'announcementBar',
      title: 'Announcements',
      type: 'internationalizedArrayAnnouncementBar',
      group: 'announcementBar',
    }),
    defineField({
      name: 'announcementBarUtilityLinks',
      title: 'Utility links',
      type: 'internationalizedArrayLinks',
      group: 'announcementBar',
      description:
        'Links on the right side of the announcement bar (e.g. Help, Stocklists, Services)',
    }),
    defineField({
      name: 'showAnnouncementBarLocaleSelector',
      title: 'Show locale selector',
      type: 'boolean',
      group: 'announcementBar',
      description: 'Show a locale selector after the utility links',
      initialValue: false,
    }),
    defineField({
      name: 'announcementBarLocaleSelector',
      title: 'Locale selector',
      type: 'countrySelector',
      group: 'announcementBar',
      hidden: ({parent}) => !parent?.showAnnouncementBarLocaleSelector,
    }),

    // — Appearance —
    defineField({
      name: 'announcementBarColorScheme',
      title: 'Color scheme',
      type: 'reference',
      to: [{type: 'colorScheme'}],
      group: 'announcementBar',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'announcementBarPadding',
      title: 'Padding',
      type: 'padding',
      group: 'announcementBar',
    }),
    defineField({
      name: 'announcementBarTypography',
      title: 'Announcement typography',
      type: 'fontStyleOverride',
      group: 'announcementBar',
      description: 'Typography for announcement bar text',
    }),
    defineField({
      name: 'utilityLinksTypography',
      title: 'Utility links typography',
      type: 'fontStyleOverride',
      group: 'announcementBar',
      description: 'Typography for utility links',
    }),

    // — Behavior —
    defineField({
      name: 'autoRotateAnnouncements',
      title: 'Auto rotate announcements',
      type: 'boolean',
      group: 'announcementBar',
      initialValue: false,
    }),
    defineField({
      name: 'fadeTransition',
      title: 'Use fade transition',
      type: 'boolean',
      group: 'announcementBar',
      description: 'Fade between announcements instead of sliding',
      initialValue: false,
    }),
    defineField({
      name: 'showAnnouncementArrows',
      title: 'Show navigation arrows',
      type: 'boolean',
      group: 'announcementBar',
      initialValue: true,
    }),
    defineField({
      name: 'announcementArrowSize',
      title: 'Arrow size',
      type: 'rangeSlider',
      group: 'announcementBar',
      options: {min: 16, max: 48, suffix: 'px'},
      initialValue: 24,
      description: 'Size of the announcement navigation arrows',
      hidden: ({parent}) => !parent?.showAnnouncementArrows,
    }),
    defineField({
      name: 'announcementArrowStrokeWidth',
      title: 'Arrow stroke width',
      type: 'rangeSlider',
      group: 'announcementBar',
      options: {min: 1, max: 4, suffix: 'px', step: 0.25},
      initialValue: 2,
      description: 'Thickness of the announcement navigation arrow lines',
      hidden: ({parent}) => !parent?.showAnnouncementArrows,
    }),

    // ============================================================================
    // LAYOUT
    // Header layout options for desktop and mobile.
    // ============================================================================
    defineField({
      name: 'desktopLayout',
      title: 'Desktop layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          {title: 'LOGO - NAV <-> ACTIONS', value: 'classic'},
          {title: 'NAV <-> LOGO <-> ACTIONS', value: 'centerLogo'},
          {title: 'LOGO <-> NAV <-> ACTIONS', value: 'threeColumn'},
          {title: 'LOGO <-> NAV - ACTIONS', value: 'splitRight'},
        ],
        layout: 'radio',
      },
      initialValue: 'classic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileLayout',
      title: 'Mobile layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          {title: '☰ 🔍 <-> LOGO <-> ACTIONS', value: 'balanced'},
          {title: '☰ LOGO <-> ACTIONS', value: 'menuLeft'},
          {title: 'LOGO <-> 🔍 🛒 👤 ☰', value: 'brandLeft'},
        ],
        layout: 'radio',
      },
      initialValue: 'menuLeft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desktopLogoWidth',
      title: 'Desktop logo width',
      type: 'rangeSlider',
      group: 'layout',
      options: {min: 0, max: 400, suffix: 'px'},
      initialValue: 100,
      validation: (Rule) => Rule.min(0).max(400),
    }),
    defineField({
      name: 'headerMinHeight',
      title: 'Minimum height',
      type: 'rangeSlider',
      group: 'layout',
      description: 'Minimum header height (content may expand beyond this)',
      options: {min: 0, max: 100, suffix: 'px'},
      initialValue: 0,
    }),

    // ============================================================================
    // APPEARANCE
    // Header-level color, blur, and separator. Announcement bar appearance
    // is configured in the Announcement Bar tab.
    // ============================================================================
    defineField({
      name: 'colorScheme',
      title: 'Header color scheme',
      type: 'reference',
      to: [{type: 'colorScheme'}],
      group: 'appearance',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blur',
      title: 'Background blur',
      type: 'boolean',
      group: 'appearance',
      initialValue: false,
    }),
    defineField({
      name: 'separatorLine',
      title: 'Separator line',
      type: 'separatorLine',
      group: 'appearance',
      description: 'Separator between the header and page content',
    }),

    // ============================================================================
    // ACTIONS
    // Visibility and display style for header action buttons.
    // ============================================================================
    defineField({
      name: 'showWishlist',
      title: 'Show wishlist',
      type: 'boolean',
      group: 'actions',
      initialValue: false,
    }),
    defineField({
      name: 'showHeaderLocaleSelector',
      title: 'Show locale selector',
      type: 'boolean',
      group: 'actions',
      description: 'Show a locale selector in the header actions area',
      initialValue: false,
    }),
    defineField({
      name: 'headerLocaleSelector',
      title: 'Locale selector',
      type: 'countrySelector',
      group: 'actions',
      hidden: ({parent}) => !parent?.showHeaderLocaleSelector,
    }),
    defineField({
      name: 'accountStyleDesktop',
      title: 'Account display (desktop)',
      type: 'string',
      group: 'actions',
      description: 'Mobile always uses icon.',
      options: {
        list: [
          {title: 'Icon', value: 'icon'},
          {title: 'Text (Account)', value: 'text'},
        ],
        layout: 'radio',
      },
      initialValue: 'icon',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cartStyleDesktop',
      title: 'Cart display (desktop)',
      type: 'string',
      group: 'actions',
      options: {
        list: [
          {title: 'Icon', value: 'icon'},
          {title: 'Text (Cart)', value: 'text'},
        ],
        layout: 'radio',
      },
      initialValue: 'icon',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cartStyleMobile',
      title: 'Cart display (mobile)',
      type: 'string',
      group: 'actions',
      options: {
        list: [
          {title: 'Icon', value: 'icon'},
          {title: 'Text ([count])', value: 'text'},
        ],
        layout: 'radio',
      },
      initialValue: 'icon',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'actionsTypography',
      title: 'Actions typography',
      type: 'fontStyleOverride',
      group: 'actions',
      description: 'Typography for action labels (Account, Cart)',
    }),

    // ============================================================================
    // BEHAVIOR
    // Global header scroll and sticky behavior.
    // ============================================================================
    defineField({
      name: 'sticky',
      title: 'Sticky header',
      type: 'string',
      group: 'behavior',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'On scroll up', value: 'onScrollUp'},
          {title: 'Always', value: 'always'},
        ],
        layout: 'radio',
      },
      initialValue: 'none',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    prepare: () => ({title: 'Header'}),
  },
});
