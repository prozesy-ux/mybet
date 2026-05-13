import { FooterNavColumn } from "@/sections/Footer/components/FooterNavColumn";

export const FooterNavigation = () => {
  return (
    <div className="box-border caret-transparent gap-x-20 grid col-end-[navigation] col-start-[navigation] row-end-[navigation] row-start-[navigation] [grid-template-areas:'a_b'] grid-cols-[auto_1fr] grid-rows-[auto] max-w-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-20">
      <FooterNavColumn
        title="Information"
        rootVariant="col-end-[a] col-start-[a] row-end-[a] row-start-[a]"
        linkColumns={[
          {
            links: [
              { href: "#", label: "Rules" },
              { href: "#", label: "Promotions" },
              { href: "https://1w.run/", label: "Partner program" },
            ],
          },
        ]}
      />
      <FooterNavColumn
        title="Categories"
        rootVariant="col-end-[b] col-start-[b] row-end-[b] row-start-[b]"
        linkColumns={[
          {
            links: [
              { href: "#", label: "Live" },
              { href: "#", label: "Sports" },
              { href: "#", label: "Esports" },
              { href: "#", label: "Bonuses" },
            ],
          },
          {
            links: [
              {
                href: "#",
                label: "Live Casino",
              },
              { href: "#", label: "Poker" },
              { href: "#", label: "Casino" },
            ],
          },
        ]}
      />
    </div>
  );
};
