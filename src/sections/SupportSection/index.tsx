import { SupportCard } from "@/sections/SupportSection/components/SupportCard";
import { ContactCards } from "@/sections/SupportSection/components/ContactCards";

export const SupportSection = () => {
  return (
    <div className="text-xs box-border caret-transparent gap-x-3 grid grid-cols-[1fr] tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 md:col-end-[support] md:col-start-[support] md:row-end-[support] md:row-start-[support] md:gap-x-4 md:grid-cols-[1fr_1fr] md:gap-y-4">
      <SupportCard />
      <ContactCards />
    </div>
  );
};
