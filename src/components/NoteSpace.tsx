import React, { useState } from 'react'
import { useTodoStore } from '../strore/store'
import { Card } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import truncateText from '../utils/truncateText'
import NoteDetails from './NoteDetails'
import InputForm from './InputForm'
import { Note } from '../types/types'
import MarkdownRenderer from './MarkdownRenderer'

const NoteSpace: React.FC = () => {
  const todos = useTodoStore((state) => state.todos)
  const deleteTodo = useTodoStore((state) => state.deleteTodo)
  const [selectedTodo, setSelectedTodo] = useState<Note | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleCardClick = (todo: Note) => {
    setSelectedTodo(todo)
  }

  const handleDeleteClick = (id: string) => {
    if (selectedTodo?.id === id) {
      setSelectedTodo(null)
    }
    deleteTodo(id)
  }

  const handleEditClick = (todo: Note) => {
    setSelectedTodo(todo)
    setIsEditing(true)
  }

  const handleCloseDetails = () => {
    setSelectedTodo(null)
    setIsEditing(false)
  }

  return (
    <div className='mb-24 columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-5'>
      {todos.map((todo) => (
        <Card
          bordered={false}
          key={todo.id}
          actions={[
            <EditOutlined
              key='edit'
              onClick={(e) => {
                e.stopPropagation() // Prevent card click event
                handleEditClick(todo)
              }}
            />,
            <DeleteOutlined
              key='delete'
              onClick={(e) => {
                e.stopPropagation() // Prevent card click event
                handleDeleteClick(todo.id)
              }}
            />
          ]}
          title={truncateText(todo.title, 20)}
          className='shadow-input mb-4 cursor-pointer break-inside-avoid bg-[#f9f9f9] font-extrabold'
          onClick={() => handleCardClick(todo)}
        >
          <MarkdownRenderer>{truncateText(todo.content, 300)}</MarkdownRenderer>
        </Card>
      ))}
      {selectedTodo && !isEditing && (
        <NoteDetails todo={selectedTodo} onClose={handleCloseDetails} />
      )}
      {isEditing && (
        <InputForm
          initialValues={selectedTodo}
          onClose={handleCloseDetails}
          isEditing={isEditing}
        />
      )}
    </div>
  )
}

export default NoteSpace
