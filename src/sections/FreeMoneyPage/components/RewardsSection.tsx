export const RewardsSection = () => {
  return (
    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] mb-6 md:mb-8">
      <div className="text-xl font-semibold box-border caret-transparent tracking-[-0.33px] leading-6 outline-[3px] md:text-2xl md:tracking-[-0.47px] md:leading-7">
        Even more prizes
      </div>
      <div className="items-center box-border caret-transparent flex outline-[3px] mt-2">
        <div className="items-center box-border caret-transparent flex min-h-[auto] min-w-[auto] outline-[3px] mr-2">
          <div className="text-white items-center bg-violet-600 box-border caret-transparent flex h-6 justify-center min-h-[auto] min-w-[auto] outline-neutral-900 outline outline-[3px] w-6 rounded-[999px]">
            <img
              src="https://c.animaapp.com/mp2qqw2hCB4Jtb/assets/icon-28.svg"
              alt="Icon"
              className="box-border caret-transparent h-3 outline-[3px] align-baseline w-3"
            />
          </div>
        </div>
        <div className="text-white/60 text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px]">
          Completed 1 of 5
        </div>
      </div>
    </div>
  );
};
