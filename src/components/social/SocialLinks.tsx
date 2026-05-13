export type SocialLinksProps = {
  containerVariant: string;
  showGroupedLayout: boolean;
  socialLinks: {
    href: string;
    iconSrc: string;
    title: string;
  }[];
  showActionButton: boolean;
  actionButtonClassName: string;
  actionIconSrc: string;
  languageButtonClassName: string;
  languageFlagSrc: string;
  languageCode: string;
  languageIconSrc: string;
};

export const SocialLinks = (props: SocialLinksProps) => {
  return (
    <div
      className={`box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 ${props.containerVariant}`}
    >
      {props.showGroupedLayout ? (
        <>
          <div className="box-border caret-transparent gap-x-1 flex grow-[1000] min-h-[auto] min-w-[auto] outline-[3px] gap-y-1">
            <div className="box-border caret-transparent gap-x-1 flex max-w-[125px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-1">
              {props.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  title={link.title}
                  className="relative box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]"
                >
                  <div className="relative items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-9 overflow-hidden rounded-[10px]">
                    <img
                      src={link.iconSrc}
                      alt="Icon"
                      className="box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                    />
                  </div>
                </a>
              ))}
            </div>
            {props.showActionButton && (
              <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                <div className="box-border caret-transparent outline-[3px]">
                  <button type="button" className={props.actionButtonClassName}>
                    <div className="relative bg-gray-400/10 box-border caret-transparent h-9 outline-[3px] w-9 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                      <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                        <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                          <img
                            src={props.actionIconSrc}
                            alt="Icon"
                            className="text-gray-400 box-border caret-transparent h-4 outline-[3px] text-nowrap align-baseline w-4"
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative box-border caret-transparent grow min-h-[auto] min-w-[auto] outline-[3px]">
            <div className="box-border caret-transparent outline-[3px]">
              <button type="button" className={props.languageButtonClassName}>
                <picture className="box-border caret-transparent contents outline-[3px]">
                  <img
                    src={props.languageFlagSrc}
                    className="caret-transparent h-5 min-h-[auto] min-w-[auto] outline-[3px] align-baseline w-5 p-0.5"
                  />
                </picture>
                <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
                  {props.languageCode}
                </span>
                <img
                  src={props.languageIconSrc}
                  alt="Icon"
                  className="text-gray-400 box-border caret-transparent h-4 outline-[3px] align-baseline w-4 ml-auto"
                />
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {props.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              title={link.title}
              className="relative box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] rounded-[10px]"
            >
              <div className="relative items-center box-border caret-transparent flex h-9 justify-center outline-[3px] w-9 overflow-hidden rounded-[10px]">
                <img
                  src={link.iconSrc}
                  alt="Icon"
                  className="box-border caret-transparent h-full outline-[3px] align-baseline w-full"
                />
              </div>
            </a>
          ))}
        </>
      )}
    </div>
  );
};
