import { FooterLinkColumn } from "@/sections/SportsClone/Footer/components/FooterLinkColumn";

export const FooterNavigation = () => {
  return (
    <div className="box-border caret-transparent gap-x-20 grid col-end-[navigation] col-start-[navigation] row-end-[navigation] row-start-[navigation] [grid-template-areas:'a_b'] grid-cols-[auto_1fr] grid-rows-[auto] max-w-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-20">
      <FooterLinkColumn
        title="Information"
        containerVariant="col-end-[a] col-start-[a] row-end-[a] row-start-[a]"
        firstColumnLinks={[
          { href: "https://1win.com/rules", label: "Rules" },
          { href: "https://1win.com/promotions", label: "Promotions" },
          { href: "https://1w.run/", label: "Partner program" },
        ]}
      />
      <FooterLinkColumn
        title="Categories"
        containerVariant="col-end-[b] col-start-[b] row-end-[b] row-start-[b]"
        firstColumnLinks={[
          { href: "https://1win.com/betting/live", label: "Live" },
          { href: "https://1win.com/betting/prematch", label: "Sports" },
          { href: "https://1win.com/betting/esport", label: "Esports" },
          { href: "https://1win.com/bonuses", label: "Bonuses" },
        ]}
        secondColumnLinks={[
          { href: "https://1win.com/casino/live-games", label: "Live Casino" },
          { href: "https://1win.com/poker-app", label: "Poker" },
          { href: "https://1win.com/casino", label: "Casino" },
          { href: "https://1win.com/forum", label: "Forum" },
        ]}
      />
    </div>
  );
};

