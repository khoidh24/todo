import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { Note } from '../types/types'

interface TodoStore {
  todos: Note[]
  addTodo: (title: string, content: string) => void
  editTodo: (
    id: string,
    title: string,
    content: string,
    progress: 'pending' | 'working' | 'completed'
  ) => void
  deleteTodo: (id: string) => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (title: string, content: string) =>
        set((state) => ({
          todos: [
            { id: uuidv4(), title, content, progress: 'pending' as const },
            ...state.todos
          ]
        })),
      editTodo: (
        id: string,
        title: string,
        content: string,
        progress: 'pending' | 'working' | 'completed'
      ) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, title, content, progress } : todo
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
