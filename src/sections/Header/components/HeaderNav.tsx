import { NavLink } from "react-router-dom";

const tabs = [
  {
    to: "/",
    label: "Home",
    iconMask:
      "https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/home.svg",
    end: true,
  },
  {
    to: "/casino",
    label: "Casino",
    iconMask:
      "https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/casino.svg",
  },
  {
    to: "/free-money",
    label: "Free money",
    iconMask:
      "https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/freemoney.svg",
  },
  {
    to: "/sports",
    label: "Sports",
    iconMask:
      "https://optimize.v3.bundlecdn.com/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/route/sport.svg",
  },
];

export const HeaderNav = () => {
  return (
    <nav className="hidden items-center bg-gray-400/10 box-border caret-transparent gap-x-[3px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-[3px] p-0.5 rounded-[14px] md:flex">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `relative text-sm font-semibold items-center box-border caret-transparent gap-x-2 flex h-10 justify-center leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-nowrap px-4 rounded-xl ${
              isActive ? "bg-blue-600 text-white" : "text-gray-100"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="box-border caret-transparent h-6 min-h-[auto] min-w-[auto] outline-[3px] text-nowrap w-6 p-0.5">
                <div
                  className={`${isActive ? "bg-white" : "bg-gray-400"} box-border caret-transparent h-full [mask-repeat:no-repeat] [mask-size:100%] outline-[3px] text-nowrap w-full [mask-position:50%]`}
                  style={{ maskImage: `url('${tab.iconMask}')` }}
                ></div>
              </div>
              {tab.label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
