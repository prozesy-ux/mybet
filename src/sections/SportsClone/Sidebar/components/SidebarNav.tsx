import { SidebarNavSection } from "@/sections/SportsClone/Sidebar/components/SidebarNavSection";

export const SidebarNav = () => {
  return (
    <div className="box-border caret-transparent gap-x-4 flex flex-col grow shrink-0 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 px-4 before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:hidden before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-px after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-full after:border-separate after:font-inter">
      <SidebarNavSection
        rootClassName="box-border caret-transparent gap-x-1 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:hidden before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-px after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-full after:border-separate after:font-inter"
        sectionClassName="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]"
        items={[
          {
            href: "https://1win.com/casino",
            label: "Casino",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full pl-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/casino-v2.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
            trailingIconSrc:
              "https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-6.svg",
            trailingIconAlt: "Icon",
            hasDivider: true,
          },
          {
            href: "https://1win.com/betting",
            label: "Sports",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full pl-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/cricket-v2.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
            trailingIconSrc:
              "https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-7.svg",
            trailingIconAlt: "Icon",
            subItems: [
              {
                href: "https://1win.com/betting",
                label: "Top",
                linkClassName:
                  "relative text-sm items-center bg-gray-400/20 box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
                iconClassName:
                  "bg-gray-100 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/betting-main.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
              },
              {
                href: "https://1win.com/betting/live",
                label: "Live",
                linkClassName:
                  "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
                iconClassName:
                  "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/betting-live.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
              },
              {
                href: "https://1win.com/betting/esport",
                label: "Esports",
                linkClassName:
                  "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
                iconClassName:
                  "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/betting-cybersport.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
              },
              {
                href: "https://1win.com/betting/prematch",
                label: "Sports",
                linkClassName:
                  "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
                iconClassName:
                  "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/betting-prematch.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
              },
              {
                href: "https://1win.com/betting/bets-history",
                label: "Bet history",
                linkClassName:
                  "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
                iconClassName:
                  "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/betting-bets-history.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
              },
              {
                href: "https://1win.com/casino/play/fundist_2216996",
                label: "Virtual cricket",
                linkClassName:
                  "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
                iconClassName:
                  "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/cricket-v2.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
              },
            ],
          },
          {
            href: "https://1win.com/betwave",
            label: "Betwave",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full pl-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/betwave-logo.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
            trailingIconSrc:
              "https://c.animaapp.com/mp30zcm9FPpYtQ/assets/icon-6.svg",
            trailingIconAlt: "Icon",
            hasDivider: true,
          },
          {
            href: "https://1win.com/bonuses",
            label: "Bonuses",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/bonuses-v2.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
            badgeText: "1",
          },
          {
            href: "https://1win.com/vip-club",
            label: "VIP club",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/vip-landing.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
          },
        ]}
      />
      <div className="relative box-border caret-transparent flex shrink-0 h-px min-h-[auto] min-w-[auto] outline-[3px] before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-full before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:min-h-[auto] before:min-w-[auto] before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter"></div>
      <SidebarNavSection
        rootClassName="box-border caret-transparent gap-x-1 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-1"
        sectionClassName=""
        items={[
          {
            href: "https://1win.com/promotions",
            label: "Promotions",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/promotions.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
          },
          {
            href: "https://1win.com/blog",
            label: "Blog",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/blog.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
          },
        ]}
      />
    </div>
  );
};

