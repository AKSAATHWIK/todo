import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

interface TodoStore {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  editTodo: (id: string, text: string) => void
}

export const useTodoStore = create<TodoStore>()(persist(
  (set) => ({
    todos: [],

    addTodo: (text: string) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: Date.now()
      }
      set((state: TodoStore) => ({
        todos: [newTodo, ...state.todos]
      }))
    },

    toggleTodo: (id: string) => {
      set((state: TodoStore) => ({
        todos: state.todos.map((todo: Todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      }))
    },

    deleteTodo: (id: string) => {
      set((state: TodoStore) => ({
        todos: state.todos.filter((todo: Todo) => todo.id !== id)
      }))
    },

    editTodo: (id: string, text: string) => {
      set((state: TodoStore) => ({
        todos: state.todos.map((todo: Todo) =>
          todo.id === id ? { ...todo, text } : todo
        )
      }))
    }
  }),
  { name: 'todo-storage' }
))