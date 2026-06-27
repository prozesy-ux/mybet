import { ChevronDown } from "lucide-react";
import { useState } from "react";

export type FooterLinkColumnProps = {
  title: string;
  containerVariant: string;
  columns: {
    links: {
      href: string;
      label: string;
    }[];
  }[];
};

export const FooterLinkColumn = (props: FooterLinkColumnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] ${props.containerVariant}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-1 text-left md:cursor-default"
      >
        <span className="text-base font-semibold box-border caret-transparent block tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] md:text-xl md:tracking-[-0.33px] md:leading-6">
          {props.title}
        </span>
        <ChevronDown
          size={18}
          className={`text-[#97a0af] transition-transform md:hidden ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`${isOpen ? "grid" : "hidden"} box-border caret-transparent grid-rows-[1fr] min-h-[auto] min-w-[auto] outline-[3px] w-auto md:grid md:w-max`}>
        <div className="box-border caret-transparent gap-x-[normal] block min-h-[auto] min-w-[auto] outline-[3px] gap-y-[normal] overflow-hidden md:gap-x-10 md:flex md:gap-y-10">
          {props.columns.map((column, columnIndex) => (
            <div
              className="box-border caret-transparent gap-x-3 flex flex-col min-h-0 min-w-0 outline-[3px] gap-y-3 mt-3 md:min-h-[auto] md:min-w-[auto] md:mt-4"
              key={columnIndex}
            >
              {column.links.map((link, linkIndex) => (
                <a
                  href={link.href}
                  className="text-gray-400 text-xs items-center box-border caret-transparent gap-x-1 flex tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 py-0.5 md:py-0"
                  key={linkIndex}
                >
                  <div className="box-border caret-transparent contents outline-[3px]">
                    {link.label}
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
