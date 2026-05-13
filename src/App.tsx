import { Sidebar } from "@/sections/Sidebar";
import { Header } from "@/sections/Header";
import { MainContent } from "@/sections/MainContent";
import { Footer } from "@/sections/Footer";
import { SeoContent } from "@/sections/SeoContent";
import { ModalProvider } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import { ModalOrchestrator } from "@/components/modals/ModalOrchestrator";
import { Navigate, Route, Routes } from "react-router-dom";
import { PageLayout } from "@/sections/PageLayout";
import { BlogPage } from "@/sections/BlogPage";
import { BonusPage } from "@/sections/BonusPage";
import { VipPage } from "@/sections/VipPage";
import { FreeMoneyPage } from "@/sections/FreeMoneyPage";
import { SportsPage } from "@/sections/SportsPage";
import { PromotionsPage } from "@/sections/PromotionsPage";
import { AdminPanelPage } from "@/sections/AdminPanel";
import { StartTestPage } from "@/sections/StartTestPage";

const HomePage = () => {
  return (
    <ModalProvider>
    <ModalOrchestrator />
    <div className="text-black text-base not-italic normal-nums font-normal accent-auto bg-neutral-900 box-border caret-transparent block tracking-[normal] leading-6 list-outside list-disc outline-[3px] overflow-x-hidden overflow-y-auto pointer-events-auto text-start indent-[0px] normal-case visible border-separate font-inter">
      <img
        src="https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-1.svg"
        alt="Icon"
        className="absolute box-border caret-transparent left-[-9999px] outline-[3px] pointer-events-none align-baseline"
      />
      <div className="box-border caret-transparent flex flex-col min-h-[1000px] outline-[3px]">
        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]"></div>
        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
          <div className="box-border caret-transparent contents outline-[3px]">
            <div className="text-gray-100 bg-neutral-900 box-border caret-transparent flex outline-[3px]">
              <Sidebar />
              <div className="box-border caret-transparent flex flex-col grow min-h-[auto] outline-[3px]">
                <div className="box-border caret-transparent flex flex-col grow min-h-[auto] outline-[3px]">
                  <Header />
                  <MainContent />
                  <div className="relative box-border caret-transparent gap-x-6 flex flex-col max-w-[1640px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-6 w-full mx-auto px-4 md:gap-x-8 md:gap-y-8 md:px-12">
                    <SeoContent />
                  </div>
                  <Footer />
                  <div className="relative box-border caret-transparent gap-x-6 flex flex-col max-w-[1640px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-6 w-full mx-auto px-4 md:gap-x-8 md:gap-y-8 md:px-12">
                    <div className="fixed self-end box-border caret-transparent flex flex-col-reverse h-[1000px] outline-[3px] pointer-events-none z-[102] bottom-[76px] md:bottom-10">
                      <div className="sticky items-end box-border caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed box-border caret-transparent outline-[3px] z-[1000] bottom-0 inset-x-0"></div>
        <div className="fixed [align-items:normal] box-border caret-transparent gap-x-2 flex flex-col justify-start outline-[3px] pointer-events-none gap-y-2 z-[1005] pt-8 pb-2 px-2 inset-0 md:items-end md:gap-x-4 md:gap-y-4 md:px-4 md:py-16"></div>
      </div>
    </div>
    </ModalProvider>
  );
};

const DashboardPage = () => {
  return (
    <ModalProvider>
      <div className="text-black text-base not-italic normal-nums font-normal accent-auto bg-neutral-900 box-border caret-transparent block tracking-[normal] leading-6 list-outside list-disc outline-[3px] overflow-x-hidden overflow-y-auto pointer-events-auto text-start indent-[0px] normal-case visible border-separate font-inter">
        <ModalOrchestrator />
        <img
          src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-1.svg"
          alt="Icon"
          className="absolute box-border caret-transparent left-[-9999px] outline-[3px] pointer-events-none align-baseline"
        />
        <div className="box-border caret-transparent flex flex-col min-h-[1000px] outline-[3px]">
          <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]"></div>
          <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
            <div className="box-border caret-transparent contents outline-[3px]">
              <div className="text-gray-100 bg-neutral-900 box-border caret-transparent flex outline-[3px]">
                <Sidebar />
                <div className="box-border caret-transparent flex flex-col grow min-h-[auto] outline-[3px]">
                  <div className="box-border caret-transparent flex flex-col grow min-h-[auto] outline-[3px]">
                    <Header />
                    <MainContent />
                    <Footer />
                    <div className="relative box-border caret-transparent gap-x-6 flex flex-col max-w-[1640px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-6 w-full mx-auto px-4 md:gap-x-8 md:gap-y-8 md:px-12">
                      <div className="fixed self-end box-border caret-transparent flex flex-col-reverse h-[1000px] outline-[3px] pointer-events-none z-[102] bottom-[76px] md:bottom-10">
                        <div className="sticky items-end box-border caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed box-border caret-transparent outline-[3px] z-[1000] bottom-0 inset-x-0"></div>
          <div className="fixed [align-items:normal] box-border caret-transparent gap-x-2 flex flex-col justify-start outline-[3px] pointer-events-none gap-y-2 z-[1005] pt-8 pb-2 px-2 inset-0 md:items-end md:gap-x-4 md:gap-y-4 md:px-4 md:py-16"></div>
        </div>
        <div className="box-border caret-transparent outline-[3px]"></div>
      </div>
    </ModalProvider>
  );
};

export const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/casino" element={<HomePage />} />
      <Route path="/free-money" element={<PageLayout><FreeMoneyPage /></PageLayout>} />
      <Route path="/sports" element={<PageLayout><SportsPage /></PageLayout>} />
      <Route path="/promotions" element={<PageLayout><PromotionsPage /></PageLayout>} />
      <Route path="/blog" element={<PageLayout><BlogPage /></PageLayout>} />
      <Route path="/bonus" element={<PageLayout><BonusPage /></PageLayout>} />
      <Route path="/vip" element={<PageLayout><VipPage /></PageLayout>} />
      <Route path="/admin9x5" element={<AdminPanelPage />} />
      <Route path="/start-test" element={<StartTestPage />} />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <DashboardPage /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};
