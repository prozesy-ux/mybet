import { useModal } from "@/context/ModalContext";
import { DepositModal } from "./DepositModal";
import { DepositProviderModal } from "./DepositProviderModal";
import { BetHistoryModal } from "./BetHistoryModal";
import { BonusCodesModal } from "./BonusCodesModal";
import { BonusesModal } from "./BonusesModal";
import { ProfileModal } from "./ProfileModal";
import { SettingsModal } from "./SettingsModal";
import { SupportModal } from "./SupportModal";
import { TransactionHistoryModal } from "./TransactionHistoryModal";
import { WithdrawalModal } from "./WithdrawalModal";
import { WithdrawalProviderModal } from "./WithdrawalProviderModal";

export const ModalOrchestrator = () => {
  const { modal } = useModal();

  if (modal === "deposit") return <DepositModal />;
  if (modal === "depositProvider") return <DepositProviderModal />;
  if (modal === "profile") return <ProfileModal />;
  if (modal === "bonuses") return <BonusesModal />;
  if (modal === "bonusCodes") return <BonusCodesModal />;
  if (modal === "betHistory") return <BetHistoryModal />;
  if (modal === "settings") return <SettingsModal />;
  if (modal === "support") return <SupportModal />;
  if (modal === "txHistory") return <TransactionHistoryModal />;
  if (modal === "withdrawal") return <WithdrawalModal />;
  if (modal === "withdrawalProvider") return <WithdrawalProviderModal />;
  return null;
};
