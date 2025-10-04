import React from 'react'
import { motion } from 'framer-motion'

const ITEMS = [
  { year: '2021-03', title: 'First roadtrip', desc: 'That rainy day when we sang in the car.' },
  { year: '2022-07', title: 'Beach sunset', desc: 'You collected seashells and laughed.' },
  { year: '2023-12', title: 'Festival night', desc: 'Lights, music and us dancing.' },
]

export default function Memories(){
  return (
    <div className="mt-4 space-y-4">
      {ITEMS.map((it, i)=>(
        <motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={{ x:0, opacity:1 }} transition={{ delay: i*0.12 }} className="p-3 bg-pink-50 rounded-lg">
          <div className="text-xs text-pink-600 font-semibold">{it.year}</div>
          <div className="font-medium">{it.title}</div>
          <div className="text-sm text-gray-600">{it.desc}</div>
        </motion.div>
      ))}
    </div>
  )
}
