export type AppInstallBannerProps = {
  containerVariant: string;
  backgroundVariant: string;
  contentVariant: string;
  title: string;
  subtitle?: string;
  buttonVariant: string;
  buttonText: string;
  buttonIconUrl?: string;
  buttonIconAlt?: string;
  imageVariant: string;
};

export const AppInstallBanner = (props: AppInstallBannerProps) => {
  return (
    <div
      className={`relative box-border caret-transparent gap-x-3 grid min-w-[auto] outline-[3px] gap-y-3 p-4 md:min-h-[190px] after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:border-separate after:inset-0 after:font-inter ${props.containerVariant}`}
    >
      <div
        className={`absolute box-border caret-transparent outline-[3px] inset-0 ${props.backgroundVariant}`}
      ></div>

      <div
        className={`box-border caret-transparent gap-x-2 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 ${props.contentVariant}`}
      >
        <span className="text-white font-semibold box-border caret-transparent block tracking-[-0.12px] leading-[22px] min-h-[auto] min-w-[auto] outline-[3px]">
          {props.title}
        </span>
        {props.subtitle ? (
          <span className="text-white text-xs box-border caret-transparent block tracking-[0.01px] leading-4 min-h-[auto] min-w-[auto] outline-[3px]">
            <div className="box-border caret-transparent contents outline-[3px]">
              {props.subtitle}
            </div>
          </span>
        ) : null}
      </div>

      <button
        type="button"
        className={`relative text-black text-sm font-semibold self-end bg-transparent caret-transparent block leading-5 min-h-[auto] outline-[3px] text-center p-0 rounded-[10px] ${props.buttonVariant}`}
      >
        <div className="relative bg-white box-border caret-transparent h-9 outline-[3px] px-4 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
          <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
            <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
              {props.buttonIconUrl ? (
                <img
                  src={props.buttonIconUrl}
                  alt={props.buttonIconAlt || "Icon"}
                  className="box-border caret-transparent h-4 outline-[3px] text-nowrap align-baseline w-4"
                />
              ) : null}
              {props.buttonText}
            </div>
          </div>
        </div>
      </button>

      <picture className="box-border caret-transparent contents outline-[3px]">
        <img
          className={`absolute box-border caret-transparent outline-[3px] pointer-events-none align-baseline w-40 right-0 ${props.imageVariant}`}
        />
      </picture>
    </div>
  );
};
