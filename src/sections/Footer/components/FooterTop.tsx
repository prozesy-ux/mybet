import { SocialLinks } from "@/components/navigation/SocialLinks";

export const FooterTop = () => {
  return (
    <div className="border-b-gray-100 border-l-gray-100 border-r-gray-100 border-t-gray-400/10 box-border caret-transparent gap-x-6 grid col-end-[bottom] col-start-[bottom] row-end-[bottom] row-start-[bottom] [grid-template-areas:'socials_licenses''copyright_copyright'] grid-cols-[1fr_1fr] grid-rows-[auto_auto] max-w-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-6 pt-6 border-t border-solid">
      <SocialLinks />
      <div className="text-gray-400 box-border caret-transparent gap-x-2 flex col-end-[copyright] col-start-[copyright] row-end-[copyright] row-start-[copyright] min-h-[auto] min-w-[auto] outline-[3px] gap-y-2">
        <span className="text-[10px] items-center box-border caret-transparent flex grow tracking-[0.1px] leading-[14px] min-h-[auto] min-w-[auto] outline-[3px]">
          © 2026 Betwin.
        </span>
        <span className="text-gray-500 text-xl font-semibold box-border caret-transparent block tracking-[-0.33px] leading-6 min-h-[auto] min-w-[auto] outline-[3px] md:text-2xl md:tracking-[-0.47px] md:leading-7">
          18+
        </span>
      </div>
    </div>
  );
};
