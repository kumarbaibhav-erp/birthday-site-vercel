import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export default function Countdown({ targetIso }: { targetIso: string }) {
  const target = dayjs(targetIso)
  const [now, setNow] = useState(dayjs())

  useEffect(() => {
    const t = setInterval(() => setNow(dayjs()), 1000)
    return () => clearInterval(t)
  }, [])

  const diff = target.diff(now)
  if (diff <= 0) return <div className="mt-4 text-lg font-semibold text-pink-600">It's midnight — Happy Birthday! 🎂</div>

  const sec = Math.floor(diff / 1000) % 60
  const min = Math.floor(diff / 60000) % 60
  const hrs = Math.floor(diff / 3600000) % 24
  const days = Math.floor(diff / 86400000)

  return (
    <div className="mt-4 inline-flex gap-3 items-center text-center">
      {[['Days', days], ['Hrs', hrs], ['Min', min], ['Sec', sec]].map(([label, value]) => (
        <div key={String(label)} className="bg-white px-3 py-2 rounded-lg shadow-sm">
          <div className="text-xl font-bold text-pink-600">{value}</div>
          <div className="text-xs text-gray-500">{label}</div>
        </div>
      ))}
    </div>
  )
}
