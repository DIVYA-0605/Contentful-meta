import { EditorAppSDK } from '@contentful/app-sdk'
import { Editor } from '@tiptap/react'

/**
 * A function that adds an entry to the WYSIWYG editor
 * @param isBlockEntry - Boolean to check if the entry is block or inline
 * @param editor
 * @param sdk
 */
export async function addEntry(
  isBlockEntry: boolean,
  editor: Editor,
  sdk: EditorAppSDK,
) {
  const selectedEntry = await sdk.dialogs.selectSingleEntry()
  if (!selectedEntry) return
  const { id, type, contentType } = selectedEntry.sys

  editor
    .chain()
    .focus()
    .insertContent({
      type: isBlockEntry ? 'reactBlockComponent' : 'reactInlineComponent',
      attrs: {
        sys: { id, type: isBlockEntry ? 'BlockEntry' : 'InlineEntry', linkType: type, typeName: contentType.sys.id },
        //@ts-ignore
        // entryFields: selectedEntry.fields, //@todo: filter fields according to locale, currently getting all fields.
        // entryTitle: selectedEntry?.fields?.internalName['en-CA'],
        // entryId: selectedEntry?.sys?.id,
        // contentType: selectedEntry?.sys.contentType.sys.id,
        // status: selectedEntry?.sys.publishedAt
        //   // if publishedAt and updatedAt are the same, then the entry is published
        //   ? selectedEntry?.sys.publishedAt === selectedEntry?.sys.updatedAt
        //     ? 'published'
        //     : 'changed'
        //   : 'draft',
        // title: selectedEntry?.fields?.internalName['en-CA'],
      },
    })
    .run()
}


export function getSelectedText(editor: Editor | null) {
  const { from, to } = editor?.state.selection
  const selectedText = editor?.state.doc.textBetween(from, to)
  return selectedText
}

export function getSelectedHTML(editor: Editor | null) {
  const { from, to } = editor?.view.state.selection
  const { dom } = editor?.view
  const range = document.createRange()

  const start = editor?.view.domAtPos(from)
  range.setStart(start.node, start.offset)

  const end = editor?.view.domAtPos(to)
  range.setEnd(end.node, end.offset)

  const fragment = range.cloneContents()
  const div = document.createElement('div')
  div.appendChild(fragment)

  const selectedHTML = div.innerHTML
  return selectedHTML
}

// Wrap selected text with a span tag and apply a class
export function wrapSelectedTextWithDiv(editor: Editor | null, className: string) {
  const selection = editor?.view.state.selection
  // get range from selection

  const range = selection?.$from.blockRange(selection.$to)
  // if (range) {
  //
  //   const tr = editor?.view.state.tr.wrap(range, editor?.view.state.schema.nodes.div.create())
  //   editor?.view.dispatch(tr)
  // }
  //
}