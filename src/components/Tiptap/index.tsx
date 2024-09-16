import { EditorAppSDK } from '@contentful/app-sdk'
import { useSDK } from '@contentful/react-apps-toolkit'
import { EditorProvider } from '@tiptap/react'
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../contexts/globalContext'
import CustomBubbleMenu from './CustomBubbleMenu'
import { extensions } from './Extensions'
import { HyperlinkModal } from './Extensions/Modals/HyperlinkModal'
import { MenuBar } from './MenuBar'
import './styles.scss'
import { TableMenus } from './TableMenus'
import { EntityProvider } from '../InputFields/Reference'
import AdvanceStylingModal from './Extensions/Modals/AdvanceStylingModal'


export default function Tiptap(props: { fieldId: string }) {

  const sdk = useSDK<EditorAppSDK>()


  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const currentLocale = useContext(GlobalContext).currentLocale

  if (!props.fieldId) return null

  function handleContextMenu(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault()
    const x = e.clientX
    const y = e.clientY
    setContextMenuPosition({ x, y })
    setShowContextMenu(true)
  }

  return (
    //<Popup handleShow={(e) => {
    //   console.log('Popup event', e)
    // }} isClosable>
    <EntityProvider sdk={sdk}>
      <div onContextMenu={handleContextMenu} className={`tiptapRoot `}>
        <EditorProvider
          slotBefore={
            <>
              <MenuBar />
            </>
          }
          onUpdate={({ editor }) => {
            sdk.entry.fields[props.fieldId]
              .getForLocale(currentLocale)
              .setValue(editor.getJSON())
          }}
          extensions={extensions}
          content={sdk.entry.fields[props.fieldId].getForLocale(currentLocale).getValue()}
        >
          <CustomBubbleMenu />
          <HyperlinkModal sdk={sdk}
                          fieldId={props.fieldId}
                          onClose={(value) => {
                            console.log('HyperlinkModal value', value)
                          }}
                          readonly={false} />
          <AdvanceStylingModal />

          <TableMenus contextMenuPosition={contextMenuPosition}
                      setShowContextMenu={setShowContextMenu}
                      showContextMenu={showContextMenu}
          />
        </EditorProvider>

      </div>
    </EntityProvider>
    //</Popup>
  )
};