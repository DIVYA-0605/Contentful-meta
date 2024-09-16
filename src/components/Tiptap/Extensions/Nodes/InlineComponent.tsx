import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ContentfulInlineCard } from '../ContentfulInlineCard'

export const ReactInlineComponent = Node.create({
  name: 'reactInlineComponent',

  group: 'inline',

  inline: true,

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
        tag: 'react-inline-component',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['react-inline-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ContentfulInlineCard, { as: 'span' })
  },
})