import { EditorAppSDK } from '@contentful/app-sdk'
import { Button, Modal } from '@contentful/f36-components'
import { useSDK } from '@contentful/react-apps-toolkit'
import React, { useState } from 'react'
import { SingleEntryReferenceEditor } from '../InputFields/Reference'
import TransformFields from './index'

function UseExistingModal(props: any) {
  const sdk = useSDK<EditorAppSDK>()
  const [isShown, setShown] = useState(false)

  function addExistingData() {
    setShown(true)
  }


  return (
    <>
      <div>
        <Button onClick={addExistingData}>Use Existing Content</Button>
      </div>

      <Modal onClose={() => setShown(false)} isShown={isShown} size={'large'}>
        {() => (
          <>
            <Modal.Header
              title='Selecting existing content'
              subtitle='Select the content you want to use.'
              onClose={() => setShown(false)}
            />
            <Modal.Content>
              <SingleEntryReferenceEditor
                fieldId='existingDataEntry'
                hasCardEditActions={false}
                viewType='link'
                sdk={sdk}
                parameters={{
                  instance: {
                    showCreateEntityAction: true,
                    showLinkEntityAction: true,
                  },
                }}
              />
              <TransformFields setShown={setShown} />

            </Modal.Content>
          </>
        )}
      </Modal>
    </>
  )
}

export default UseExistingModal