import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { LoginModal } from "@/components/auth/LoginModal";
import { RegistrationModal } from "@/components/auth/RegistrationModal";
import {
  AUTH_OPEN_LOGIN_EVENT,
  clearPendingCasinoGame,
  readPendingCasinoGame,
  requestCasinoLaunch,
} from "@/services/casinoLaunchFlow";

export const SidebarHeader = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);
  const navigate = useNavigate();
  const { login, register, isAuthenticated, user } = useAuth();
  const { openModal } = useModal();
  const displayName = user?.name ?? "PROZESY LTD";
  const displayId = user?.id ?? "327183038";

  useEffect(() => {
    const openLogin = () => {
      setRegOpen(false);
      setLoginOpen(true);
    };

    window.addEventListener(AUTH_OPEN_LOGIN_EVENT, openLogin);
    return () => {
      window.removeEventListener(AUTH_OPEN_LOGIN_EVENT, openLogin);
    };
  }, []);

  const processPendingCasinoGame = (isNewUser: boolean) => {
    const pending = readPendingCasinoGame();
    if (!pending) {
      return false;
    }

    clearPendingCasinoGame();

    if (isNewUser) {
      openModal("deposit");
      return true;
    }

    requestCasinoLaunch(pending);
    return true;
  };

  const handleLogin = async (payload: {
    email?: string;
    phone?: string;
    password: string;
  }) => {
    const result = await login(payload);
    if (result.ok) {
      setLoginOpen(false);
      const consumedPendingGame = processPendingCasinoGame(false);
      if (!consumedPendingGame) {
        navigate("/dashboard");
      }
    }
    return result;
  };

  const handleRegister = async (payload: {
    email: string;
    phone: string;
    password: string;
  }) => {
    const result = await register(payload);
    if (result.ok) {
      setRegOpen(false);
      const consumedPendingGame = processPendingCasinoGame(true);
      if (!consumedPendingGame) {
        openModal("deposit");
      }
    }
    return result;
  };

  return (
    <>
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSubmit={handleLogin}
        onRegisterClick={() => {
          setLoginOpen(false);
          setRegOpen(true);
        }}
      />
      <RegistrationModal
        isOpen={regOpen}
        onClose={() => setRegOpen(false)}
        onSubmit={handleRegister}
        onLoginClick={() => {
          setRegOpen(false);
          setLoginOpen(true);
        }}
      />

      <div className="box-border caret-transparent gap-x-4 flex flex-col shrink-0 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:hidden before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-px after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-full after:border-separate after:font-inter">
      <div className="box-border caret-transparent gap-x-2 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:hidden before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-px after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-full after:border-separate after:font-inter">
        <div className="box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] px-4 before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:hidden before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-px after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-full after:border-separate after:font-inter">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => openModal("profile")}
              className="appearance-none items-center bg-transparent caret-transparent gap-x-3 flex max-w-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 w-full p-0"
            >
              <div className="relative text-gray-400/60 box-border caret-transparent flex shrink-0 min-h-[auto] min-w-[auto] outline-[3px] rounded-[999px]">
                <div className="items-center bg-gray-400/10 box-border caret-transparent flex h-11 justify-center min-h-[auto] min-w-[auto] outline-[3px] w-11 rounded-[999px]">
                  <img
                    src="https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-3.svg"
                    alt="Icon"
                    className="box-border caret-transparent h-6 outline-[3px] align-baseline w-6 p-0.5"
                  />
                </div>
                <div className="absolute text-white items-center bg-orange-600 box-border caret-transparent flex h-2 justify-center outline-[3px] w-2 z-[1] px-1 rounded-[999px] right-[3px] top-[3px]"></div>
              </div>
              <div className="items-center box-border caret-transparent flex grow max-w-full min-h-[auto] outline-[3px] overflow-hidden">
                <div className="items-start box-border caret-transparent gap-x-1 flex flex-col grow min-h-[auto] min-w-[auto] outline-[3px] gap-y-1">
                  <div className="font-semibold box-border caret-transparent tracking-[-0.12px] leading-[22px] max-w-full min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                    {displayName}
                  </div>
                  <div className="text-gray-400 text-xs box-border caret-transparent tracking-[0.01px] leading-4 max-w-full min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                    ID {displayId}
                  </div>
                </div>
                <img
                  src="https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-4.svg"
                  alt="Icon"
                  className="text-gray-500 box-border caret-transparent shrink-0 h-6 outline-[3px] align-baseline w-6 p-0.5"
                />
              </div>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="appearance-none items-center bg-transparent caret-transparent gap-x-3 flex max-w-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 w-full p-0"
            >
              <div className="relative text-gray-400/60 box-border caret-transparent flex shrink-0 min-h-[auto] min-w-[auto] outline-[3px] rounded-[999px]">
                <div className="items-center bg-gray-400/10 box-border caret-transparent flex h-11 justify-center min-h-[auto] min-w-[auto] outline-[3px] w-11 rounded-[999px]">
                  <img
                    src="https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-3.svg"
                    alt="Icon"
                    className="box-border caret-transparent h-6 outline-[3px] align-baseline w-6 p-0.5"
                  />
                </div>
              </div>
              <div className="items-center box-border caret-transparent flex grow max-w-full min-h-[auto] outline-[3px] overflow-hidden">
                <div className="items-start box-border caret-transparent gap-x-1 flex flex-col grow min-h-[auto] min-w-[auto] outline-[3px] gap-y-1">
                  <div className="text-sm font-semibold box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden">
                    Log in
                  </div>
                </div>
                <img
                  src="https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-4.svg"
                  alt="Icon"
                  className="text-gray-500 box-border caret-transparent shrink-0 h-6 outline-[3px] align-baseline w-6 p-0.5"
                />
              </div>
            </button>
          )}
        </div>
        <div className="box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] px-4 before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:hidden before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-px after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-full after:border-separate after:font-inter">
          <a
            href="#"
            className="relative text-white text-xs font-semibold items-center bg-[radial-gradient(181.61%_181.61%_at_122.05%_-3.73%,rgb(0,97,103)_0%,rgb(0,61,65)_51.3%,rgb(16,36,37)_100%)] shadow-[rgba(179,182,189,0.12)_0px_0px_0px_1px_inset] box-border caret-transparent flex h-[60px] justify-between tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px] w-full pl-3 rounded-2xl"
          >
            <div className="box-border caret-transparent max-w-full min-h-[auto] min-w-[auto] outline-[3px] overflow-hidden">
              Free money
            </div>
            <picture className="box-border caret-transparent contents outline-[3px]">
              <img className="absolute box-border caret-transparent max-w-full outline-[3px] align-baseline rounded-2xl right-0 bottom-0" />
            </picture>
          </a>
        </div>
      </div>
      <div className="box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] before:accent-auto before:bg-gray-400/10 before:box-border before:caret-transparent before:text-gray-100 before:hidden before:text-base before:not-italic before:normal-nums before:font-normal before:h-px before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:font-inter after:accent-auto after:bg-gray-400/10 after:box-border after:caret-transparent after:text-gray-100 after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-px after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-full after:border-separate after:font-inter">
        <div className="relative bg-gray-400/10 box-border caret-transparent h-px min-h-[auto] min-w-[auto] outline-[3px]">
          <button
            type="button"
            className="absolute text-stone-950/30 text-[13.3333px] items-center bg-zinc-100/30 caret-transparent flex justify-center leading-[normal] min-h-8 min-w-8 outline-[3px] text-center translate-y-[-50.0%] z-[2] overflow-hidden p-0 rounded-[999px] -right-4 top-2/4"
          >
            <div className="text-gray-400 bg-zinc-800 box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] p-1">
              <img
                src="https://c.animaapp.com/mp2q7d7w2xcH7p/assets/icon-5.svg"
                alt="Icon"
                className="box-border caret-transparent h-6 outline-[3px] align-baseline w-6 p-0.5 -scale-100"
              />
            </div>
          </button>
        </div>
      </div>
      </div>
    </>
  );
};
