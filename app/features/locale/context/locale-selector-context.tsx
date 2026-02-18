import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type {PlacementId} from '../types';

// ============================================================================
// TYPES
// ============================================================================

type LocaleSelectorContextValue = {
  /** Which placement is currently open, or null if all closed */
  openPlacement: PlacementId | null;
  /** Open a specific placement */
  open: (placement: PlacementId) => void;
  /** Close whichever placement is open */
  close: () => void;
  /** Returns true only if the given placement is currently open */
  isOpenFor: (placement: PlacementId) => boolean;
};

// ============================================================================
// CONTEXT
// ============================================================================

const LocaleSelectorContext = createContext<LocaleSelectorContextValue | null>(
  null,
);

// ============================================================================
// PROVIDER
// ============================================================================

/**
 * Provides placement-aware open/close state for all locale selector instances.
 *
 * Tracks which placement is open by ID rather than a simple boolean —
 * this ensures only one selector can be open at a time while giving each
 * placement isolated control over its own state.
 *
 * Dropdown placements use this context directly.
 * Modal/sidebar placements additionally use the aside system (useAside),
 * which handles its own mutual exclusion via AsideType.
 *
 * Should wrap the header layout (or root layout) so all three placements
 * share the same provider instance.
 */
export function LocaleSelectorProvider({children}: {children: ReactNode}) {
  const [openPlacement, setOpenPlacement] = useState<PlacementId | null>(null);

  const open = useCallback((placement: PlacementId) => {
    setOpenPlacement(placement);
  }, []);

  const close = useCallback(() => {
    setOpenPlacement(null);
  }, []);

  const isOpenFor = useCallback(
    (placement: PlacementId) => openPlacement === placement,
    [openPlacement],
  );

  return (
    <LocaleSelectorContext.Provider
      value={{openPlacement, open, close, isOpenFor}}
    >
      {children}
    </LocaleSelectorContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

export function useLocaleSelectorContext(): LocaleSelectorContextValue {
  const ctx = useContext(LocaleSelectorContext);
  if (!ctx) {
    throw new Error(
      'useLocaleSelectorContext must be used within a LocaleSelectorProvider',
    );
  }
  return ctx;
}
