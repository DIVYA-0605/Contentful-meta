import { EditorAppSDK } from '@contentful/app-sdk'
import { useSDK } from '@contentful/react-apps-toolkit'
import { NodeViewWrapper } from '@tiptap/react'
import React from 'react'
import { FetchingWrappedEntryCard } from '../../InputFields/Reference/entries/WrappedEntryCard/FetchingWrappedEntryCard'

interface ContentfulBlockCardProps {
  node: {
    attrs: {
      sys: {
        id: string
        type: 'BlockEntry' | 'InlineEntry'
        linkType: 'Entry'
      }
    }
  };
}

export default function ContentfulBlockCard(props: ContentfulBlockCardProps) {
  const { id, linkType } = props.node.attrs.sys
  const sdk = useSDK<EditorAppSDK>()

  return (
    <NodeViewWrapper className='react-block-component'>
      {linkType === 'Entry' && (
        <FetchingWrappedEntryCard
          fieldId={''}
          sdk={sdk}
          entryId={id}
          isDisabled={true}
          hasCardEditActions={false}
          hasCardRemoveActions={false}
          parameters={{
            instance: {
              showCreateEntityAction: false,
              showLinkEntityAction: false,
            },
          }}
          viewType={'link'}
          isInitiallyDisabled={true}
          onRemove={() => {
            console.log('onRemove')
          }} />
      )}
    </NodeViewWrapper>
  )
}