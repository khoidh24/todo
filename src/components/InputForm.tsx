import React, { useState, useRef, useEffect } from 'react'
import { Form, Input } from 'antd'
import { FormProps } from 'antd'
import { useTodoStore } from '../strore/store'

const { TextArea } = Input

interface FormFields {
  title: string
  content: string
}

const InputForm: React.FC = () => {
  const [form] = Form.useForm<FormFields>()
  const [isExpanded, setIsExpanded] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleSave = () => {
    const { title, content } = form.getFieldsValue()
    const trimmedTitle = (title ?? '').trim()
    const trimmedContent = (content ?? '').trim()

    if (trimmedTitle !== '' || trimmedContent !== '') {
      addTodo(title, content)
      form.resetFields()
    }
    setIsExpanded(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        handleSave()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleFocus = () => {
    setIsExpanded(true)
  }

  const onFinish: FormProps<FormFields>['onFinish'] = (values) => {
    const trimmedTitle = values.title?.trim()
    const trimmedContent = values.content?.trim()

    if (trimmedTitle !== '' || trimmedContent !== '') {
      addTodo(trimmedTitle || '', trimmedContent || '')
      form.resetFields()
    }
    setIsExpanded(false)
  }

  return (
    <section className='relative h-[100px] w-full'>
      <div
        ref={formRef}
        className='absolute left-[50%] h-auto w-[500px] -translate-x-1/2 transform overflow-hidden rounded-lg bg-white shadow-md'
      >
        <Form form={form} onClick={handleFocus} onFinish={onFinish}>
          {isExpanded && (
            <Form.Item name='title' className='mb-0'>
              <Input
                className='form-input text-lg font-bold'
                placeholder='Title'
              />
            </Form.Item>
          )}
          <Form.Item name='content' className='mb-0'>
            <TextArea
              className='form-input'
              placeholder='Take a note...'
              autoSize={{ minRows: isExpanded ? 3 : 1 }}
            />
          </Form.Item>
        </Form>
      </div>
    </section>
  )
}

export default InputForm
