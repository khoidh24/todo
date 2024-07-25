import React from 'react'
import { Note } from '../types/types'

interface NoteItemProps {
  note: Note
  onEdit: (note: Note) => void
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit }) => (
  <div className='rounded border p-4 shadow' onClick={() => onEdit(note)}>
    <h3 className='text-lg font-bold'>{note.title}</h3>
    <p>{note.content}</p>
  </div>
)

export default NoteItem
