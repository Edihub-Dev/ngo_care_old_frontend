'use client';

import { motion } from 'framer-motion';

const keywords = [
  "Hope", "Unity", "Care", "Impact", "Growth", "Trust", "Together", 
  "Hope", "Unity", "Care", "Impact", "Growth", "Trust", "Together"
];

export default function Ticker() {
  return (
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
      </div>
    </div>
  );
}
