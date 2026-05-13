import { useModal } from "@/context/ModalContext";

const contacts = [
  { label: "Live chat", value: "Available 24/7" },
  { label: "Email", value: "support@1win.help" },
  { label: "Telegram", value: "@onewin_support" },
  { label: "Phone", value: "+880 1700-000000" },
];

export const SupportModal = () => {
  const { closeModal, openModal } = useModal();

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
          <h2 className="text-[22px] font-bold text-[#141415] mb-1">24/7 support</h2>
          <p className="text-[13px] text-[#6f7480] mb-4">All contact info</p>

          <div className="bg-[#f0f2f5] rounded-[16px] overflow-hidden">
            {contacts.map((item, index) => (
              <div
                key={item.label}
                className={`px-4 py-3 ${index < contacts.length - 1 ? "border-b border-[rgba(0,0,0,0.06)]" : ""}`}
              >
                <p className="text-[12px] text-[#6f7480]">{item.label}</p>
                <p className="text-[14px] font-semibold text-[#141415]">{item.value}</p>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 bg-[#00b24b] hover:bg-[#008c3b] text-white font-semibold py-3 rounded-xl transition-colors text-[14px]">
            Contact support now
          </button>
        </div>
      </div>
    </div>
  );
};
