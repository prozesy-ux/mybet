import { HeaderLogo } from "@/sections/Header/components/HeaderLogo";
import { HeaderNav } from "@/sections/Header/components/HeaderNav";
import { HeaderActions } from "@/sections/Header/components/HeaderActions";
import { MobileInstallBanner } from "@/sections/Header/components/MobileInstallBanner";

export const Header = () => {
  return (
    <>
      <MobileInstallBanner />
      <header className="items-center bg-neutral-900 box-border caret-transparent flex h-[60px] max-w-[420px] min-h-[auto] min-w-[auto] outline-[3px] w-full mx-auto px-3 md:h-[68px] md:max-w-[1640px] md:px-12">
        <div className="items-center box-border caret-transparent gap-x-2 flex min-h-[auto] outline-[3px] gap-y-2 w-full md:gap-x-3 md:gap-y-3">
          <div className="items-center box-border caret-transparent gap-x-3 flex min-h-[auto] min-w-0 outline-[3px] gap-y-3 md:gap-x-6 md:gap-y-6">
            <HeaderLogo />
            <HeaderNav />
          </div>
          <HeaderActions />
        </div>
      </header>
    </>
  );
};
