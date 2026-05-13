import { useState } from "react";

const CATEGORIES = [
  "All articles",
  "Twin Inside",
  "Blog",
  "Casino",
  "Sportsbook",
  "VIP Club",
  "Ambassadors",
  "Crypto",
];

const ARTICLES = [
  {
    id: 1,
    category: "Crypto",
    views: "3.4K",
    date: "9 May",
    title: "Withdrawing winnings from Betwin: from balance to wallet in 3 minutes",
    desc: "Fastest withdrawals from Betwin to crypto limits and payouts in 3 minutes",
    image: "https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/blog/articles/article-cover/crypto-withdrawals.jpg",
    wide: false,
  },
  {
    id: 2,
    category: "Crypto",
    views: "3.4K",
    date: "8 May",
    title: "Guide to safe transactions",
    desc: "How to verify the address, network, and Memo before sending funds — and avoid losing them.",
    image: "https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/blog/articles/article-cover/safe-transactions.jpg",
    wide: false,
  },
  {
    id: 3,
    category: "Twin Inside",
    views: "15.4K",
    date: "30 Apr",
    title: "Why download the Betwin App?",
    desc: "The Betwin App gives you full access to your account, games, bonuses, and fast payouts directly from your smartphone.",
    image: "https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/blog/articles/article-cover/app-download.jpg",
    wide: false,
  },
  {
    id: 4,
    category: "Twin Inside",
    views: "13.3K",
    date: "27 April",
    title: "Betwin Markets: where news turns into results",
    desc: "What's next for Telegram in Russia? What decision will Trump make? Will Apple release a foldable smartphone?",
    image: "https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/blog/articles/article-cover/markets.jpg",
    wide: false,
  },
  {
    id: 5,
    category: "Ambassadors",
    views: "11.9K",
    date: "23 April",
    title: "Betwin x Gable Steveson",
    desc: "An Olympic champion and one of the most prominent heavyweights of our time has joined the Betwin ambassadors team.",
    image: "https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/blog/articles/article-cover/ambassador.jpg",
    wide: false,
  },
  {
    id: 6,
    category: "Crypto",
    views: "0.7K",
    date: "23 April",
    title: "One Mistake — and Your Money Is Gone: How Networks and Fees Work",
    desc: "Understanding crypto is fast and convenient — if you understand how the process works. This mini Betwin guide for beginners usually.",
    image: "https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/blog/articles/article-cover/crypto-mistakes.jpg",
    wide: false,
  },
  {
    id: 7,
    category: "Crypto",
    views: "15.8K",
    date: "23 April",
    title: "USDT, BTC or Altcoins: Why 90% of Players Choose Stablecoins",
    desc: "USDT on Betwin: why stablecoins are better than BTC and how to avoid losing money due to exchange rate fluctuations.",
    image: "",
    wide: true,
    gradient: "radial-gradient(ellipse 113.29% 240.64% at 100.00% 100.00%, #4BA0CC 0%, #2B607C 33%, #225068 67%, #061D29 100%)",
  },
  {
    id: 8,
    category: "Twin Inside",
    views: "5.3K",
    date: "22 April",
    title: "From Mumbai to Delhi: Betwin's IPL 2025 Roadshow",
    desc: "Betwin turned Indian tracks into an IPL 2025 celebration with games, stars, and excitement.",
    image: "https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/blog/articles/article-cover/ipl-roadshow.jpg",
    wide: false,
  },
  {
    id: 9,
    category: "Crypto",
    views: "3.3K",
    date: "22 April",
    title: "What Is Tron (TRX)? Cryptocurrency Overview and Betting Guide",
    desc: "What is TRX, how Tron works, what it is used for, and how to use it on Betwin.",
    image: "https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/blog/articles/article-cover/tron.jpg",
    wide: false,
  },
  {
    id: 10,
    category: "Sportsbook",
    views: "5.3K",
    date: "22 April",
    title: "Double Chance Betting: How 1X, X2 and 12 Work for Your Winnings",
    desc: "Less risk in betting: how to use double chance bets effectively.",
    image: "https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/blog/articles/article-cover/double-chance.jpg",
    wide: false,
  },
  {
    id: 11,
    category: "Casino",
    views: "15.4K",
    date: "22 April",
    title: "Best Online Casino Games for Beginners",
    desc: "How to choose a casino game as a beginner: slots to baccarat — 3 proven options.",
    image: "https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/blog/articles/article-cover/casino-beginners.jpg",
    wide: false,
  },
  {
    id: 12,
    category: "Crypto",
    views: "3.3K",
    date: "22 April",
    title: "More Than Money: Why the iGaming World Is Moving to Crypto and How to Top Up Your Betwin...",
    desc: "Simple steps to quickly get started with fast and reliable crypto payments.",
    image: "https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/blog/articles/article-cover/crypto-igaming.jpg",
    wide: false,
  },
  {
    id: 13,
    category: "VIP Club",
    views: "5.7K",
    date: "22 April",
    title: "VIP Status at Betwin: A Service Without Limits",
    desc: "VIP status: personalized approach, fast withdrawals, private tournaments, and premium gifts.",
    image: "https://1win.com/resources/v1/optimizeimages/unsafe/quality/plain/https://v3.bundlecdn.com/b02632/plain/blog/articles/article-cover/vip-status.jpg",
    wide: false,
  },
  {
    id: 14,
    category: "Sportsbook",
    views: "11.6K",
    date: "23 April",
    title: "Types of Sports Betting Bonuses: A Complete Overview",
    desc: "How to use betting bonuses: terms explained and tips for choosing.",
    image: "",
    wide: true,
    gradient: "radial-gradient(ellipse 113.29% 240.64% at 100.00% 100.00%, #4BA0CC 0%, #2B607C 33%, #225068 67%, #061D29 100%)",
  },
];

