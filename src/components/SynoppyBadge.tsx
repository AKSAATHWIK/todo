'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SynoppyBadge() {
  return (
    <Link
      href="https://synoppy.com"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white/95 dark:bg-gray-900/95 shadow-lg rounded-xl px-3 py-2 flex items-center gap-2 border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
      >
        <img
          src="https://raw.githubusercontent.com/Saanora-Tech/synoppy-logo/refs/heads/main/logo.png"
          alt="Synoppy"
          className="w-4 h-4"
        />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Built with Synoppy</span>
      </motion.div>
    </Link>
  )
}