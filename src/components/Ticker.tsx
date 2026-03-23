'use client';

const tickerItems = [
  "Together, We Create Impact",
  "Unite. Act. Transform.",
  "Your Support Changes Lives",
  "Rebuilding Hope Every Day",
  "Feed Families in Need",
  "Join Our Mission Today"
];

export default function Ticker() {
  return (
    <div className="w-full bg-[#00b749] py-4 overflow-hidden flex items-center">
      <div className="flex w-fit animate-marquee">
        {/* Double the array to ensure smooth infinite scroll */}
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <div key={i} className="flex items-center whitespace-nowrap mx-8">
            <span className="text-black font-semibold text-lg md:text-xl uppercase tracking-wider">
              {item}
            </span>
            <span className="mx-8 text-black opacity-50">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