export const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All articles");

  return (
    <div className="w-full max-w-[1640px] mx-auto px-4 md:px-12 py-6 md:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[#f0f2f5] text-2xl md:text-3xl font-bold leading-tight mb-1">Blog</h1>
        <p className="text-[#9aa1b1] text-sm">News, articles, and tips from the world of iGaming</p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-sm font-semibold px-4 h-9 rounded-[10px] whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? "bg-[#0075ff] text-white"
                : "bg-white/10 text-[#f0f2f5] hover:bg-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ARTICLES.map((article) => {
          if (article.wide) {
            return (
              <div key={article.id} className="col-span-1 md:col-span-2 lg:col-span-3">
                <a
                  href="#"
                  className="block rounded-2xl overflow-hidden relative min-h-[220px] p-8"
                  style={{ background: article.gradient }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold bg-white/20 text-white px-2.5 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-white/60">{article.views}</span>
                    <span className="text-xs text-white/60">·</span>
                    <span className="text-xs text-white/60">{article.date}</span>
                  </div>
                  <h2 className="text-white text-xl md:text-2xl font-bold max-w-lg mb-3 leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-white/70 text-sm max-w-md mb-6">{article.desc}</p>
                  <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-6 h-10 rounded-[10px] transition-colors">
                    Read article
                  </button>
                </a>
              </div>
            );
          }
          return (
            <a
              key={article.id}
              href="#"
              className="bg-[#1d1e20] rounded-2xl overflow-hidden flex flex-col hover:bg-[#2e3035] transition-colors group"
            >
              <div className="w-full aspect-video bg-[#2e3035] overflow-hidden">
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1d1e20] to-[#2e3035]" />
                )}
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2 text-xs text-[#9aa1b1]">
                  <span className="font-semibold text-[#f0f2f5]">{article.category}</span>
                  <span>·</span>
                  <span>{article.views}</span>
                  <span>·</span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-[#f0f2f5] text-sm font-semibold leading-snug line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-[#9aa1b1] text-xs leading-5 line-clamp-2 mt-auto">
                  {article.desc}
                </p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-8">
        <button className="bg-white/10 hover:bg-white/20 text-[#f0f2f5] text-sm font-semibold px-8 h-10 rounded-[10px] transition-colors">
          Load more
        </button>
      </div>
    </div>
  );
};
