import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Form, Input } from 'antd'
import { useTodoStore } from '../store/store'
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
import Toolbar from './Toolbar'
import Color from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import Text from '@tiptap/extension-text'
import Document from '@tiptap/extension-document'
import { EditorContent, useEditor } from '@tiptap/react'
import Bold from '@tiptap/extension-bold'
import { Markdown } from 'tiptap-markdown'
import History from '@tiptap/extension-history'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'

interface FormFields {
  id?: string
  title: string
  content: string
}

interface InputFormProps {
  initialValues?: FormFields | null
  onClose?: () => void
  isEditing?: boolean
}

const InputForm: React.FC<InputFormProps> = ({
  initialValues,
  onClose,
  isEditing
}) => {
  const [form] = Form.useForm<FormFields>()
  const [isExpanded, setIsExpanded] = useState(!!initialValues)
  const formRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const addTodo = useTodoStore((state) => state.addTodo)
  const editTodo = useTodoStore((state) => state.editTodo)

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
        html: true, // Allow HTML input/output
        tightLists: true, // No <p> inside <li> in markdown output
        tightListClass: 'tight', // Add class to <ul> allowing you to remove <p> margins when tight
        bulletListMarker: '-', // <li> prefix in markdown output
        linkify: false, // Create links from "https://..." text
        breaks: false, // New lines (\n) in markdown input are converted to <br>
        transformPastedText: false, // Allow to paste markdown text in the editor
        transformCopiedText: false // Copied text is transformed to markdown
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
      form.setFieldsValue({ content: editor.getHTML() })
    }
  })

  const handleSave = useCallback(() => {
    const { title } = form.getFieldsValue()
    const content = editor?.getHTML() || ''
    const trimmedTitle = (title ?? '').trim()
    const trimmedContent = content.trim()

    if (
      trimmedTitle !== '' ||
      (trimmedContent !== '' && editor?.getText().trim().length)
    ) {
      const id = initialValues?.id || Date.now().toString()
      if (initialValues?.id) {
        editTodo(id, trimmedTitle, trimmedContent)
      } else {
        addTodo(trimmedTitle, trimmedContent)
      }
      form.resetFields()
      editor?.commands.setContent('')
    }
    setIsExpanded(false)
    if (onClose) {
      onClose()
    }
  }, [addTodo, editTodo, form, initialValues, onClose, editor])

  useEffect(() => {
    form.setFieldsValue({ title: initialValues?.title || '' })
    editor?.commands.setContent(initialValues?.content || '')
  }, [form, initialValues, editor])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node) &&
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target as Node) &&
        !isElementInToolbar(event.target as HTMLElement)
      ) {
        handleSave()
      }
    }

    const isElementInToolbar = (element: HTMLElement): boolean => {
      let currentElement = element
      while (currentElement) {
        if (currentElement.classList.contains('ant-select-dropdown')) {
          return true
        }
        currentElement = currentElement.parentElement as HTMLElement
      }
      return false
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleSave])

  const handleFocus = () => {
    setIsExpanded(true)
  }

  return (
    <section className='relative h-[100px] w-full'>
      {isExpanded && <div className='fixed inset-0 z-20 bg-black/50' />}
      <div
        ref={formRef}
        className={`${isEditing || isExpanded ? 'shadow-none' : 'shadow-input'} ${isEditing ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : 'absolute left-[50%] -translate-x-1/2'} z-20 h-auto w-full max-w-3xl transform overflow-hidden rounded-lg bg-[#f9f9f9]`}
      >
        <Form form={form} onClick={handleFocus}>
          {isExpanded && (
            <Form.Item name='title' className='mb-0'>
              <Input
                className='form-input bg-[#f9f9f9] text-lg font-bold hover:bg-[#f9f9f9] focus:bg-[#f9f9f9] focus:outline-none'
                placeholder='Title'
              />
            </Form.Item>
          )}
          <div className='form-input min-h[2em] relative max-h-[44em] w-full overflow-auto bg-[#f9f9f9] py-0 hover:bg-[#f9f9f9] focus:bg-[#f9f9f9] focus:outline-none'>
            <EditorContent
              editor={editor}
              className='ProseMirror prose prose-sm'
            />
            {isExpanded && (
              <div ref={toolbarRef} className='h-[62px] w-full'>
                <Toolbar editor={editor} />
              </div>
            )}
          </div>
        </Form>
      </div>
    </section>
  )
}

export default InputForm
