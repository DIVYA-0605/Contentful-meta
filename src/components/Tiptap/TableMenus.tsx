import React, { useEffect, useRef } from 'react'
import { useCurrentEditor } from '@tiptap/react'
import { Menu } from '@contentful/f36-components'

type TableMenusProp = {
  contextMenuPosition: {
    x: number
    y: number
  },
  setShowContextMenu: (show: boolean) => void,
  showContextMenu: boolean
}
export const TableMenus = (props: TableMenusProp) => {
  const { editor } = useCurrentEditor()
  const { x, y } = props.contextMenuPosition
  const { showContextMenu, setShowContextMenu } = props

  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // @ts-ignore
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowContextMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!editor) {
    return null
  }

  return (
    <>
      {showContextMenu && editor.can().deleteTable() &&
        <div
          // ref={menuRef}
          style={{
            position: 'absolute',
            top: y,
            left: x,
          }}
        >
          <Menu isOpen={true}>
            <Menu.Trigger>
              <div></div>
            </Menu.Trigger>
            <Menu.List ref={menuRef}>
              <Menu.Item
                onClick={() => editor.chain().focus().addRowBefore().run()}
                isDisabled={!editor.can().addRowBefore()}
              >
                Add row above
              </Menu.Item>
              <Menu.Item
                onClick={() => editor.chain().focus().addRowAfter().run()}
                isDisabled={!editor.can().addRowAfter()}
              >
                Add row below
              </Menu.Item>
              <Menu.Item
                onClick={() => editor.chain().focus().addColumnBefore().run()}
                isDisabled={!editor.can().addColumnBefore()}
              >
                Add column left
              </Menu.Item>
              <Menu.Item
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                isDisabled={!editor.can().addColumnAfter()}
              >
                Add column right
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                onClick={() => editor.chain().focus().toggleHeaderRow().run()}
                isDisabled={!editor.can().toggleHeaderRow()}
              >
                Toggle header row
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                onClick={() => editor.chain().focus().deleteRow().run()}
                isDisabled={!editor.can().deleteRow()}
              >
                Delete row
              </Menu.Item>
              <Menu.Item
                onClick={() => editor.chain().focus().deleteColumn().run()}
                isDisabled={!editor.can().deleteColumn()}
              >
                Delete column
              </Menu.Item>
              <Menu.Item
                onClick={() => editor.chain().focus().deleteTable().run()}
                isDisabled={!editor.can().deleteTable()}
              >
                Delete table
              </Menu.Item>
            </Menu.List>
          </Menu>

          {/*<button*/}
          {/*  onClick={() => editor.chain().focus().addColumnAfter().run()}*/}
          {/*  disabled={!editor.can().addColumnAfter()}*/}
          {/*>*/}
          {/*  addColumnAfter*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={() => editor.chain().focus().deleteColumn().run()}*/}
          {/*  disabled={!editor.can().deleteColumn()}*/}
          {/*>*/}
          {/*  deleteColumn*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={() => editor.chain().focus().addRowBefore().run()}*/}
          {/*  disabled={!editor.can().addRowBefore()}*/}
          {/*>*/}
          {/*  addRowBefore*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={() => editor.chain().focus().addRowAfter().run()}*/}
          {/*  disabled={!editor.can().addRowAfter()}*/}
          {/*>*/}
          {/*  addRowAfter*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={() => editor.chain().focus().deleteRow().run()}*/}
          {/*  disabled={!editor.can().deleteRow()}*/}
          {/*>*/}
          {/*  deleteRow*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={() => editor.chain().focus().deleteTable().run()}*/}
          {/*  disabled={!editor.can().deleteTable()}*/}
          {/*>*/}
          {/*  deleteTable*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={() => editor.chain().focus().mergeCells().run()}*/}
          {/*  disabled={!editor.can().mergeCells()}*/}
          {/*>*/}
          {/*  mergeCells*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={() => editor.chain().focus().splitCell().run()}*/}
          {/*  disabled={!editor.can().splitCell()}*/}
          {/*>*/}
          {/*  splitCell*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={() => editor.chain().focus().toggleHeaderColumn().run()}*/}
          {/*  disabled={!editor.can().toggleHeaderColumn()}*/}
          {/*>*/}
          {/*  toggleHeaderColumn*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={() => editor.chain().focus().toggleHeaderRow().run()}*/}
          {/*  disabled={!editor.can().toggleHeaderRow()}*/}
          {/*>*/}
          {/*  toggleHeaderRow*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={() => editor.chain().focus().mergeOrSplit().run()}*/}
          {/*  disabled={!editor.can().mergeOrSplit()}*/}
          {/*>*/}
          {/*  mergeOrSplit*/}
          {/*</button>*/}
        </div>}
    </>
  )
}
