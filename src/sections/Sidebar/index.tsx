import { SidebarHeader } from "@/sections/Sidebar/components/SidebarHeader";
import { SidebarMenu } from "@/sections/Sidebar/components/SidebarMenu";
import { SidebarFooter } from "@/sections/Sidebar/components/SidebarFooter";

export const Sidebar = () => {
  return (
    <div className="relative hidden box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] z-[131] md:block">
      <div className="box-border caret-transparent outline-[3px]">
        <div className="box-border caret-transparent outline-[3px] w-[280px]"></div>
        <div className="fixed bg-zinc-900 box-border caret-transparent h-[1000px] outline-[3px] w-[280px] left-0 inset-y-0"></div>
        <div className="fixed box-border caret-transparent h-[1000px] outline-[3px] overscroll-x-contain overscroll-y-contain overflow-auto pr-0 pt-4 left-0 inset-y-0 md:pr-5">
          <div className="relative box-border caret-transparent gap-x-4 flex flex-col min-h-full outline-[3px] gap-y-4 w-[280px] before:accent-auto before:box-border before:caret-transparent before:text-gray-100 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-[calc(100%_+_16px)] before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-px before:z-[1] before:border-separate before:right-0 before:-top-4 before:font-inter">
            <SidebarHeader />
            <SidebarMenu />
            <SidebarFooter />
          </div>
        </div>
      </div>
    </div>
  );
};
