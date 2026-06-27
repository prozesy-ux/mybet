import { useState } from "react";

export const MobileInstallBanner = () => {
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) {
    return null;
  }

  return (
    <div className="border-b border-[#d9dde4] bg-[#eef2f7] px-2 py-1.5 md:hidden">
      <div className="mx-auto flex max-w-[420px] items-center gap-2">
        <button
          type="button"
          aria-label="Close banner"
          onClick={() => setIsClosed(true)}
          className="text-[#6d7280]"
        >
          x
        </button>
        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-[#111317]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9W7pOpvVAF9_KaUUUhYU7g-GpO6Z_CA63Shlm9GSB4Q&s=10"
            alt="App"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-semibold leading-4 text-[#111317]">App</p>
          <p className="truncate text-[11px] leading-4 text-[#4d5361]">Bonus 200 Points</p>
        </div>
        <button
          type="button"
          className="rounded-lg bg-[#1a83ff] px-3 py-1.5 text-[12px] font-semibold text-white"
        >
          Install
        </button>
      </div>
    </div>
  );
};
