import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ContentfulBlockCard from '../ContentfulBlockCard'

export const ReactBlockComponent = Node.create({
  name: 'reactBlockComponent',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      sys: {
        id: null,
        type: null,
        linkType: null,
        typeName: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'react-block-component',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['react-block-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ContentfulBlockCard)
  },
})