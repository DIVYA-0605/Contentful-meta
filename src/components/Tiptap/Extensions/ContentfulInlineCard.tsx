import { NodeViewWrapper } from '@tiptap/react'
import React, { useContext } from 'react'
import { useSDK } from '@contentful/react-apps-toolkit'
import { EditorAppSDK } from '@contentful/app-sdk'
import { GlobalContext } from '../../../contexts/globalContext'
import { InlineEntryCard, MenuItem } from '@contentful/f36-components'

export const ContentfulInlineCard = (props: any) => {
  const { id } = props.node.attrs.sys
  const [entryData, setEntryData] = React.useState<any>(null)
  const sdk = useSDK<EditorAppSDK>()
  const status = entryData?.sys.publishedAt
    // if publishedAt and updatedAt are the same, then the entry is published
    ? entryData?.sys.publishedAt === entryData?.sys.updatedAt
      ? 'published'
      : 'changed'
    : 'draft'
  const currentLocale = useContext(GlobalContext).currentLocale
  const entryTitle = entryData?.fields?.internalName[currentLocale] ?? 'Untitled'


  React.useEffect(() => {
    sdk.cma.entry.get({
      entryId: id,
    }).then((entry) => {
      setEntryData(entry)
    })
  }, [])


  return (
    <NodeViewWrapper as={'span'} className='react-block-component'>
      <InlineEntryCard
        isLoading={!entryData}

        actions={[
          <MenuItem key='edit'
                    onClick={() => {
                      sdk.navigator.openEntry(id, { slideIn: true })
                    }}>
            Edit
          </MenuItem>,
        ]}
        status={status}
        title={entryTitle}
      >
        {/* restrict length of the title to 25 characters */}
        {entryTitle?.substring(0, 25) + '...'}
      </InlineEntryCard>
    </NodeViewWrapper>
  )
}