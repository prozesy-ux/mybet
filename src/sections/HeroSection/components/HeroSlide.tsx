export type HeroSlideProps = {
  containerVariant: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  title?: React.ReactNode;
  buttonText: string;
};

export const HeroSlide = (props: HeroSlideProps) => {
  return (
    <div
      className={`relative box-border caret-transparent shrink-0 h-full min-h-[auto] min-w-[auto] outline-[3px] w-[840px] mr-4 ${props.containerVariant}`}
    >
      <div className="relative box-border caret-transparent outline-[3px] overflow-hidden">
        <picture className="box-border caret-transparent contents outline-[3px]">
          <img
            className="aspect-[2.625_/_1] box-border caret-transparent h-80 object-cover outline-[3px] align-baseline w-[840px]"
            src={props.imageSrc}
            alt={props.imageAlt || ""}
          />
        </picture>

        <a
          href={props.href}
          className="absolute items-start box-border caret-transparent flex flex-col outline-[3px] p-5 inset-0 md:p-[35px]"
        >
          <div className="text-white text-base font-extrabold box-border caret-transparent tracking-[0.33px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-[33px] md:leading-[38px]">
            <div className="text-base box-border caret-transparent contents leading-5 outline-[3px] md:text-[33px] md:leading-[38px]">
              {props.title}
            </div>
          </div>
        </a>

        <div className="items-end self-stretch box-border caret-transparent flex justify-between outline-[3px] mt-auto">
          <a
            href={props.href}
            className="absolute items-start box-border caret-transparent flex flex-col outline-[3px] p-5 inset-0 md:p-[35px]"
          ></a>
          <a
            href={props.href}
            className="relative text-black text-sm font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] rounded-xl"
          >
            <div className="relative bg-white box-border caret-transparent h-11 outline-[3px] px-5 rounded-xl after:accent-auto after:box-border after:caret-transparent after:text-black after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-none after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-xl after:border-separate after:inset-0 after:font-inter">
              <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                  {props.buttonText}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
