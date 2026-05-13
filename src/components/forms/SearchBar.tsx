import { useState } from "react";

export const SearchBar = () => {
  const [value, setValue] = useState("");

  return (
    <label className="relative text-gray-400 text-sm items-center bg-gray-400/10 caret-auto gap-x-3 flex h-11 leading-5 outline-[3px] gap-y-3 w-full px-4 py-0 rounded-xl cursor-text after:accent-auto after:box-border after:caret-transparent after:text-gray-400 after:block after:text-sm after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
      <img
        src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-23.svg"
        alt="Icon"
        className="box-border caret-transparent h-4 outline-[3px] align-baseline w-4 shrink-0"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="bg-transparent caret-auto text-gray-400 text-sm leading-5 outline-none border-none w-full placeholder:text-gray-400"
      />
    </label>
  );
};
