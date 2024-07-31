import React, { useState } from 'react'
import { Button, Tooltip, Select, Modal, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Editor } from '@tiptap/react'
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  ListVideo,
  Palette,
  Strikethrough,
  Underline,
  Image,
  ListTodo
} from 'lucide-react'

interface ToolbarProps {
  editor: Editor | null
}

interface Tool {
  icon: React.ReactNode
  title: string
  action: () => void
  isActive: () => boolean
  className?: string
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const [currentColor, setCurrentColor] = useState('#000000')
  const [currentHeading, setCurrentHeading] = useState('paragraph')
  const [codeLanguage, setCodeLanguage] = useState('plaintext')
  const [uploadModalVisible, setUploadModalVisible] = useState(false)

  const headingOptions = [
    { value: 'paragraph', label: 'Paragraph', icon: null },
    { value: 'h1', label: 'Heading 1', icon: <Heading1 /> },
    { value: 'h2', label: 'Heading 2', icon: <Heading2 /> },
    { value: 'h3', label: 'Heading 3', icon: <Heading3 /> },
    { value: 'h4', label: 'Heading 4', icon: <Heading4 /> },
    { value: 'h5', label: 'Heading 5', icon: <Heading5 /> },
    { value: 'h6', label: 'Heading 6', icon: <Heading6 /> }
  ]

  const languageOptions = [
    { value: 'plaintext', label: 'Plain Text' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' }
  ]

  if (!editor) {
    return null
  }

  const tools: Tool[] = [
    {
      icon: <Palette color={currentColor} size={16} />,
      title: 'Color',
      action: () => {
        const input = document.createElement('input')
        input.type = 'color'
        input.value = currentColor
        input.onchange = (event) => {
          const newColor = (event.target as HTMLInputElement).value
          setCurrentColor(newColor)
          editor.chain().focus().setColor(newColor).run()
        }
        input.click()
      },
      isActive: () => editor.isActive('textStyle', { color: currentColor })
    },
    {
      icon: (
        <Bold color={editor.isActive('bold') ? 'green' : '#000'} size={16} />
      ),
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold')
    },
    {
      icon: (
        <Italic
          color={editor.isActive('italic') ? 'green' : '#000'}
          size={16}
        />
      ),
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic')
    },
    {
      icon: (
        <Underline
          color={editor.isActive('underline') ? 'green' : '#000'}
          size={16}
        />
      ),
      title: 'Underline',
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: () => editor.isActive('underline')
    },
    {
      icon: (
        <Strikethrough
          color={editor.isActive('strike') ? 'green' : '#000'}
          size={16}
        />
      ),
      title: 'Strikethrough',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike')
    },
    {
      icon: (
        <ListOrdered
          color={editor.isActive('orderedList') ? 'green' : '#000'}
          size={16}
        />
      ),
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList')
    },
    {
      icon: (
        <List
          color={editor.isActive('bulletList') ? 'green' : '#000'}
          size={16}
        />
      ),
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList')
    },
    {
      icon: (
        <ListVideo
          color={editor.isActive('listItem') ? 'green' : '#000'}
          size={16}
        />
      ),
      title: 'Sink List',
      action: () => editor.chain().focus().sinkListItem('listItem').run(),
      isActive: () => editor.isActive('listItem')
    },
    {
      icon: (
        <ListTodo
          color={editor.isActive('taskList') ? 'green' : '#000'}
          size={16}
        />
      ),
      title: 'Todo List',
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive('taskList')
    },
    {
      icon: (
        <Code
          color={editor.isActive('codeBlock') ? 'green' : '#000'}
          size={16}
        />
      ),
      title: 'Code',
      action: () =>
        editor.chain().focus().setCodeBlock({ language: codeLanguage }).run(),
      isActive: () => editor.isActive('codeBlock')
    },
    {
      icon: <Image size={16} />,
      title: 'Insert Image',
      action: () => {
        setUploadModalVisible(true)
      },
      isActive: () => false
    }
  ]

  const handleHeadingChange = (value: string) => {
    setCurrentHeading(value)
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run()
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({
          level: parseInt(value.slice(1)) as 1 | 2 | 3 | 4 | 5 | 6
        })
        .run()
    }
  }

  const handleUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      editor.chain().focus().setImage({ src: result }).run()
      setUploadModalVisible(false)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className='py-1` fixed bottom-0 left-0 z-30 flex w-full items-center gap-2 justify-self-start bg-white px-2'>
      <Select
        value={currentHeading}
        onChange={handleHeadingChange}
        className='w-[150px]'
        size='small'
        options={headingOptions.map((option) => ({
          value: option.value,
          label: (
            <div className='flex items-center'>
              {option.icon && <span className='mr-2'>{option.icon}</span>}
              {option.label}
            </div>
          )
        }))}
      />
      {tools.map((tool, index) => (
        <Tooltip key={index} title={tool.title}>
          <Button
            icon={tool.icon}
            onClick={tool.action}
            className={`${tool.className} border-none`}
          />
        </Tooltip>
      ))}
      <Select
        value={codeLanguage}
        onChange={(value) => setCodeLanguage(value)}
        options={languageOptions}
        size='small'
        className={`${editor.isActive('codeBlock') ? 'block' : 'hidden'} w-[150px] text-xs`}
      />
      <Modal
        open={uploadModalVisible}
        title='Insert Image'
        onCancel={() => setUploadModalVisible(false)}
        footer={null}
      >
        <Upload
          beforeUpload={(file) => {
            handleUpload(file)
            return false
          }}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Modal>
    </div>
  )
}

export default Toolbar
