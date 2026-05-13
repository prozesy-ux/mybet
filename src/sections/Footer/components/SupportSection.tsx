import { SupportCard } from "@/sections/Footer/components/SupportCard";
import { ContactCard } from "@/sections/Footer/components/ContactCard";

export const SupportSection = () => {
  return (
    <div className="text-xs box-border caret-transparent gap-x-3 grid col-end-[support] col-start-[support] row-end-[support] row-start-[support] grid-cols-[1fr] tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 md:gap-x-4 md:grid-cols-[1fr_1fr] md:gap-y-4">
      <SupportCard />
      <ContactCard />
    </div>
  );
};
