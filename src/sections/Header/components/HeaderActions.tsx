import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import { AuthActions } from "@/components/auth/AuthActions";

export const HeaderActions = () => {
  const { openModal } = useModal();
  const { isAuthenticated, user } = useAuth();
  const displayBalance = Number(user?.balance || 0).toFixed(2);

  if (!isAuthenticated) {
    return <AuthActions redirectOnSuccess="/dashboard" />;
  }

  return (
    <div className="items-center box-border caret-transparent gap-x-3 flex grow justify-end min-h-[auto] outline-[3px] gap-y-3 ml-auto md:gap-x-4 md:gap-y-4">
      <div className="items-center box-border caret-transparent gap-x-3 flex grow min-h-[auto] outline-[3px] gap-y-3 md:gap-x-4 md:gap-y-4">
        <div className="text-sm font-semibold box-border caret-transparent flex flex-col grow leading-5 min-h-[auto] outline-[3px]">
          <div className="box-border caret-transparent max-w-full min-h-[auto] outline-[3px] text-end">
            <button
              type="button"
              className="text-gray-400 text-xs items-center bg-transparent caret-transparent gap-x-1 inline-flex tracking-[0.01px] leading-4 outline-[3px] gap-y-1 text-center p-0"
            >
              <div className="box-border caret-transparent contents outline-[3px]">
                BDT{" "}
                <img
                  src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-7.svg"
                  alt="Icon"
                  className="box-border caret-transparent h-4 outline-[3px] align-baseline w-4"
                />
              </div>
            </button>
            <div className="relative box-border caret-transparent flex justify-end max-w-full outline-[3px]">
              <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                {displayBalance}
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => openModal("deposit")}
          className="relative text-white text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center p-0 rounded-xl"
        >
          <div className="relative bg-green-600 box-border caret-transparent h-11 outline-[3px] px-5 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-white after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
            <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
              <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                Deposit
              </div>
            </div>
          </div>
        </button>
      </div>
      <div className="box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 md:gap-x-3 md:gap-y-3">
        <button
          type="button"
          className="relative text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center p-0 rounded-xl"
        >
          <div className="relative bg-gray-400/10 box-border caret-transparent h-11 outline-[3px] w-11 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
            <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
              <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                <img
                  src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-19.svg"
                  alt="Icon"
                  className="box-border caret-transparent h-6 outline-[3px] text-nowrap align-baseline w-6 p-0.5"
                />
              </div>
            </div>
          </div>
          <div className="absolute text-white items-center bg-orange-600 box-border caret-transparent flex h-2 justify-center outline-[3px] w-2 px-1 rounded-[999px] -right-0.5 -top-0.5"></div>
        </button>
      </div>
    </div>
  );
};
