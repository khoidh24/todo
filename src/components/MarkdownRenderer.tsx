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
import { EditorContent, useEditor } from '@tiptap/react'
import Bold from '@tiptap/extension-bold'
import { Markdown } from 'tiptap-markdown'
import History from '@tiptap/extension-history'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { useEffect } from 'react'

interface MarkdownRendererProps {
  content: string
  className?: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = ''
}) => {
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
    content,
    editable: false
  })

  useEffect(() => {
    editor?.commands.setContent(content)
  }, [content, editor])

  return (
    <div
      className={`ProseMirror prose prose-sm max-w-none overflow-hidden text-inherit ${className}`}
    >
      <EditorContent editor={editor} />
    </div>
  )
}

export default MarkdownRenderer
