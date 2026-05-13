export const AppDownloadCard = () => {
  return (
    <button
      type="button"
      className="text-stone-950/30 text-[13.3333px] items-center bg-zinc-800 caret-transparent flex leading-[normal] max-h-full max-w-full min-h-[auto] min-w-[auto] outline-[3px] text-center overflow-hidden px-3 py-2 rounded-xl"
    >
      <div className="items-center box-border caret-transparent flex shrink-0 justify-between min-h-[auto] min-w-[auto] outline-[3px] text-start w-[222px]">
        <img
          src="https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-7.svg"
          alt="Icon"
          className="box-border caret-transparent shrink-0 h-11 outline-[3px] align-baseline w-11"
        />
        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] mx-3">
          <div className="text-gray-100 text-xs font-semibold box-border caret-transparent tracking-[0.01px] leading-4 outline-[3px] mb-1">
            Betwin for Windows
          </div>
          <div className="text-gray-400 text-xs box-border caret-transparent tracking-[0.01px] leading-4 outline-[3px]">
            Instant access to the platform with our app
          </div>
        </div>
        <img
          src="https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-8.svg"
          alt="Icon"
          className="text-gray-400 box-border caret-transparent shrink-0 h-4 outline-[3px] align-baseline w-4"
        />
      </div>
    </button>
  );
};
