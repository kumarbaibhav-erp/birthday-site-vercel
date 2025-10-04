import React, { useState } from "react"

const REASONS = [
  "You make ordinary days special 💫",
  "You smell like home",
  "You make even silence feel comfortable",
  "You know how to calm me down",
  "You remind me to take care of myself",
  "You forgive me even when I’m dumb",
  "You make me feel lucky every single day",
  "You’re my safe place",
  "You look beautiful when you’re mad",
  "You make car rides feel like adventures",
  "You fall asleep on calls with me",
  "You hold my hand like it’s the only one",
  "You look cute even when sleepy",
  "You love dogs as much as I do",
  "You remind me what really matters",
  "You listen to my nonsense stories",
  "You make my world brighter",
  "You make waiting worth it",
  "You bring warmth to my cold days",
  "You give me reasons to dream",
  "You’re the best part of my day",
  "You make me believe in love more every day",
  "You’re simply… you. And that’s perfect 💖",
]

export default function Reasons() {
  const [index, setIndex] = useState(0)

  const nextReason = () => {
    setIndex((prev) => (prev + 1) % REASONS.length)
  }

  return (
    <div className="mt-4 bg-pink-50 rounded-xl p-6 text-center shadow-lg">
      <div className="text-gray-700 italic text-lg transition-all duration-500">
        "{REASONS[index]}"
      </div>
      <button
        onClick={nextReason}
        className="mt-4 text-sm bg-gradient-to-r from-pink-500 to-red-400 text-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-all"
      >
        Next reason ❤️
      </button>
    </div>
  )
}
