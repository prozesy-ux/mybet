import { HeaderLogo } from "@/sections/Header/components/HeaderLogo";
import { HeaderNav } from "@/sections/Header/components/HeaderNav";
import { HeaderActions } from "@/sections/Header/components/HeaderActions";

export const Header = () => {
  return (
    <header className="items-center bg-neutral-900 box-border caret-transparent flex h-[60px] max-w-[1640px] min-h-[auto] min-w-[auto] outline-[3px] w-full mx-auto px-4 md:h-[68px] md:px-12">
      <div className="items-center box-border caret-transparent gap-x-3 flex min-h-[auto] outline-[3px] gap-y-3 w-full">
        <div className="items-center box-border caret-transparent gap-x-6 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-6">
          <HeaderLogo />
          <HeaderNav />
        </div>
        <HeaderActions />
      </div>
    </header>
  );
};
