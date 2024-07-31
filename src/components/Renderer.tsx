import React, { useRef, useEffect } from 'react'
import { FormInstance } from 'antd'
import { EditorContent, useEditor } from '@tiptap/react'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Blockquote from '@tiptap/extension-blockquote'
import Placeholder from '@tiptap/extension-placeholder'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import Strike from '@tiptap/extension-strike'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Highlight from '@tiptap/extension-highlight'
import Color from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import Text from '@tiptap/extension-text'
import Document from '@tiptap/extension-document'
import Bold from '@tiptap/extension-bold'
import { Markdown } from 'tiptap-markdown'
import History from '@tiptap/extension-history'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Toolbar from './Toolbar'

interface ContentEditorProps {
  initialValues?: { content: string } | undefined | null
  onUpdate: (content: string) => void
  form: FormInstance
}

const Renderer: React.FC<ContentEditorProps> = ({
  initialValues,
  onUpdate,
  form
}) => {
  const toolbarRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: [
      Document,
      Text,
      Heading,
      Paragraph,
      Blockquote,
      HorizontalRule,
      Placeholder.configure({ placeholder: 'Text something...' }),
      Code,
      CodeBlock.configure({}),
      Italic,
      Link,
      Strike,
      TextStyle,
      Underline,
      Highlight,
      BulletList,
      ListItem,
      Color,
      Image,
      Bold,
      Markdown.configure({
        html: true,
        tightLists: true,
        tightListClass: 'tight',
        bulletListMarker: '-',
        linkify: false,
        breaks: false,
        transformPastedText: false,
        transformCopiedText: false
      }),
      History.configure({
        depth: 20,
        newGroupDelay: 1000
      }),
      TaskList,
      TaskItem.configure({
        nested: false,
        HTMLAttributes: {
          class: 'flex items-start my-1'
        }
      })
    ],
    content: initialValues?.content || '',
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML())
    }
  })

  useEffect(() => {
    editor?.commands.setContent(initialValues?.content || '')
  }, [initialValues, editor])

  return (
    <div className='form-input min-h[2em] relative max-h-[44em] w-full overflow-auto bg-[#f9f9f9] py-0 hover:bg-[#f9f9f9] focus:bg-[#f9f9f9] focus:outline-none'>
      <EditorContent editor={editor} className='ProseMirror prose prose-sm' />
      <div ref={toolbarRef} className='h-[62px] w-full'>
        <Toolbar editor={editor} />
      </div>
    </div>
  )
}

export default Renderer
