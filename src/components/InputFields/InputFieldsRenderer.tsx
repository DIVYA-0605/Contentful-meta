import { EditorAppSDK } from '@contentful/app-sdk'
import { Note, Text } from '@contentful/f36-components'
import { useSDK } from '@contentful/react-apps-toolkit'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { DateEditor } from '../Date'
import Tiptap from '../Tiptap'
import { BooleanEditor } from './Boolean'
import { DropdownEditor } from './Dropdown'
import { NumberEditor } from './Number'
import { MultipleEntryReferenceEditor, SingleEntryReferenceEditor, SingleMediaEditor } from './Reference'
import { SingleLineEditor } from './SingleLine'
import { TagsEditor } from './Tags'

function InputFieldsRenderer({ fieldId, currentLocale }: { fieldId: string, currentLocale: string }) {
  const sdk = useSDK<EditorAppSDK>()
  const sdkFields = sdk.entry.fields

  if (!sdkFields[fieldId]?.locales.includes(currentLocale)) {
    return (<></>)
  }

  if (['htmlAttr', 'fieldMapping'].includes(fieldId)) {
    return (<></>)
  }

  let conditionalInput = null

  if (sdkFields[fieldId]?.validations.length > 0 && sdkFields[fieldId]?.validations?.at(0)?.in?.length > 0) {
    conditionalInput = <DropdownEditor locales={sdk.locales} field={sdkFields[fieldId].getForLocale(currentLocale)} />
  } else if (sdkFields[fieldId].type === 'Symbol') {

    conditionalInput = <SingleLineEditor locales={sdk.locales}
      field={sdkFields[fieldId].getForLocale(currentLocale)} />

  } else if (sdkFields[fieldId].type === 'Object') {

    conditionalInput = <Tiptap fieldId={fieldId} />

  } else if (sdkFields[fieldId].type === 'Link' && sdkFields[fieldId].linkType === 'Entry') {

    conditionalInput = <SingleEntryReferenceEditor hasCardEditActions={true}
      viewType={'link'}
      sdk={sdk}
      parameters={{
        instance: {
          showCreateEntityAction: true,
          showLinkEntityAction: true,
        },
      }}
      fieldId={fieldId} />

  } else if (sdkFields[fieldId].type === 'Array') {

    if (sdkFields[fieldId].items.type === 'Symbol') {
      conditionalInput = <TagsEditor field={sdkFields[fieldId].getForLocale(currentLocale)} isInitiallyDisabled />
    } else if (sdkFields[fieldId].items.type === 'Link') {
      conditionalInput = <MultipleEntryReferenceEditor fieldId={fieldId}
        isInitiallyDisabled
        viewType={'card'}
        sdk={sdk}
        parameters={{
          instance: {
            showCreateEntityAction: true,
            showLinkEntityAction: true,
          },
        }}
        hasCardEditActions={true}
      />
    }


  } else if (sdkFields[fieldId].type === 'Boolean') {

    conditionalInput = <BooleanEditor field={sdkFields[fieldId].getForLocale(currentLocale)} />

  } else if (sdkFields[fieldId].type === 'Link' && sdkFields[fieldId].linkType === 'Asset') {

    conditionalInput = <SingleMediaEditor viewType={'card'}
      sdk={sdk}
      parameters={{
        instance: { showCreateEntityAction: true, showLinkEntityAction: true },
      }}
      fieldId={fieldId} />
  } else if (sdkFields[fieldId].type === 'Date') {

    conditionalInput = <DateEditor field={sdkFields[fieldId].getForLocale(currentLocale)} parameters={{
      // instance: {
      //   format: 'dateonly', @TODO: make this dynamic
      // },
    }} />

  } else if (sdkFields[fieldId].type === 'Integer') {
    conditionalInput = <NumberEditor field={sdkFields[fieldId].getForLocale(currentLocale)} />
  } else {
    conditionalInput = <Text> Not Supported</Text>
  }

  return (
    <div style={{ marginTop: 15 }}>
      {/* <Text fontColor={'colorPrimary'}>{sdkFields[fieldId].name}</Text> */}
      <h5 style={{ margin: '24px 0 10px 0' }}>{sdkFields[fieldId].name}</h5>
      <div>
        <ErrorBoundary fallback={<Note variant='warning'>Something went wrong. Contact developer.</Note>}>
          {conditionalInput}
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default InputFieldsRenderer