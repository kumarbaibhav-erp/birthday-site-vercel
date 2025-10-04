import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import Gallery from "./components/Gallery";
import Memories from "./components/Memories";
import Messages from "./components/Messages";
import Countdown from "./components/Countdown";
import Reasons from "./components/Reasons";
import OverlayCelebration from "./components/OverlayCelebration";
import Gallery2 from "./components/Gallery2";

const BIRTHDAY_ISO = dayjs().add(1, "day").startOf("day").toISOString(); // placeholder: tomorrow midnight

export default function App() {
  const [isMidnight, setIsMidnight] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    const now = dayjs();
    const midnight = dayjs(BIRTHDAY_ISO);
    if (now.isAfter(midnight)) setIsMidnight(true);
    const t = setInterval(() => {
      if (dayjs().isAfter(midnight)) setIsMidnight(true);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100">
      {overlayVisible && (
        <OverlayCelebration onFinish={() => setOverlayVisible(false)} />
      )}
      <div
        className={overlayVisible ? "blur-sm pointer-events-none" : "blur-0"}
      >
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100">
          {isMidnight && <Confetti numberOfPieces={400} recycle={false} />}
          <header className="max-w-3xl mx-auto p-6 text-center">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-extrabold text-pink-700"
            >
              Happy Birthday, Love! 🎉
            </motion.h1>

            <p className="mt-3 text-sm sm:text-base text-pink-600/80">
              I made this little corner on the web just for you. Opened at
              midnight — every second carries a wish.
            </p>
            <Countdown targetIso={BIRTHDAY_ISO} />
          </header>

          <main className="max-w-4xl mx-auto px-4 pb-12">
            <section className="my-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-5 shadow"
              >
                <h2 className="text-xl font-semibold text-pink-700">
                  A glimpse of my collection
                </h2>
                <p className="text-sm text-gray-500">
                  Just letting you know how beautiful you are and why I remain
                  in awe of you.
                </p>
                <Gallery />
              </motion.div>
            </section>

            {/* <section className="my-6">
          <div className="bg-white rounded-2xl p-5 shadow">
            <h2 className="text-xl font-semibold text-pink-700">
              Memories Timeline
            </h2>
            <Memories />
          </div>
        </section> */}

            <section className="my-6">
              <div className="bg-white rounded-2xl p-5 shadow">
                <h2 className="text-xl font-semibold text-pink-700">
                  A Message for You
                </h2>
                <Messages />
              </div>
            </section>

            <section className="my-6">
              <div className="bg-white rounded-2xl p-5 shadow">
                <h2 className="text-xl font-semibold text-pink-700">
                  Reasons I Love You
                </h2>
                <Reasons />
              </div>
            </section>

            <section className="my-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-5 shadow"
              >
                <h2 className="text-xl font-semibold text-pink-700">
                  A few reasons to remain togerher forever
                </h2>
                <Gallery2 />
              </motion.div>
              </section>

            <footer className="text-center mt-8 text-xs text-gray-500">
              Made with ❤️ by Pucchu.
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
