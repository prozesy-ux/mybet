import { useEffect, useState } from "react";
import { ChevronDown, Lock, Mail, X } from "lucide-react";
import { ChooseCurrencyModal, type CurrencyItem } from "./ChooseCurrencyModal";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
  onSubmit: (payload: {
    email: string;
    phone: string;
    password: string;
  }) => Promise<{ ok: boolean; message: string }>;
}

const SOCIAL_BUTTONS = [
  { label: "Google", icon: "https://developers.google.com/identity/images/g-logo.png" },
  { label: "Telegram", icon: "https://cdn.simpleicons.org/telegram/26A5E4" },
  { label: "Discord", icon: "https://cdn.simpleicons.org/discord/5865F2" },
];

export const RegistrationModal = ({
  isOpen,
  onClose,
  onLoginClick,
  onSubmit,
}: RegistrationModalProps) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [showPromo, setShowPromo] = useState(false);
  const [accepted, setAccepted] = useState(true);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyItem>({
    code: "BDT",
    name: "Bangladeshi taka",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setPhone("");
    setEmail("");
    setPassword("");
    setPromoCode("");
    setShowPromo(false);
    setAccepted(true);
    setError("");
  }, [isOpen]);

  const handleRegister = async () => {
    if (!phone.trim() || !email.trim() || !password) {
      setError("Phone, email, and password are required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    const sanitizedPhone = phone.trim();
    const sanitizedEmail = email.trim();

    setSubmitting(true);
    const result = await onSubmit({
      email: sanitizedEmail,
      phone: sanitizedPhone,
      password,
    });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setError("");
  };

  const handleClose = () => {
    setPhone("");
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <ChooseCurrencyModal
        isOpen={currencyOpen}
        onClose={() => setCurrencyOpen(false)}
        onSelect={(next) => {
          setCurrency(next);
          setCurrencyOpen(false);
        }}
      />

      <div
        className="fixed inset-0 z-[2000] flex items-end justify-center bg-black/70 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
        onClick={handleClose}
      >
      <div
        className="relative w-full max-w-[430px] rounded-t-[24px] bg-[#f2f3f5] px-5 pt-4 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] font-inter shadow-2xl max-h-[96dvh] overflow-y-auto sm:rounded-[22px] sm:pb-6 sm:max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#d0d5de] sm:hidden" />
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-4 text-[#6f7480] transition-colors hover:text-[#18181b]"
          aria-label="Close registration modal"
        >
          <X size={26} strokeWidth={2} />
        </button>

        <h2 className="font-inter text-[42px] leading-none font-semibold text-[#141415] mb-4">Registration</h2>

        <button
          type="button"
          onClick={() => setCurrencyOpen(true)}
          className="w-full mb-3 flex items-center justify-between rounded-[12px] bg-[#e6e7eb] px-4 py-2.5"
        >
          <div className="flex items-center gap-3 text-[14px] leading-none text-[#141415]">
            <span className="font-semibold">{currency.code}</span>
            <span>{currency.name}</span>
          </div>
          <ChevronDown size={20} strokeWidth={2.4} className="text-[#6f7480]" />
        </button>

        <div className="mb-3 flex flex-col gap-3">
          <div className="flex items-center gap-2 rounded-[12px] border border-[#4186ff] bg-[#f2f3f5] px-3 py-2.5 text-[#6f7480]">
            <span className="h-4 w-4 rounded-full bg-[#00b24b] border-2 border-[#f20d2f] shrink-0"></span>
            <ChevronDown size={18} strokeWidth={2.4} />
            <span className="h-6 border-l border-[#d9dce2] ml-1"></span>
              <span className="text-[16px] leading-none text-[#141415]">+880</span>
            <input
              type="tel"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                setError("");
              }}
              placeholder="0000 000000"
              className="flex-1 bg-transparent text-[16px] leading-none text-[#141415] outline-none placeholder:text-[#9ba0ab]"
            />
          </div>

          <div className="flex items-center gap-3 rounded-[12px] bg-[#e6e7eb] px-3 py-2.5 text-[#6f7480]">
            <Mail size={18} strokeWidth={2.2} />
            <span className="h-6 border-l border-[#d9dce2]"></span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              className="flex-1 bg-transparent text-[16px] leading-none text-[#141415] outline-none placeholder:text-[#666b76]"
            />
          </div>

          <div className="flex items-center gap-3 rounded-[12px] bg-[#e6e7eb] px-3 py-2.5 text-[#6f7480]">
            <Lock size={18} strokeWidth={2.2} />
            <span className="h-6 border-l border-[#d9dce2]"></span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              className="flex-1 bg-transparent text-[16px] leading-none text-[#141415] outline-none placeholder:text-[#666b76]"
            />
          </div>
        </div>

        <p className="text-[12px] leading-none text-[#666b76] mb-3">At least 8 characters</p>

        <button
          type="button"
          onClick={() => setShowPromo((prev) => !prev)}
          className="text-[14px] leading-none font-semibold text-[#1877f2] mb-3"
        >
          Add promo code
        </button>

        {showPromo ? (
          <div className="mb-3 rounded-[12px] bg-[#e6e7eb] px-3 py-2.5">
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(event) => setPromoCode(event.target.value)}
              className="w-full bg-transparent text-[16px] leading-none text-[#141415] outline-none placeholder:text-[#666b76]"
            />
          </div>
        ) : null}

        <label className="flex items-start gap-2 mb-3">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#1877f2]"
          />
          <span className="text-[13px] leading-none text-[#666b76]">
            By clicking "Register", I accept <span className="text-[#1877f2] font-semibold">the user agreement</span>
          </span>
        </label>

        <div className="mb-4">
          {error && <p className="text-[12px] leading-none text-red-600 mb-1">{error}</p>}
          <button
            type="button"
            onClick={handleRegister}
            disabled={!accepted || submitting}
            className="w-full rounded-[12px] bg-[#79d2a3] disabled:opacity-100 py-3 text-[17px] leading-none font-semibold text-white transition-colors hover:bg-[#69c18d]"
          >
            {submitting ? "Registering..." : "Register"}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-[#d7dbe2]" />
            <span className="mx-3 flex-shrink-0 text-[13px] leading-none text-[#666b76]">or</span>
            <div className="flex-grow border-t border-[#d7dbe2]" />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {SOCIAL_BUTTONS.map((provider) => (
              <button
                key={provider.label}
                type="button"
                aria-label={`Continue with ${provider.label}`}
                className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#e6e7eb] text-[#141415] text-[18px] leading-none font-semibold"
              >
                <img
                  src={provider.icon}
                  alt={provider.label}
                  className="h-5 w-5 object-contain"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          <div className="mt-1 text-center text-[13px] leading-none text-[#666b76]">
            <span>Already have an account? </span>
            <button
              type="button"
              onClick={() => {
                handleClose();
                onLoginClick && onLoginClick();
              }}
              className="font-semibold text-[#1877f2]"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
