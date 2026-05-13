import { FooterSocials } from "@/sections/SportsClone/Footer/components/FooterSocials";
import { FooterTopBar } from "@/sections/SportsClone/Footer/components/FooterTopBar";
import { FooterSupport } from "@/sections/SportsClone/Footer/components/FooterSupport";
import { FooterAppBanner } from "@/sections/SportsClone/Footer/components/FooterAppBanner";
import { FooterNavigation } from "@/sections/SportsClone/Footer/components/FooterNavigation";

export const Footer = () => {
  return (
    <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
      <div className="relative box-border caret-transparent max-w-[1640px] outline-[3px] w-full mx-auto px-12 py-10">
        <div className="relative box-border caret-transparent gap-x-10 grid [grid-template-areas:'headRow_headRow_headRow''support_support_support''navigation_._appBanner''bottom_bottom_bottom'] grid-cols-[430px_auto_548px] grid-rows-[auto_auto_auto_auto] max-w-full outline-[3px] gap-y-10">
          <FooterSocials />
          <FooterTopBar />
          <FooterSupport />
          <FooterAppBanner />
          <FooterNavigation />
        </div>
      </div>
    </div>
  );
};

