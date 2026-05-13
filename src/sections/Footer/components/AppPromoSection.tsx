import { AppPromoCard } from "@/sections/Footer/components/AppPromoCard";

export const AppPromoSection = () => {
  return (
    <div className="items-start box-border caret-transparent gap-x-4 grid col-end-[appBanner] col-start-[appBanner] row-end-[appBanner] row-start-[appBanner] [grid-template-areas:'a_b'] grid-cols-[auto_207px] grid-rows-[auto] max-w-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-4">
      <AppPromoCard
        containerVariant="col-end-[a] col-start-[a] row-end-[a] row-start-[a] grid-cols-[minmax(0px,156px)_auto] min-h-[94px] rounded-2xl md:grid-cols-[1fr] md:pr-[275px] md:rounded-[20px] after:rounded-2xl after:md:rounded-[20px]"
        backgroundVariant="bg-purple-600 rounded-2xl md:rounded-[20px]"
        contentVariant="z-[2]"
        title="200 Points for installing the app"
        subtitle="Available for Android and iOS"
        buttonVariant="justify-self-end max-w-none min-w-32 z-[2] md:justify-self-stretch md:max-w-xs"
        buttonText="Install"
        imageVariant="z-[1] bottom-3 md:w-[410px] md:bottom-0"
      />
      <AppPromoCard
        containerVariant="col-end-[b] col-start-[b] row-end-[b] row-start-[b] grid-cols-[1fr_max-content] min-h-[auto] overflow-hidden rounded-[20px] md:grid-cols-[auto] after:rounded-[20px]"
        backgroundVariant="bg-blue-600 rounded-[20px]"
        contentVariant="z-[1]"
        title="Application for Windows"
        buttonVariant="min-w-[auto] z-[1]"
        buttonText="Install"
        buttonIconUrl="https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-29.svg"
        imageVariant="bottom-0 md:w-[207px]"
      />
    </div>
  );
};
