import { AppDownloadCard } from "@/components/cards/AppDownloadCard";
import { SocialLinks } from "@/components/social/SocialLinks";
import { SupportButton } from "@/components/buttons/SupportButton";

export const SidebarFooter = () => {
  return (
    <div className="sticky bg-zinc-900 box-border caret-transparent gap-x-2 flex flex-col shrink-0 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 pb-3 bottom-0 before:accent-auto before:bg-[linear-gradient(to_top,rgb(29,30,32),rgba(0,0,0,0))] before:box-border before:caret-transparent before:text-gray-100 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-8 before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-none before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:left-0 before:bottom-full before:font-inter">
      <div className="box-border caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:hidden before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-px after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-full after:border-separate after:font-inter">
        <div className="box-border caret-transparent gap-x-2 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 px-4 before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:hidden before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-px after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-full after:border-separate after:font-inter">
          <AppDownloadCard />
          <SocialLinks
            containerVariant="justify-between"
            showGroupedLayout={true}
            socialLinks={[
              {
                href: "https://www.whatsapp.com/channel/0029VaFXHRLElagxvCc7a62E",
                iconSrc:
                  "https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-9.svg",
                title: "WhatsApp",
              },
              {
                href: "https://t.me/+41MxN3wE5tVkZTgy",
                iconSrc:
                  "https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-10.svg",
                title: "Telegram",
              },
              {
                href: "https://www.instagram.com/1win",
                iconSrc:
                  "https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-11.svg",
                title: "Instagram",
              },
            ]}
            showActionButton={true}
            actionButtonClassName="relative text-sm font-semibold bg-transparent caret-transparent leading-5 outline-[3px] text-center p-0 rounded-[10px]"
            actionIconSrc="https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-12.svg"
            languageButtonClassName="relative text-sm items-center bg-gray-400/10 caret-transparent gap-x-1 flex h-9 leading-5 outline-[3px] gap-y-1 text-center uppercase w-full px-2 py-0 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:uppercase after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter"
            languageFlagSrc="https://flagcdn.com/w20/gb.png"
            languageCode="en"
            languageIconSrc="https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-13.svg"
          />
        </div>
        <div className="box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:min-h-[auto] before:min-w-[auto] before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter">
          <div className="box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] pt-3 px-4 before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:hidden before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-px after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-full after:border-separate after:font-inter">
            <div className="relative items-center box-border caret-transparent gap-x-3 flex justify-between min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 w-full">
              <div className="box-border caret-transparent gap-x-1 flex shrink-0 flex-wrap max-w-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-1">
                <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                  <div className="box-border caret-transparent outline-[3px]">
                    <SupportButton />
                  </div>
                </div>
              </div>
              <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] mr-auto">
                Support
              </div>
              <div className="text-white text-xs font-semibold items-center bg-blue-600 box-border caret-transparent flex shrink-0 tracking-[0.01px] leading-4 min-h-[auto] outline-[3px] px-2 py-1 rounded-[999px]">
                <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                  24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
