import React from 'react'
import { useTodoStore } from '../strore/store'

const NoteSpace: React.FC = () => {
  const todos = useTodoStore((state) => state.todos)

  return (
    <div className='mb-24 columns-2 gap-4 md:columns-3 lg:columns-5'>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className='mb-4 break-inside-avoid rounded border bg-white p-6 shadow-lg'
        >
          <h3 className='mb-4 bg-white text-xl font-bold'>{todo.title}</h3>
          <hr />
          <p className='mt-2 whitespace-pre-wrap bg-white text-sm'>
            {todo.content}
          </p>
        </div>
      ))}
    </div>
  )
}

export default NoteSpace
