import {cn} from '~/lib/utils';

import {useLocaleSelector} from '../hooks/use-locale-selector';
import {useLocaleSelectorContext} from '../context/locale-selector-context';
import {LocaleTrigger} from './locale-trigger';
import {LocaleForm} from './locale-form';
import {LocaleDropdown} from './locale-dropdown';
import {LocaleModal, useLocaleModal} from './locale-modal';
import {LocaleSidebar, useLocaleSidebar} from './locale-sidebar';

import type {
  LocaleSelectorProps,
  DropdownLocaleSelectorProps,
  SelectorMode,
  DisplayMode,
  PlacementId,
} from '../types';

// ============================================================================
// HELPERS
// ============================================================================

function getResponsiveClasses(
  displayMode: DisplayMode,
  targetMode: SelectorMode,
): string {
  if (displayMode.kind === 'single') {
    return displayMode.mode === targetMode ? 'block' : 'hidden';
  }

  const {base, sm, md, lg} = displayMode;

  const resolved = {
    base,
    sm: sm ?? base,
    md: md ?? sm ?? base,
    lg: lg ?? md ?? sm ?? base,
  };

  const visibleAt = {
    base: resolved.base === targetMode,
    sm: resolved.sm === targetMode,
    md: resolved.md === targetMode,
    lg: resolved.lg === targetMode,
  };

  const classes: string[] = [];

  classes.push(visibleAt.base ? 'block' : 'hidden');

  if (visibleAt.sm !== visibleAt.base) {
    classes.push(visibleAt.sm ? 'sm:block' : 'sm:hidden');
  }

  if (visibleAt.md !== visibleAt.sm) {
    classes.push(visibleAt.md ? 'md:block' : 'md:hidden');
  }

  if (visibleAt.lg !== visibleAt.md) {
    classes.push(visibleAt.lg ? 'lg:block' : 'lg:hidden');
  }

  return classes.join(' ');
}

// ============================================================================
// INNER COMPONENTS
// ============================================================================

interface DropdownSelectorProps extends LocaleSelectorProps {
  placementId: PlacementId;
}

function DropdownSelector({
  config,
  inMobileMenu,
  placementId,
}: DropdownSelectorProps) {
  const {isOpenFor, open, close} = useLocaleSelectorContext();
  const isOpen = isOpenFor(placementId);
  const {
    currentLocale,
    locales,
    selectedCountry,
    setSelectedCountry,
    availableLanguages,
    handleLocaleChange,
  } = useLocaleSelector();

  return (
    <LocaleDropdown
      isOpen={isOpen}
      onOpenChange={(next) => (next ? open(placementId) : close())}
      forceUpward={inMobileMenu}
      dropdownConfig={config.dropdownConfig}
      trigger={
        <LocaleTrigger
          variant={config.triggerVariant}
          showChevron={config.showChevron}
          locale={currentLocale}
          isOpen={isOpen}
          onClick={() => {}}
        />
      }
    >
      <LocaleForm
        currentLocale={currentLocale}
        locales={locales}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        availableLanguages={availableLanguages}
        handleLocaleChange={handleLocaleChange}
        onClose={close}
      />
    </LocaleDropdown>
  );
}

function ModalSelector({config, placementId}: LocaleSelectorProps) {
  const {isOpen, toggle, close} = useLocaleModal();
  const {
    currentLocale,
    locales,
    selectedCountry,
    setSelectedCountry,
    availableLanguages,
    handleLocaleChange,
  } = useLocaleSelector();

  return (
    <>
      <LocaleTrigger
        variant={config.triggerVariant}
        showChevron={config.showChevron}
        locale={currentLocale}
        isOpen={isOpen}
        onClick={toggle}
      />
      <LocaleModal modalConfig={config.modalConfig}>
        <LocaleForm
          currentLocale={currentLocale}
          locales={locales}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          availableLanguages={availableLanguages}
          handleLocaleChange={handleLocaleChange}
          onClose={close}
        />
      </LocaleModal>
    </>
  );
}

function SidebarSelector({config, placementId}: LocaleSelectorProps) {
  const {isOpen, toggle, close} = useLocaleSidebar();
  const {
    currentLocale,
    locales,
    selectedCountry,
    setSelectedCountry,
    availableLanguages,
    handleLocaleChange,
  } = useLocaleSelector();

  return (
    <>
      <LocaleTrigger
        variant={config.triggerVariant}
        showChevron={config.showChevron}
        locale={currentLocale}
        isOpen={isOpen}
        onClick={toggle}
      />
      <LocaleSidebar sidebarConfig={config.sidebarConfig}>
        <LocaleForm
          currentLocale={currentLocale}
          locales={locales}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          availableLanguages={availableLanguages}
          handleLocaleChange={handleLocaleChange}
          onClose={close}
        />
      </LocaleSidebar>
    </>
  );
}

// ============================================================================
// MAIN COMPONENTS
// ============================================================================

/**
 * Full locale selector for header actions and announcement bar placements.
 * Supports dropdown, modal, and sidebar modes with responsive breakpoints.
 * Requires a placementId to isolate open/close state per placement.
 */
export function LocaleSelector({
  config,
  placementId,
  inMobileMenu = false,
}: LocaleSelectorProps) {
  if (inMobileMenu) {
    return (
      <DropdownSelector
        config={config}
        placementId={placementId}
        inMobileMenu={true}
      />
    );
  }

  const {displayMode} = config;

  if (displayMode.kind === 'single') {
    if (displayMode.mode === 'modal')
      return <ModalSelector config={config} placementId={placementId} />;
    if (displayMode.mode === 'sidebar')
      return <SidebarSelector config={config} placementId={placementId} />;
    return <DropdownSelector config={config} placementId={placementId} />;
  }

  const dropdownClasses = getResponsiveClasses(displayMode, 'dropdown');
  const modalClasses = getResponsiveClasses(displayMode, 'modal');
  const sidebarClasses = getResponsiveClasses(displayMode, 'sidebar');

  return (
    <>
      <div className={cn(dropdownClasses)}>
        <DropdownSelector config={config} placementId={placementId} />
      </div>
      <div className={cn(modalClasses)}>
        <ModalSelector config={config} placementId={placementId} />
      </div>
      <div className={cn(sidebarClasses)}>
        <SidebarSelector config={config} placementId={placementId} />
      </div>
    </>
  );
}

/**
 * Dropdown-only locale selector for the mobile navigation placement.
 * Always renders as a dropdown opening upward (forceUpward=true) since
 * it lives inside the mobile drawer. No display mode logic needed.
 * placementId is hardcoded to 'mobile'.
 */
export function DropdownLocaleSelector({config}: DropdownLocaleSelectorProps) {
  const {isOpenFor, open, close} = useLocaleSelectorContext();
  const isOpen = isOpenFor('mobile');
  const {
    currentLocale,
    locales,
    selectedCountry,
    setSelectedCountry,
    availableLanguages,
    handleLocaleChange,
  } = useLocaleSelector();

  return (
    <LocaleDropdown
      isOpen={isOpen}
      onOpenChange={(next) => (next ? open('mobile') : close())}
      forceUpward={true}
      dropdownConfig={config.dropdownConfig}
      trigger={
        <LocaleTrigger
          variant={config.triggerVariant}
          showChevron={config.showChevron}
          locale={currentLocale}
          isOpen={isOpen}
          onClick={() => {}}
        />
      }
    >
      <LocaleForm
        currentLocale={currentLocale}
        locales={locales}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        availableLanguages={availableLanguages}
        handleLocaleChange={handleLocaleChange}
        onClose={close}
      />
    </LocaleDropdown>
  );
}
