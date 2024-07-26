import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import 'highlight.js/styles/github.css'

interface MarkdownRendererProps {
  children: string
  className?: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  children,
  className = ''
}) => {
  return (
    <ReactMarkdown
      className={`prose prose-sm max-w-none overflow-hidden text-inherit ${className}`}
      rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
      remarkPlugins={[remarkGfm]}
      urlTransform={(uri) => (uri.startsWith('http') ? uri : `http://${uri}`)}
      children={children}
      components={{
        a: ({ children, href, ...props }) => (
          <a href={href} target='_blank' rel='noopener noreferrer' {...props}>
            {children}
          </a>
        ),
        img: ({ src, alt, ...props }) => (
          <img src={src} alt={alt} {...props} className='max-w-full' />
        )
      }}
    />
  )
}

export default MarkdownRenderer
