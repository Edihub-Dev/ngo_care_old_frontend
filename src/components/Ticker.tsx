'use client';

<<<<<<< HEAD
import { motion } from 'framer-motion';

const keywords = [
  "Hope", "Unity", "Care", "Impact", "Growth", "Trust", "Together", 
  "Hope", "Unity", "Care", "Impact", "Growth", "Trust", "Together"
=======
const tickerItems = [
  "Together, We Create Impact",
  "Unite. Act. Transform.",
  "Your Support Changes Lives",
  "Rebuilding Hope Every Day",
  "Feed Families in Need",
  "Join Our Mission Today"
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
];

export default function Ticker() {
  return (
<<<<<<< HEAD
    <div className="bg-black border-y border-white/10 overflow-hidden">
      <div className="relative">
        <motion.div
          className="flex space-x-10"
          animate={{
            x: [0, -50 * keywords.length]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {keywords.map((keyword, index) => (
            <div key={index} className="flex items-center space-x-10">
              <span className="ticker-text">{keyword}</span>
              <div className="w-1 h-6 bg-green-500 opacity-60"></div>
            </div>
          ))}
        </motion.div>
=======
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
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
      </div>
    </div>
  );
}
