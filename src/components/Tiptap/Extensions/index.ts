import { Color } from '@tiptap/extension-color'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import { ReactBlockComponent } from './Nodes/BlockComponent'
import { ReactInlineComponent } from './Nodes/InlineComponent'
import Underline from '@tiptap/extension-underline'
import { Link } from '@tiptap/extension-link'
import { TextAlign } from '@tiptap/extension-text-align'
import { AltusText } from './Nodes/AltusText'
import { Highlight } from '@tiptap/extension-highlight'
import { TextStyle } from '@tiptap/extension-text-style'
import { AltusDiv } from './Nodes/AltusDiv'

const HyperLink = Link.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      entity: {},
    }
  },
})
export const extensions = [
  Color.configure({ types: [TextStyle.name] }),
  TextStyle.configure({
    types: [],
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: false,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  ReactBlockComponent,
  ReactInlineComponent,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  Underline,
  HyperLink.configure({
    autolink: false,
    openOnClick: false,
    HTMLAttributes: {
      rel: null,
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  AltusText,
  Highlight.configure({
    multicolor: true,
  }),
  AltusDiv,
]