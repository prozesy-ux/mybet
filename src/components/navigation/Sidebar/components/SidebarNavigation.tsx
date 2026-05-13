import { SidebarNavGroup } from "@/components/navigation/Sidebar/components/SidebarNavGroup";

export const SidebarNavigation = () => {
  return (
    <div className="box-border caret-transparent gap-x-4 flex flex-col grow shrink-0 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 px-4 before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:hidden before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-px after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-full after:border-separate after:font-inter">
      <SidebarNavGroup
        items={[
          {
            href: "/casino",
            label: "Casino",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full pl-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/casino-v2.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
            showTrailingIcon: true,
            trailingIconSrc:
              "https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-6.svg",
            trailingIconAlt: "Icon",
            itemWrapperClassName:
              "relative box-border caret-transparent outline-[3px]",
            showDivider: true,
          },
          {
            href: "/sports",
            label: "Sports",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full pl-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/betting-v2.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
            showTrailingIcon: true,
            trailingIconSrc:
              "https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-6.svg",
            trailingIconAlt: "Icon",
            itemWrapperClassName:
              "box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]",
            showDivider: true,
          },
          {
            href: "#",
            label: "Betwave",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full pl-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/betwave-logo.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
            showTrailingIcon: true,
            trailingIconSrc:
              "https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-6.svg",
            trailingIconAlt: "Icon",
            itemWrapperClassName:
              "box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]",
            showDivider: true,
          },
          {
            href: "/bonus",
            label: "Bonuses",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/bonuses-v2.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
            showTrailingIcon: false,
            trailingIconSrc: "",
            trailingIconAlt: "",
            itemWrapperClassName:
              "relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]",
            showDivider: false,
          },
          {
            href: "/vip",
            label: "VIP club",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/vip-landing.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
            showTrailingIcon: false,
            trailingIconSrc: "",
            trailingIconAlt: "",
            itemWrapperClassName:
              "relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]",
            showDivider: false,
          },
        ]}
        variant="full"
      />
      <div className="relative box-border caret-transparent flex shrink-0 h-px min-h-[auto] min-w-[auto] outline-[3px] before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-full before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:min-h-[auto] before:min-w-[auto] before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter"></div>
      <SidebarNavGroup
        variant="default"
        items={[
          {
            href: "#",
            label: "Promotions",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/promotions.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
            showTrailingIcon: false,
            trailingIconSrc: "",
            trailingIconAlt: "",
            itemWrapperClassName:
              "relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]",
            showDivider: false,
          },
          {
            href: "/blog",
            label: "Blog",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/blog.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
            showTrailingIcon: false,
            trailingIconSrc: "",
            trailingIconAlt: "",
            itemWrapperClassName:
              "relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]",
            showDivider: false,
          },
          {
            href: "#",
            label: "Trading",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/trading.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
            showTrailingIcon: false,
            trailingIconSrc: "",
            trailingIconAlt: "",
            itemWrapperClassName:
              "relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]",
            showDivider: false,
          },
          {
            href: "#",
            label: "Poker",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/poker.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
            showTrailingIcon: false,
            trailingIconSrc: "",
            trailingIconAlt: "",
            itemWrapperClassName:
              "relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]",
            showDivider: false,
          },
          {
            href: "#",
            label: "Vsport",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/vsport.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
            showTrailingIcon: false,
            trailingIconSrc: "",
            trailingIconAlt: "",
            itemWrapperClassName:
              "relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]",
            showDivider: false,
          },
          {
            href: "#",
            label: "Fantasy sport",
            linkClassName:
              "relative text-sm items-center box-border caret-transparent gap-x-2 flex justify-start leading-5 min-h-9 outline-[3px] gap-y-2 w-full px-2 rounded-[10px]",
            iconClassName:
              "bg-gray-400 box-border caret-transparent h-full [mask-image:url('https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sidebar/fantasy-sport.svg')] [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] w-full [mask-composite:exclude] [mask-position:50%]",
            showTrailingIcon: false,
            trailingIconSrc: "",
            trailingIconAlt: "",
            itemWrapperClassName:
              "relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]",
            showDivider: false,
          },
        ]}
      />
    </div>
  );
};
