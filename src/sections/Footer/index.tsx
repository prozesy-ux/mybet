import { FooterTop } from "@/sections/Footer/components/FooterTop";
import { SupportSection } from "@/sections/SupportSection";
import { AppDownloadSection } from "@/sections/AppDownloadSection";
import { FooterLinks } from "@/sections/Footer/components/FooterLinks";

export const Footer = () => {
  return (
    <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
      <div className="relative box-border caret-transparent max-w-[420px] outline-[3px] w-full mx-auto px-3 py-6 md:max-w-[1640px] md:px-12 md:py-10">
        <div className="relative box-border caret-transparent flex flex-col gap-6 max-w-full outline-[3px] md:gap-x-10 md:grid md:[grid-template-areas:'headRow_headRow_headRow''support_support_support''navigation_._appBanner''bottom_bottom_bottom'] md:grid-cols-[430px_auto_548px] md:grid-rows-[auto_auto_auto_auto] md:gap-y-10">
          <FooterTop />
          <div className="items-center box-border caret-transparent gap-x-3 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 md:gap-x-4 md:col-end-[headRow] md:col-start-[headRow] md:row-end-[headRow] md:row-start-[headRow] md:gap-y-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/9/9e/1win_official_logo.png"
              alt="1win logo"
              className="aspect-[107_/_36] box-border caret-transparent h-7 max-w-[108px] object-contain outline-[3px] align-baseline md:h-9 md:max-w-none"
            />
            <div className="bg-gray-400/10 box-border caret-transparent grow h-px min-h-[auto] min-w-[auto] outline-[3px]"></div>
            <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
              <div className="box-border caret-transparent outline-[3px]">
                <button
                  type="button"
                  className="relative text-sm items-center bg-gray-400/10 caret-transparent gap-x-1 flex h-9 leading-5 outline-[3px] gap-y-1 text-center uppercase w-full px-2 py-0 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:uppercase after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter"
                >
                  <picture className="box-border caret-transparent contents outline-[3px]">
                    <img
                      src="https://1win.com/resources/v1/shared/images/languages/en-001.svg"
                      className="caret-transparent h-5 min-h-[auto] min-w-[auto] outline-[3px] align-baseline w-5 p-0.5"
                    />
                  </picture>
                  <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
                    en
                  </span>
                  <img
                    src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-15.svg"
                    alt="Icon"
                    className="text-gray-400 box-border caret-transparent h-4 outline-[3px] align-baseline w-4 ml-auto"
                  />
                </button>
              </div>
            </div>
            <button
              type="button"
              className="relative text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center p-0 rounded-[10px]"
            >
              <div className="relative bg-gray-400/10 box-border caret-transparent h-9 outline-[3px] w-9 rounded-[10px] after:accent-auto after:box-border after:caret-transparent after:text-gray-100 after:block after:text-sm after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:[mask-clip:content-box,border-box] after:[mask-composite:exclude,add] after:[mask-image:linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px),linear-gradient(rgb(0,0,0)_0px,rgb(0,0,0)_0px)] after:[mask-mode:match-source,match-source] after:[mask-origin:content-box,border-box] after:[mask-position:0px_0px,0px_0px] after:[mask-repeat:repeat,repeat] after:[mask-size:auto,auto] after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:visible after:p-px after:rounded-[10px] after:border-separate after:inset-0 after:font-inter">
                <div className="items-center box-border caret-transparent gap-x-2 flex h-full justify-center outline-[3px] gap-y-2 text-nowrap">
                  <div className="box-border caret-transparent contents outline-[3px] text-nowrap">
                    <img
                      src="https://c.animaapp.com/mp2qv90eAQQ9j2/assets/icon-39.svg"
                      alt="Icon"
                      className="box-border caret-transparent h-4 outline-[3px] text-nowrap align-baseline w-4"
                    />
                  </div>
                </div>
              </div>
            </button>
          </div>
          <SupportSection />
          <AppDownloadSection />
          <FooterLinks />
        </div>
      </div>
    </div>
  );
};
