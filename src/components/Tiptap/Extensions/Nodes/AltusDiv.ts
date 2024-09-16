import { mergeAttributes, Node } from '@tiptap/core'

export interface AltusDivOptions {
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    altusDiv: {
      /**
       * Toggle a altusDiv node
       */
      setAltusDiv: (attributes?: { class: string }) => ReturnType,

      unsetAltusDiv: () => ReturnType,

    }
  }
}

export const AltusDiv = Node.create<AltusDivOptions>({

  name: 'altusDiv',

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


  content: 'block+',

  group: 'block',

  parseHTML() {
    return [
      { tag: 'div' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setAltusDiv: (attributes) => ({ commands }) => {
        return commands.wrapIn(this.name, attributes)
      },
      unsetAltusDiv: () => ({ commands }) => {
        return commands.lift(this.name)
      },
    }
  },

  // addKeyboardShortcuts() {
  //   return {
  //     'Mod-Alt-0': () => this.editor.commands.setParagraph(),
  //   }
  // },
})