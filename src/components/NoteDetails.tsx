import React from 'react'
import { Card, Typography } from 'antd'
import { Note } from '../types/types'
import MarkdownRenderer from './MarkdownRenderer'

const { Title } = Typography

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
        title={
          <Title className='italic' level={3}>
            {todo.title}
          </Title>
        }
        className='max-h-[80%] w-full max-w-2xl overflow-auto rounded-lg bg-white p-4 shadow-lg sm:mx-4 md:mx-4 lg:mx-auto'
        onClick={(e) => e.stopPropagation()} // Prevent onClose when clicking inside the card
      >
        <MarkdownRenderer className='overflow-y-auto' content={todo.content} />
      </Card>
    </div>
  )
}

export default NoteDetails
