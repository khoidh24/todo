import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Form, Input } from 'antd'
import { useTodoStore } from '../strore/store'

const { TextArea } = Input

interface FormFields {
  id?: string
  title: string
  content: string
}

interface InputFormProps {
  initialValues?: FormFields | null
  onClose: () => void
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
  const addTodo = useTodoStore((state) => state.addTodo)
  const editTodo = useTodoStore((state) => state.editTodo)

  const handleSave = useCallback(() => {
    const { title, content } = form.getFieldsValue()
    const trimmedTitle = (title ?? '').trim()
    const trimmedContent = (content ?? '').trim()

    if (trimmedTitle !== '' || trimmedContent !== '') {
      if (initialValues?.id) {
        editTodo(initialValues.id, title, content)
      } else {
        addTodo(title, content)
      }
      form.resetFields()
    }
    setIsExpanded(false)
    if (onClose) {
      onClose()
    }
  }, [addTodo, editTodo, form, initialValues, onClose])

  useEffect(() => {
    form.setFieldsValue(initialValues || { title: '', content: '' })
  }, [form, initialValues])

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
  }, [handleSave])

  const handleFocus = () => {
    setIsExpanded(true)
  }

  return (
    <section className='relative h-[100px] w-full'>
      {isExpanded && <div className='fixed inset-0 z-20 bg-black/50' />}
      <div
        ref={formRef}
        className={`${isEditing || isExpanded ? 'shadow-none' : 'shadow-input'} ${isEditing ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : 'absolute left-[50%] -translate-x-1/2'} z-20 h-auto w-full max-w-xl transform overflow-hidden rounded-lg bg-[#f9f9f9]`}
      >
        <Form form={form} onClick={handleFocus}>
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
              className='form-input bg-[#f9f9f9]'
              placeholder='Take a note...'
              autoSize={{ minRows: isExpanded ? 3 : 1, maxRows: 25 }}
            />
          </Form.Item>
        </Form>
      </div>
    </section>
  )
}

export default InputForm
