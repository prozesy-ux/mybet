import { useState } from "react";
import { useModal } from "@/context/ModalContext";

export const BonusCodesModal = () => {
  const { closeModal, openModal } = useModal();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleApply = () => {
    if (!code.trim()) {
      setMessage("Enter a bonus code");
      return;
    }
    setMessage(`Code ${code.trim()} activated successfully`);
    setCode("");
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div className="bg-white rounded-[24px] w-full max-w-[400px] mx-4 shadow-2xl font-inter max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 sticky top-0 bg-white z-10">
          <button
            onClick={() => openModal("profile")}
            className="flex items-center gap-1 text-[#3b82f6] hover:text-[#2563eb] text-[14px] font-semibold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            onClick={closeModal}
            className="text-[#71717a] hover:text-[#18181b] w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f4f4f5] transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-5 pb-5">
          <h2 className="text-[22px] font-bold text-[#141415] mb-1">Bonus codes</h2>
          <p className="text-[13px] text-[#6f7480] mb-4">Code activation</p>

          <div className="bg-[#f0f2f5] rounded-[16px] p-4">
            <label className="text-[12px] font-medium text-[#6f7480] block mb-2">Enter promo code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="EXAMPLE2026"
              className="w-full bg-white rounded-xl px-3 py-3 text-[14px] text-[#141415] outline-none border border-[#e4e4e7] focus:border-[#3b82f6]"
            />
            <button
              onClick={handleApply}
              className="w-full mt-3 bg-[#00b24b] hover:bg-[#008c3b] text-white font-semibold py-3 rounded-xl transition-colors text-[14px]"
            >
              Activate code
            </button>
          </div>

          {message ? (
            <p className="text-[13px] text-[#15803d] mt-3 px-1">{message}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
