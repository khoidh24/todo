import React from 'react'
import { Card } from 'antd'
import { Note } from '../types/types'
import MarkdownRenderer from './MarkdownRenderer'

interface NoteDetailsProps {
  todo: Note
  onClose: () => void
}

const NoteDetails: React.FC<NoteDetailsProps> = ({ todo, onClose }) => {
  return (
    <div
      className='fixed inset-0 z-30 flex items-center justify-center bg-black/50'
      onClick={onClose}
    >
      <Card
        title={todo.title}
        className='w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg sm:mx-4 md:mx-4 lg:mx-auto'
        onClick={(e) => e.stopPropagation()} // Prevent onClose when clicking inside the card
      >
        <MarkdownRenderer>{todo.content}</MarkdownRenderer>
      </Card>
    </div>
  )
}

export default NoteDetails
