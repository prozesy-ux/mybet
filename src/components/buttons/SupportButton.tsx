export const SupportButton = () => {
  return (
    <button
      type="button"
      className="relative text-sm font-semibold bg-transparent caret-transparent leading-5 outline-[3px] text-center p-0 rounded-[10px]"
    >
      <div className="relative bg-gray-400/10 box-border caret-transparent h-9 outline-[3px] w-9 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
        <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
          <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
            <img
              src="https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-14.svg"
              alt="Icon"
              className="box-border caret-transparent h-4 outline-[3px] text-nowrap align-baseline w-4"
            />
          </div>
        </div>
      </div>
    </button>
  );
};
