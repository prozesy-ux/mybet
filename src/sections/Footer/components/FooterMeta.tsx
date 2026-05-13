import { SocialLinks } from "@/components/social/SocialLinks";
import { Copyright } from "@/sections/Footer/components/Copyright";

export const FooterMeta = () => {
  return (
    <div className="border-b-gray-100 border-l-gray-100 border-r-gray-100 border-t-gray-400/10 box-border caret-transparent gap-x-6 grid col-end-[bottom] col-start-[bottom] row-end-[bottom] row-start-[bottom] [grid-template-areas:'socials_licenses''copyright_copyright'] grid-cols-[1fr_1fr] grid-rows-[auto_auto] max-w-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-6 pt-6 border-t border-solid">
      <SocialLinks
        containerVariant="flex-wrap col-end-[socials] col-start-[socials] row-end-[socials] row-start-[socials]"
        showGroupedLayout={false}
        socialLinks={[
          {
            href: "https://www.whatsapp.com/channel/0029VaFXHRLElagxvCc7a62E",
            iconSrc: "https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-9.svg",
            title: "Whatsapp",
          },
          {
            href: "https://t.me/+41MxN3wE5tVkZTgy",
            iconSrc: "https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-10.svg",
            title: "Telegram",
          },
          {
            href: "https://www.instagram.com/1win",
            iconSrc: "https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-11.svg",
            title: "Instagram",
          },
          {
            href: "https://www.facebook.com/1winglobal/",
            iconSrc: "https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-23.svg",
            title: "Facebook",
          },
          {
            href: "https://x.com/1winPro",
            iconSrc: "https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-24.svg",
            title: "X",
          },
          {
            href: "https://ru.pinterest.com/1win_global/",
            iconSrc: "https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-25.svg",
            title: "Pinterest",
          },
          {
            href: "https://www.threads.com/@1win",
            iconSrc: "https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-26.svg",
            title: "Threads",
          },
        ]}
        showActionButton={false}
        actionButtonClassName=""
        actionIconSrc=""
        languageButtonClassName=""
        languageFlagSrc=""
        languageCode=""
        languageIconSrc=""
      />
      <Copyright />
    </div>
  );
};
