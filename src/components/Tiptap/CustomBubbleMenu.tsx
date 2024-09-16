import React from 'react'
import { BubbleMenu, useCurrentEditor } from '@tiptap/react'

const CustomBubbleMenu = () => {
  const { editor } = useCurrentEditor()
  return (
    <>
      {editor && <BubbleMenu className='bubble-menu' tippyOptions={{ duration: 100 }} editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          Underline
        </button>
      </BubbleMenu>}
    </>
  )
}

export default CustomBubbleMenu