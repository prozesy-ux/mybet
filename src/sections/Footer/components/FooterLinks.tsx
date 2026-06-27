import { FooterLinkColumn } from "@/sections/Footer/components/FooterLinkColumn";

export const FooterLinks = () => {
  return (
    <div className="box-border caret-transparent gap-x-4 grid grid-cols-[1fr] grid-rows-[auto] max-w-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-6 md:gap-x-20 md:col-end-[navigation] md:col-start-[navigation] md:row-end-[navigation] md:row-start-[navigation] md:[grid-template-areas:'a_b'] md:grid-cols-[auto_1fr] md:gap-y-20">
      <FooterLinkColumn
        title="Information"
        containerVariant="col-end-[a] col-start-[a] row-end-[a] row-start-[a]"
        columns={[
          {
            links: [
              { href: "#", label: "Rules" },
              { href: "#", label: "Promotions" },
              { href: "https://1w.run/", label: "Partner program" },
            ],
          },
        ]}
      />
      <FooterLinkColumn
        title="Categories"
        containerVariant="col-end-[b] col-start-[b] row-end-[b] row-start-[b]"
        columns={[
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
              { href: "#", label: "Tournaments" },
              {
                href: "#",
                label: "Live Casino",
              },
              { href: "#", label: "Poker" },
              { href: "#", label: "Casino" },
            ],
          },
          {
            links: [{ href: "#", label: "Forum" }],
          },
        ]}
      />
    </div>
  );
};
