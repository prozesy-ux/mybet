import { MobileAppBanner } from "@/sections/AppDownloadSection/components/MobileAppBanner";
import { WindowsAppBanner } from "@/sections/AppDownloadSection/components/WindowsAppBanner";

export const AppDownloadSection = () => {
  return (
    <div className="items-start box-border caret-transparent gap-x-3 grid grid-cols-[1fr] grid-rows-[auto] max-w-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 md:gap-x-4 md:col-end-[appBanner] md:col-start-[appBanner] md:row-end-[appBanner] md:row-start-[appBanner] md:[grid-template-areas:'a_b'] md:grid-cols-[auto_207px] md:gap-y-4">
      <MobileAppBanner />
      <WindowsAppBanner />
    </div>
  );
};
