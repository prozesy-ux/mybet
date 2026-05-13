import { useEffect, useState } from "react";
import { ChevronDown, Lock, Mail, Phone, X } from "lucide-react";
import { PasswordRecoveryModal } from "./PasswordRecoveryModal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    email?: string;
    phone?: string;
    password: string;
  }) => Promise<{ ok: boolean; message: string }>;
  onRegisterClick?: () => void;
}

const SOCIAL_BUTTONS = ["G", "VK", "✈", "@", "Я", "OK", "🎮"];

export const LoginModal = ({
  isOpen,
  onClose,
  onSubmit,
  onRegisterClick,
}: LoginModalProps) => {
  const [activeTab, setActiveTab] = useState<"phone" | "email">("email");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setActiveTab("phone");
    setPhone("");
    setEmail("");
    setPassword("");
    setError("");
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!password) {
      setError("Password is required");
      return;
    }

    if (activeTab === "email" && !email) {
      setError("Email is required");
      return;
    }

    if (activeTab === "phone" && !phone) {
      setError("Phone is required");
      return;
    }

    setSubmitting(true);
    const result = await onSubmit({
      email: activeTab === "email" ? email.trim() : undefined,
      phone: activeTab === "phone" ? phone.trim() : undefined,
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
    setActiveTab("email");
    setPhone("");
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <PasswordRecoveryModal
        isOpen={recoveryOpen}
        onClose={() => setRecoveryOpen(false)}
      />

      <div
        className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 p-1"
        onClick={handleClose}
      >
      <div
        className="relative w-full max-w-[398px] rounded-[22px] bg-[#f2f3f5] px-5 pt-4 pb-6 shadow-2xl font-inter"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-4 text-[#6f7480] transition-colors hover:text-[#18181b]"
          aria-label="Close login modal"
        >
          <X size={26} strokeWidth={2} />
        </button>

        <h2 className="font-inter text-[44px] leading-none font-semibold text-[#141415] mb-4">Login</h2>

        <div className="mb-4 flex w-full rounded-[12px] bg-[#e6e7eb] p-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab("phone");
              setError("");
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-[10px] px-3 py-2.5 text-[14px] leading-none font-semibold transition-colors ${
              activeTab === "phone"
                ? "bg-[#1877f2] text-white"
                : "text-[#141415]"
            }`}
          >
            <Phone size={18} strokeWidth={2.2} />
            <span className="text-[14px] leading-none">Phone</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("email");
              setError("");
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-[10px] px-3 py-2.5 text-[14px] leading-none font-semibold transition-colors ${
              activeTab === "email"
                ? "bg-[#1877f2] text-white"
                : "text-[#141415]"
            }`}
          >
            <Mail size={18} strokeWidth={2.2} />
            <span className="text-[14px] leading-none">Email</span>
          </button>
        </div>

        <div className="mb-3 flex flex-col gap-3">
          <div className="flex items-center gap-2 rounded-[12px] border border-[#4186ff] bg-[#f2f3f5] px-3 py-2.5 text-[#6f7480]">
            <span className="h-4 w-4 rounded-full bg-[#00b24b] border-2 border-[#f20d2f] shrink-0"></span>
            <ChevronDown size={18} strokeWidth={2.4} />
            <span className="h-6 border-l border-[#d9dce2] ml-1"></span>
            {activeTab === "phone" ? (
              <>
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
              </>
            ) : (
              <>
                <Mail size={18} strokeWidth={2.2} className="ml-1" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  placeholder="Email"
                  className="flex-1 bg-transparent text-[16px] leading-none text-[#141415] outline-none placeholder:text-[#9ba0ab]"
                />
              </>
            )}
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

        <div className="mb-3 mt-1">
          <button
            type="button"
            onClick={() => setRecoveryOpen(true)}
            className="text-[14px] leading-none font-semibold text-[#1877f2]"
          >
            Forgot your password?
          </button>
        </div>

        <div className="mb-4">
          {error && <p className="text-[12px] leading-none text-red-600 mb-1">{error}</p>}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full rounded-[12px] bg-[#00b24b] py-3 text-[17px] leading-none font-semibold text-white transition-colors hover:bg-[#009d42]"
          >
            {submitting ? "Logging in..." : "Log in"}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-[#d7dbe2]" />
            <span className="mx-3 flex-shrink-0 text-[13px] leading-none text-[#666b76]">or</span>
            <div className="flex-grow border-t border-[#d7dbe2]" />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {SOCIAL_BUTTONS.map((label) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#e6e7eb] text-[#141415] text-[18px] leading-none font-semibold"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-1 text-center text-[13px] leading-none text-[#666b76]">
            <span>Don’t have an account?</span>
            <br />
            <button
              type="button"
              onClick={() => {
                handleClose();
                onRegisterClick && onRegisterClick();
              }}
              className="font-semibold text-[#1877f2] mt-1"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
