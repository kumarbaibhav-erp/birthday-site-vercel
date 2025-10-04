import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"

// 🎂 Cake with optional triangular slice cut out
const Cake = ({
  cut,
  showCandle,
  sliceRemoved,
}: {
  cut: boolean
  showCandle: boolean
  sliceRemoved: boolean
}) => {
  return (
    <motion.svg
      width="240"
      height="260"
      viewBox="0 0 240 260"
      className="drop-shadow-2xl"
    >
      {/* bottom tier */}
      <rect x="20" y="180" width="200" height="60" rx="10" fill="#ffb6c1" />
      {/* middle tier */}
      <rect x="50" y="120" width="140" height="60" rx="10" fill="#ff91a4" />
      {/* top tier */}
      <rect x="80" y="70" width="80" height="50" rx="10" fill="#ff6384" />

      {/* Triangular slice cut from top tier */}
      {cut && !sliceRemoved && (
        <motion.polygon
          points="120,70 150,120 90,120"
          fill="#ff6384"
          initial={{ y: 0 }}
          animate={{ y: -10 }}
        />
      )}

      {/* Slice flying out */}
      {sliceRemoved && (
        <motion.polygon
          points="120,70 150,120 90,120"
          fill="#ff6384"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -120, x: 100, rotate: 30, opacity: 0 }}
          transition={{ duration: 1 }}
        />
      )}

      {/* candle (only before click) */}
      {showCandle && (
        <>
          <rect x="115" y="30" width="10" height="40" rx="3" fill="#444" />
          <motion.circle
            cx="120"
            cy="25"
            r="8"
            fill="orange"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          />
        </>
      )}
    </motion.svg>
  )
}

// 🎉 Party popper SVG + animated burst
const Poppers = ({ trigger }: { trigger: boolean }) => {
  const pieces = Array.from({ length: 25 })
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* left popper */}
      <motion.div className="absolute bottom-20 left-10" initial={{ rotate: -30 }}>
        <svg width="60" height="80" viewBox="0 0 60 80">
          <polygon points="0,80 60,80 30,0" fill="#ff69b4" />
        </svg>
      </motion.div>

      {/* right popper */}
      <motion.div className="absolute bottom-20 right-10" initial={{ rotate: 30 }}>
        <svg width="60" height="80" viewBox="0 0 60 80">
          <polygon points="0,80 60,80 30,0" fill="#9370db" />
        </svg>
      </motion.div>

      {/* burst pieces */}
      {trigger &&
        pieces.map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-yellow-400 w-2 h-3 rounded-sm"
            initial={{ x: "50%", y: "100%", opacity: 1, rotate: 0 }}
            animate={{
              x: `${50 + (Math.random() - 0.5) * 400}%`,
              y: `${20 + Math.random() * -200}%`,
              opacity: 0,
              rotate: 360,
            }}
            transition={{ duration: 1.5, delay: i * 0.05 }}
          />
        ))}
    </div>
  )
}

// 🔪 Knife animation
const Knife = ({ visible }: { visible: boolean }) => {
  if (!visible) return null
  return (
    <motion.svg
      width="140"
      height="40"
      viewBox="0 0 140 40"
      className="absolute"
      initial={{ y: -200, x: 0, rotate: -20 }}
      animate={{ y: 100, x: 20, rotate: 15 }}
      transition={{ duration: 1 }}
    >
      <rect x="0" y="10" width="90" height="10" fill="silver" />
      <rect x="90" y="5" width="40" height="20" fill="#5a2d0c" rx="4" />
    </motion.svg>
  )
}

export default function OverlayCelebration({ onFinish }: { onFinish: () => void }) {
  const [started, setStarted] = useState(false)
  const [showKnife, setShowKnife] = useState(false)
  const [sliceRemoved, setSliceRemoved] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (started) {
      setShowKnife(true)

      // knife cuts, then remove slice
      setTimeout(() => {
        setShowKnife(false)
        setSliceRemoved(true)
      }, 1200)

      // show celebration after slice flies away
      const t = setTimeout(() => {
        setDone(true)
        setTimeout(() => onFinish(), 1000)
      }, 4000)

      return () => clearTimeout(t)
    }
  }, [started, onFinish])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Knife cutting animation */}
          {showKnife && <Knife visible={showKnife} />}

          {/* Birthday text appears centered */}
          {started && (
            <motion.h1
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="mb-6 text-5xl font-extrabold text-white drop-shadow-lg text-center"
            >
              Happy Birthday Psycho 💖
            </motion.h1>
          )}

          {/* Cake with slice animation */}
          <Cake cut={started} showCandle={!started} sliceRemoved={sliceRemoved} />

          {/* Button (only before click) */}
          {!started && (
            <motion.button
              onClick={() => setStarted(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-10 py-4 bg-gradient-to-r from-pink-500 via-red-400 to-pink-600 text-white rounded-full text-lg shadow-xl border border-pink-200 hover:shadow-2xl transition-all"
            >
              ❤️ Click for Surprise ❤️
            </motion.button>
          )}

          {/* Party effects */}
          {sliceRemoved && (
            <>
              <Poppers trigger={sliceRemoved} />
              <Confetti numberOfPieces={1200} recycle={false} />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
