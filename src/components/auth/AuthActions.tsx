import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LoginModal } from "./LoginModal";
import { RegistrationModal } from "./RegistrationModal";

interface AuthActionsProps {
  redirectOnSuccess?: string;
}

export const AuthActions = ({ redirectOnSuccess = "/dashboard" }: AuthActionsProps) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleLogin = async (payload: {
    email?: string;
    phone?: string;
    password: string;
  }) => {
    const result = await login(payload);
    if (result.ok) {
      setLoginOpen(false);
      navigate(redirectOnSuccess);
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
      navigate(redirectOnSuccess);
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
        onLoginClick={() => setLoginOpen(true)}
      />
      <div className="items-center box-border caret-transparent gap-x-3 flex grow justify-end min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 ml-auto md:gap-x-4 md:gap-y-4">
        <div className="box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 md:gap-x-3 md:gap-y-3">
          <button
            type="button"
            onClick={() => setLoginOpen(true)}
            className="relative text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center p-0 rounded-xl"
          >
            <div className="relative bg-gray-400/10 box-border caret-transparent h-11 outline-[3px] px-5 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
              <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                  Login
                </div>
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setRegOpen(true)}
            className="relative text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center p-0 rounded-xl"
          >
            <div className="relative bg-green-600 box-border caret-transparent h-11 outline-[3px] px-4 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-white after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
              <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap text-white">
                Registration
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
