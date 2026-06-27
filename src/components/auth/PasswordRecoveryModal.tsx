import { useState } from "react";
import { ChevronDown, Mail, MessageCircle, Phone, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface PasswordRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PasswordRecoveryModal = ({ isOpen, onClose }: PasswordRecoveryModalProps) => {
  const { requestPasswordReset } = useAuth();
  const [activeTab, setActiveTab] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleRecover = async () => {
    setError("");
    setInfo("");

    if (activeTab === "email" && !email.trim()) {
      setError("Email is required");
      return;
    }

    if (activeTab === "phone" && !phone.trim()) {
      setError("Phone is required");
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password confirmation does not match");
      return;
    }

    setSubmitting(true);
    const result = await requestPasswordReset({
      email: activeTab === "email" ? email.trim() : undefined,
      phone: activeTab === "phone" ? phone.trim() : undefined,
      newPassword,
    });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setInfo(result.message);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2200] flex items-end justify-center bg-black/70 p-0 backdrop-blur-[2px] sm:items-center sm:p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-[430px] rounded-t-[24px] bg-[#f2f3f5] px-5 pt-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] shadow-2xl font-inter max-h-[96dvh] overflow-y-auto sm:rounded-[22px] sm:pb-5 sm:max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#d0d5de] sm:hidden" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-4 text-[#6f7480] transition-colors hover:text-[#18181b]"
          aria-label="Close password recovery modal"
        >
          <X size={26} strokeWidth={2} />
        </button>

        <button type="button" onClick={onClose} className="flex items-center gap-1 text-[14px] leading-none font-semibold text-[#1877f2] mb-4">
          <span>‹</span>
          <span>Back</span>
        </button>

        <h2 className="font-inter text-[22px] leading-none font-semibold text-[#141415] mb-3">Password recovery</h2>
        <p className="text-[14px] leading-none text-[#3c4048] mb-4">Enter your phone number or email to receive a code</p>

        <div className="mb-4 flex w-full rounded-[12px] bg-[#e6e7eb] p-1">
          <button
            type="button"
            onClick={() => setActiveTab("phone")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-[10px] px-3 py-2.5 text-[14px] leading-none font-semibold transition-colors ${
              activeTab === "phone" ? "bg-[#1877f2] text-white" : "text-[#141415]"
            }`}
          >
            <Phone size={20} strokeWidth={2.4} />
            <span>Phone</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("email")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-[10px] px-3 py-2.5 text-[14px] leading-none font-semibold transition-colors ${
              activeTab === "email" ? "bg-[#1877f2] text-white" : "text-[#141415]"
            }`}
          >
            <Mail size={20} strokeWidth={2.4} />
            <span>Email</span>
          </button>
        </div>

        <div className="mb-4 flex items-center gap-2 rounded-[12px] bg-[#e6e7eb] px-3 py-2.5 text-[#6f7480]">
          <span className="h-4 w-4 rounded-full bg-[#00b24b] border-2 border-[#f20d2f] shrink-0"></span>
          <ChevronDown size={18} strokeWidth={2.4} />
          <span className="h-6 border-l border-[#d9dce2] ml-1"></span>
          {activeTab === "phone" ? (
            <>
              <span className="text-[16px] leading-none text-[#141415]">+880</span>
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="0000 000000"
                className="flex-1 bg-transparent text-[16px] leading-none text-[#141415] outline-none placeholder:text-[#9ba0ab]"
              />
            </>
          ) : (
            <>
              <Mail size={18} strokeWidth={2.2} className="ml-1" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                className="flex-1 bg-transparent text-[16px] leading-none text-[#141415] outline-none placeholder:text-[#9ba0ab]"
              />
            </>
          )}
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="New password"
            className="w-full rounded-[12px] bg-[#e6e7eb] px-3 py-2.5 text-[16px] leading-none text-[#141415] outline-none placeholder:text-[#9ba0ab]"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm new password"
            className="w-full rounded-[12px] bg-[#e6e7eb] px-3 py-2.5 text-[16px] leading-none text-[#141415] outline-none placeholder:text-[#9ba0ab]"
          />
        </div>

        {error ? <p className="text-[12px] text-[#ff4000] mb-2">{error}</p> : null}
        {info ? <p className="text-[12px] text-[#00b24b] mb-2">{info}</p> : null}

        <button
          type="button"
          onClick={handleRecover}
          disabled={submitting}
          className="w-full rounded-[12px] bg-[#79d2a3] py-3 text-[17px] leading-none font-semibold text-white transition-colors hover:bg-[#69c18d]"
        >
          {submitting ? "Recovering..." : "Recover"}
        </button>

        <div className="mt-4 border-t border-[#d7dbe2] pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[12px] leading-none text-[#666b76]">
            <span className="h-8 w-8 rounded-[10px] bg-[#e6e7eb] flex items-center justify-center">
              <MessageCircle size={16} className="text-[#141415]" />
            </span>
            Contact us if you have any questions
          </div>
          <span className="text-white text-[12px] leading-none font-bold bg-[#1877f2] px-2 py-1 rounded-[999px]">24/7</span>
        </div>
      </div>
    </div>
  );
};
