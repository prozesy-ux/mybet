import { SidebarMenuSection } from "@/sections/Sidebar/components/SidebarMenuSection";

export const SidebarMenu = () => {
  return (
    <div className="box-border caret-transparent gap-x-4 flex flex-col grow shrink-0 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 px-4 before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:hidden before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-px after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-full after:border-separate after:font-inter">
      <SidebarMenuSection variant="primary" />
      <div className="relative box-border caret-transparent flex shrink-0 h-px min-h-[auto] min-w-[auto] outline-[3px] before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-full before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:min-h-[auto] before:min-w-[auto] before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter"></div>
      <SidebarMenuSection variant="secondary" />
    </div>
  );
};
