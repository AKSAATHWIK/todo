'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Trash2, Edit2, X } from 'lucide-react'
import { useTodoStore } from '@/store/todoStore'

interface TodoItemProps {
  id: string
  text: string
  completed: boolean
}

export default function TodoItem({ id, text, completed }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editText, setEditText] = useState<string>(text)
  const { toggleTodo, deleteTodo, editTodo } = useTodoStore()

  const handleEdit = () => {
    if (editText.trim()) {
      editTodo(id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      setEditText(text)
      setIsEditing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="group flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => toggleTodo(id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
          completed
            ? 'bg-blue-500 border-blue-500'
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
        }`}
      >
        {completed && <Check className="w-4 h-4 text-white" />}
      </motion.button>

      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEdit}
            autoFocus
            className="flex-1 px-3 py-1 bg-gray-50 dark:bg-gray-700 border border-blue-300 dark:border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setEditText(text)
              setIsEditing(false)
            }}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
          >
            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </motion.button>
        </div>
      ) : (
        <span
          className={`flex-1 text-gray-900 dark:text-white transition-all duration-300 ${
            completed ? 'line-through text-gray-400 dark:text-gray-500' : ''
          }`}
        >
          {text}
        </span>
      )}

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {!isEditing && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsEditing(true)}
            className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg cursor-pointer transition-colors duration-200"
          >
            <Edit2 className="w-4 h-4 text-blue-500" />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => deleteTodo(id)}
          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg cursor-pointer transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </motion.button>
      </div>
    </motion.div>
  )
}