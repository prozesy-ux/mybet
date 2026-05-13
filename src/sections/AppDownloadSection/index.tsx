import { MobileAppBanner } from "@/sections/AppDownloadSection/components/MobileAppBanner";
import { WindowsAppBanner } from "@/sections/AppDownloadSection/components/WindowsAppBanner";

export const AppDownloadSection = () => {
  return (
    <div className="items-start box-border caret-transparent gap-x-4 grid col-end-[appBanner] col-start-[appBanner] row-end-[appBanner] row-start-[appBanner] [grid-template-areas:'a_b'] grid-cols-[auto_207px] grid-rows-[auto] max-w-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-4">
      <MobileAppBanner />
      <WindowsAppBanner />
    </div>
  );
};
