import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import HardBreak from '@tiptap/extension-hard-break'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import BlockQuote from '@tiptap/extension-blockquote'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'

interface ContentRendererProps {
  content: string
  onUpdate: (content: string) => void
}

const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  onUpdate
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        codeBlock: false
      }),
      Bold,
      Italic,
      Strike,
      Underline,
      Code,
      CodeBlock,
      BulletList,
      OrderedList,
      ListItem,
      HardBreak,
      HorizontalRule,
      Link,
      Image,
      BlockQuote,
      Typography,
      Placeholder.configure({
        placeholder: 'Create a text...'
      })
    ],
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML())
    }
  })

  return (
    <EditorContent
      editor={editor}
      className='form-input prose bg-[#f9f9f9] py-0'
    />
  )
}

export default ContentRenderer
