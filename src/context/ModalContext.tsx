import { createContext, useContext, useState, ReactNode } from "react";

export type ModalType =
  | null
  | "deposit"
  | "depositProvider"
  | "profile"
  | "bonuses"
  | "bonusCodes"
  | "betHistory"
  | "settings"
  | "support"
  | "txHistory"
  | "withdrawal"
  | "withdrawalProvider";

export type PaymentProvider = {
  id: string;
  name: string;
  logo: string;
  accountNumber?: string;
  minAmount?: number;
  maxAmount?: number;
};

interface ModalContextValue {
  modal: ModalType;
  selectedProvider: PaymentProvider | null;
  openModal: (m: ModalType) => void;
  closeModal: () => void;
  selectProvider: (p: PaymentProvider) => void;
}

const ModalContext = createContext<ModalContextValue>({
  modal: null,
  selectedProvider: null,
  openModal: () => {},
  closeModal: () => {},
  selectProvider: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedProvider, setSelectedProvider] =
    useState<PaymentProvider | null>(null);

  const openModal = (m: ModalType) => setModal(m);
  const closeModal = () => {
    setModal(null);
    setSelectedProvider(null);
  };
  const selectProvider = (p: PaymentProvider) => {
    setSelectedProvider(p);
  };

  return (
    <ModalContext.Provider
      value={{ modal, selectedProvider, openModal, closeModal, selectProvider }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
