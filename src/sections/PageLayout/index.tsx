import { Sidebar } from "@/sections/Sidebar";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { ModalProvider } from "@/context/ModalContext";
import { ModalOrchestrator } from "@/components/modals/ModalOrchestrator";
import { ReactNode } from "react";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ModalProvider>
      <div className="text-gray-100 text-sm not-italic normal-nums font-normal accent-auto bg-[#141415] box-border caret-transparent block tracking-[normal] leading-5 list-outside list-disc outline-[3px] overflow-x-hidden overflow-y-auto pointer-events-auto text-start indent-[0px] normal-case visible border-separate font-inter">
        <ModalOrchestrator />
        <div className="box-border caret-transparent flex flex-col min-h-screen outline-[3px]">
          <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
            <div className="box-border caret-transparent contents outline-[3px]">
              <div className="text-gray-100 bg-[#141415] box-border caret-transparent flex outline-[3px]">
                <Sidebar />
                <div className="box-border caret-transparent flex flex-col grow min-h-[auto] outline-[3px]">
                  <Header />
                  <div className="grow min-h-0">{children}</div>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
};
