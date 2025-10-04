import React, { useState } from "react";
import { motion } from "framer-motion";

const DEFAULT =
  "Happy Birthday Shivangi. I'm grateful for every moment with you.";

export default function Messages() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mt-4">
      <motion.div
        initial={{ scale: 0.99 }}
        animate={{ scale: 1 }}
        className="p-4 rounded-lg bg-gradient-to-r from-pink-50 to-white border"
      >
        <p className="text-gray-700">
          {expanded
            ? DEFAULT +
              " Today and always, I promise to make you smile, to build dreams together, and to be your biggest fan. I might have caused a lot of chaos in your life, might have added extra responsibility/burden on your head, might have just ruined your peace sometimes and many more, but I promise, I would give you the best life you deserve and fill your life with all the happiness I can afford. I promise to go to any extent just to see that cute and beautiful smile on your face. I love you to the moon and back, now and forever. Happy Birthday once again my love. May all your dreams come true. You deserve the world and I promise to give you that and much more. Here's to many more birthdays together, filled with love, laughter, and endless adventures. Cheers to you, my beautiful Shivangi! 💖"
            : DEFAULT.slice(0, 80) + "..."}
        </p>
        <div className="mt-3 flex gap-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-3 py-1 bg-pink-600 text-white rounded-lg text-sm"
          >
            {expanded ? "Read less" : "Please read more"}
          </button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Pretend this sends a big kiss 💋");
            }}
            className="px-3 py-1 border rounded-lg text-sm"
          >
            Send a kiss
          </a>
        </div>
      </motion.div>
    </div>
  );
}
