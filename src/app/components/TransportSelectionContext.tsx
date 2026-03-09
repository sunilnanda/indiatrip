"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { TransportOption, itinerary, delhiToJalandharTransport, vrindavanToChandigarhTransport, flexiblePlans } from "../data";

interface TransportSelectionContextType {
  getSelected: (legId: string) => number;
  setSelected: (legId: string, index: number) => void;
  getSelectedOption: (legId: string) => TransportOption | null;
  getOptionsForLeg: (legId: string) => TransportOption[] | undefined;
}

function findOptions(legId: string): TransportOption[] | undefined {
  const day = itinerary.find((d) => d.id === legId);
  if (day?.transport) return day.transport;

  if (legId === "delhi-jalandhar") return delhiToJalandharTransport;
  if (legId === "delhi-chandigarh") return vrindavanToChandigarhTransport;

  const plan = flexiblePlans.find((p) => p.id === legId);
  if (plan?.transport) return plan.transport;

  return undefined;
}

function getDefaultIndex(options: TransportOption[]): number {
  const idx = options.findIndex((o) => o.recommended);
  return idx >= 0 ? idx : 0;
}

const TransportSelectionContext = createContext<TransportSelectionContextType>({
  getSelected: () => 0,
  setSelected: () => {},
  getSelectedOption: () => null,
  getOptionsForLeg: () => undefined,
});

export function TransportSelectionProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<Record<string, number>>({});

  const getSelected = useCallback(
    (legId: string): number => {
      if (selections[legId] !== undefined) return selections[legId];
      const options = findOptions(legId);
      if (!options) return 0;
      return getDefaultIndex(options);
    },
    [selections],
  );

  const setSelectedFn = useCallback((legId: string, index: number) => {
    setSelections((prev) => ({ ...prev, [legId]: index }));
  }, []);

  const getSelectedOption = useCallback(
    (legId: string): TransportOption | null => {
      const options = findOptions(legId);
      if (!options) return null;
      const idx = getSelected(legId);
      return options[idx] || null;
    },
    [getSelected],
  );

  return (
    <TransportSelectionContext.Provider
      value={{ getSelected, setSelected: setSelectedFn, getSelectedOption, getOptionsForLeg: findOptions }}
    >
      {children}
    </TransportSelectionContext.Provider>
  );
}

export const useTransportSelection = () => useContext(TransportSelectionContext);
