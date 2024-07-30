import { persist, createJSONStorage } from 'zustand/middleware'
import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { Note } from '../types/types'

interface TodoStore {
  todos: Note[]
  addTodo: (title: string, content: string) => void
  editTodo: (id: string, title: string, content: string) => void
  deleteTodo: (id: string) => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (title: string, content: string) =>
        set((state) => ({
          todos: [{ id: uuidv4(), title, content }, ...state.todos]
        })),
      editTodo: (id: string, title: string, content: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, title, content } : todo
          )
        })),
      deleteTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id)
        }))
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
