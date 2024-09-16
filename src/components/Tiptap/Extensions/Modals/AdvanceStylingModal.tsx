import { Modal } from '@contentful/f36-components'
import { useCurrentEditor } from '@tiptap/react'
import React, { useEffect } from 'react'
import { GlobalContext } from '../../../../contexts/globalContext'
import Customiser from '../../../Customiser'
import './style.scss'

const StyleList = [
  {
    label: 'Apply bg red',
    class: 'bgRed',
  },
]


function AdvanceStylingModal() {
  const { isStylingModalOpen, setIsStylingModalOpen } = React.useContext(GlobalContext)
  const [classList, setClassList] = React.useState<string[]>([])
  const { editor } = useCurrentEditor()

  useEffect(() => {
    const prevClass = editor?.getAttributes('altusText')?.class ?? ''
    setClassList(prevClass.split(' '))
  }, [isStylingModalOpen])

  function handleStyleChange(item: typeof StyleList[0]) {
    setClassList(prev => {
      if (prev.includes(item.class)) {
        return prev.filter(i => i !== item.class)
      } else {
        return [...prev, item.class]
      }
    })
  }

  function handleApply() {
    // editor?.isActive('altusText') ?
    //   editor?.chain().focus().unsetAltusText().run() :
    editor?.chain().focus().extendMarkRange('altusText').setAltusText({ class: classList.join(' ') }).run()
    setIsStylingModalOpen(false)
  }

  return <Modal onClose={() => setIsStylingModalOpen(false)} isShown={isStylingModalOpen} size={'1400px'}>

    <Modal.Header
      title='Advance Styling & Effects'
      // subtitle='subtitle'
      onClose={() => setIsStylingModalOpen(false)}
    />
    <Modal.Content>
      <Customiser />

    </Modal.Content>
  </Modal>
}

export default AdvanceStylingModal