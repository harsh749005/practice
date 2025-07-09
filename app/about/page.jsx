"use client"

import Link from "next/link"

const about = () => {
  return (
    <div className="h-screen w-screen bg-black">
      <p className="text-white text-2xl">About Page</p>
        <Link href="/contact" className="text-blue-400">Contact</Link>
    </div>
  )
}

export default about
