import { Mark, mergeAttributes } from '@tiptap/core'

export interface AltusTextOptions {
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    altusText: {
      /**
       * Set a altusText mark
       */
      setAltusText: (attributes?: { class: string }) => ReturnType,

      toggleAltusText: (attributes?: { class: string }) => ReturnType,

      unsetAltusText: () => ReturnType,

    }
  }
}

export const AltusText = Mark.create<AltusTextOptions>({
  name: 'altusText',

  addOptions() {
    return {
      HTMLAttributes: {
        class: null,
      },
    }
  },

  addAttributes() {
    return {
      class: {
        default: this.options.HTMLAttributes.class,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setAltusText: (attributes) => ({ commands }) => {
        return commands.setMark(this.name, attributes)
      },
      toggleAltusText: (attributes) => ({ commands }) => {
        return commands.toggleMark(this.name, attributes, { extendEmptyMarkRange: true })
      },
      unsetAltusText: () => ({ commands }) => {
        return commands.unsetMark(this.name, { extendEmptyMarkRange: true })
      },
    }
  },

  // addKeyboardShortcuts() {
  //   return {
  //     'Mod-b': () => this.editor.commands.toggleBold(),
  //     'Mod-B': () => this.editor.commands.toggleBold(),
  //   }
  // },

})