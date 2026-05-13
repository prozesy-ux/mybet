export const CarouselControls = () => {
  return (
    <div className="absolute bg-[radial-gradient(100%_100%_at_100%_100%,rgb(0,0,0)_21.54%,rgba(0,0,0,0)_100%)] box-border caret-transparent flex h-[88px] opacity-0 outline-[3px] pointer-events-none w-[150px] z-[1] overflow-hidden p-4 rounded-br-3xl right-0 bottom-0 md:opacity-100">
      <div className="bg-white/20 box-border caret-transparent gap-x-[5px] flex min-h-[auto] min-w-[auto] outline-[3px] pointer-events-auto gap-y-[5px] ml-auto mt-auto p-[5px] rounded-xl">
        <button
          type="button"
          className="text-white/60 text-[13.3333px] items-center bg-white/30 caret-transparent flex h-[35px] justify-center leading-[normal] min-h-[auto] min-w-[auto] outline-[3px] text-center w-[35px] rounded-lg"
        >
          <img
            src="https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-17.svg"
            alt="Icon"
            className="box-border caret-transparent h-4 opacity-50 outline-[3px] align-baseline w-4"
          />
        </button>
        <button
          type="button"
          className="text-white/60 text-[13.3333px] items-center bg-white/30 caret-transparent flex h-[35px] justify-center leading-[normal] min-h-[auto] min-w-[auto] outline-[3px] text-center w-[35px] rounded-lg"
        >
          <img
            src="https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-18.svg"
            alt="Icon"
            className="box-border caret-transparent h-4 opacity-50 outline-[3px] align-baseline w-4"
          />
        </button>
      </div>
    </div>
  );
};
