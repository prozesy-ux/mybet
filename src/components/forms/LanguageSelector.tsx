export const LanguageSelector = () => {
  return (
    <button
      type="button"
      className="relative text-sm items-center bg-gray-400/10 caret-transparent gap-x-1 flex h-9 leading-5 outline-[3px] gap-y-1 text-center uppercase w-full px-2 py-0 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:uppercase after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter"
    >
      <picture className="box-border caret-transparent contents outline-[3px]">
        <img
          src="https://flagcdn.com/w20/gb.png"
          className="caret-transparent h-5 min-h-[auto] min-w-[auto] outline-[3px] align-baseline w-5 p-0.5"
        />
      </picture>
      <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
        en
      </span>
      <img
        src="https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-13.svg"
        alt="Icon"
        className="text-gray-400 box-border caret-transparent h-4 outline-[3px] align-baseline w-4 ml-auto"
      />
    </button>
  );
};
