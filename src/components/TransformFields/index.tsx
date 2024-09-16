import { EditorAppSDK } from '@contentful/app-sdk'
import { Button, Flex, Table, Text } from '@contentful/f36-components'
import { useSDK } from '@contentful/react-apps-toolkit'
import { DndContext } from '@dnd-kit/core'
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import React, { useEffect, useState } from 'react'
import { DraggableTableRow } from './DraggableTableRow'
import { DropdownEditor } from '../InputFields/Dropdown'
import fieldsConfig from '../../configs/fields.config'
import { getMappableFields } from '../../utils'
import { fieldsMappingPreset } from '../../configs/fieldsMapping.preset'

function TransformFields({ setShown }: any) {
  const [fromContentType, setFromContentType] = useState<any>(null)
  const [fromList, setFromList] = useState<any>([])
  const [toList, setToList] = useState<any>([])
  const [toTemplate, setToTemplate] = useState<any>()
  const [fromTemplate, setFromTemplate] = useState<any>()
  const [showFields, setShowFields] = useState(false)

  const sdk = useSDK<EditorAppSDK>()
  const sdkFields = sdk.entry.fields
  const contentTypeId = sdk.entry.getSys().contentType.sys.id


  useEffect(() => {

    sdkFields['template'].onValueChanged((value) => {
      setToTemplate(value)
    })

  }, [])

  function getPresetFields(fromContentType: string, toContentType: string, toTemplate: string) {
    const fieldsPreset = fieldsMappingPreset.filter(ele => ele.fromContentType === fromContentType
      && ele.toContentType === toContentType
      && ele.toTemplate === toTemplate,
    )

    return fieldsPreset[0]
  }

  useEffect(() => {
    const presetFields = getPresetFields(fromContentType, contentTypeId, toTemplate)

    setFieldsFromConfigObject({ sdk, fieldMappingObject: presetFields })
  }, [toTemplate, fromContentType])

  async function getFieldDataFromFieldIds({ contentTypeId, fieldIds, sdk }) {
    const contentTypeData = await sdk.cma.contentType.get({ contentTypeId: contentTypeId })
    const templateSpecificFields = fieldIds.map((fieldId: string) => contentTypeData.fields.find(ele => ele.id === fieldId))
    // return getMappableFields(templateSpecificFields)
    return (templateSpecificFields)
  }

  async function setFieldsFromConfigObject({ sdk, fieldMappingObject }) {

    if (fieldMappingObject) {

      const fromContentType = fieldMappingObject['fromContentType']
      const fromTemplate = fieldMappingObject['fromTemplate']

      setFromContentType(fromContentType)
      setFromTemplate(fromTemplate)

      const fromFields = await getFieldDataFromFieldIds({
        contentTypeId: fromContentType,
        fieldIds: fieldMappingObject['fromFieldIds'],
        sdk,
      })
      setFromList(fromFields)

      const toTemplate = fieldMappingObject['toTemplate']
      setToTemplate(toTemplate)

      const toFields = await getFieldDataFromFieldIds({
        contentTypeId: contentTypeId,
        fieldIds: fieldMappingObject['toFieldIds'],
        sdk,
      })
      setToList(toFields)
    }
  }

  useEffect(() => {
    const publishedFieldMapping = sdk.entry.fields['fieldMapping']
      .getForLocale('en-CA')
      .getValue()

    setFieldsFromConfigObject({ sdk, fieldMappingObject: publishedFieldMapping })

    sdk.entry.fields['existingDataEntry'].onValueChanged(async (value) => {
      if (value?.sys?.id) {

        const selectedEntry = await sdk.cma.entry.get({
          entryId: value?.sys?.id,
        })
        const selectedContentTypeId = selectedEntry.sys.contentType.sys.id
        setShowFields(true)

        if (publishedFieldMapping && selectedContentTypeId === publishedFieldMapping['fromContentType']) {
          return
        }
        // const selectedTemplate = selectedEntry.fields['template']['en-CA']
        // const templateSpecificFields = fieldsConfig[selectedContentTypeId][selectedTemplate]

        // const fields = await getFieldDataFromFieldIds({
        //   contentTypeId: selectedContentTypeId,
        //   fieldIds: templateSpecificFields,
        //   sdk,
        // })
        const contentTypeData = await sdk.cma.contentType.get({ contentTypeId: selectedContentTypeId })
        setFromContentType(selectedContentTypeId)
        // setFromTemplate(selectedTemplate)
        setFromList(contentTypeData.fields)
      } else {
        setShowFields(false)
      }
    })

  }, [])


  useEffect(() => {
    if (toTemplate && contentTypeId) {

      const templateSpecificFields = fieldsConfig[contentTypeId][toTemplate]?.map((fieldId: string) => sdkFields[fieldId])
      const fields = getMappableFields(templateSpecificFields)

      setToList(fields)
      console.log('fields', fields, toTemplate)
    }
  }, [toTemplate, contentTypeId])

  const handleDragEnd = (event, setList, flag) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setList((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        const oppositeList = flag === 'from' ? toList : fromList
        if (items[oldIndex]?.type !== oppositeList[newIndex]?.type) {
          return items
        }
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  async function saveFieldMapping() {
    if (fromList?.length > 0 && toList?.length > 0) {
      const publishedFieldMapping =
        sdk.entry.fields['fieldMapping'].getForLocale('en-CA')
      const meta = {
        fromContentType: fromContentType,
        fromTemplate: fromTemplate,
        toTemplate: toTemplate,
        fromFieldIds: fromList.map((item) => item.id),
        toFieldIds: toList.map((item) => item.id),
      }
      if (JSON.stringify(publishedFieldMapping) !== JSON.stringify(meta)) {
        await sdk.entry.fields['fieldMapping'].getForLocale('en-CA').setValue(meta)
      }
    }

  }

  async function copyDataFromExistingEntry(entryId: string) {
    const entryById = await sdk.cma.entry.get({ entryId: entryId })
    const existingEntryFields = entryById.fields

    const fieldMapping = sdk.entry.fields['fieldMapping'].getForLocale('en-CA').getValue()
    fieldMapping.fromFieldIds.forEach((fieldId: string, index: number) => {
      const fromField = existingEntryFields[fieldId]
      const toField = fieldMapping.toFieldIds[index]

      if (fromField && toField) {
        Object.entries(fromField).forEach(([locale, value]: [string, unknown]) => {
          if (sdk.entry.fields[toField].locales.includes(locale)) {
            sdk.entry.fields[toField].getForLocale(locale).setValue(value)
          }
        })
      }
    })

    sdk.notifier.success('Data copied successfully')
  }

  // this function will validate if the fields are mapped correctly
  function validateFieldsMapping() {
    for (let i = 0; i < Math.min(fromList.length, toList.length); i++) {
      if (fromList[i].type !== toList[i].type) {
        return false
      }
    }
    return true
  }

  async function onSaveHandler() {
    const existingEntry = sdk.entry.fields['existingDataEntry'].getValue()
    if (!existingEntry?.sys?.id) {
      return sdk.notifier.error('Please select an entry')
    }

    await saveFieldMapping()
    await copyDataFromExistingEntry(existingEntry?.sys?.id)

    setShown(false)
  }

  return showFields ? (
    <Flex justifyContent='center' alignItems='center' flexDirection={'column'}>
      <Table style={{ marginTop: 20, marginBottom: 20 }}>
        <Table.Head>
          <Table.Row>
            <Table.Cell>
              <Flex flexDirection={'column'} alignItems='start'>
                {/*<Text>From (Style / Template)</Text>*/}
                {/*<Button isDisabled>{fromTemplate}</Button>*/}
              </Flex>
            </Table.Cell>
            <Table.Cell>
              <Text>To (Style / Template)</Text>
              <DropdownEditor locales={sdk.locales} field={sdk.entry.fields['template'].getForLocale('en-CA')} />
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {/* @TODO: Figure out logic to render 2 table cells (from and to field) in one row. */}
          {/*<Table.Row>*/}
          <Table.Cell>
            {fromList?.length > 0 && (
              <DndContext
                onDragEnd={(e) => handleDragEnd(e, setFromList, 'from')}
              >
                <SortableContext
                  // disabled={true}
                  items={fromList}
                  strategy={horizontalListSortingStrategy}
                >

                  {fromList.map((item) => (
                    <DraggableTableRow
                      id={item.id}
                      fieldData={item}
                      key={item.id}
                    />
                  ))}

                </SortableContext>
              </DndContext>
            )}
          </Table.Cell>
          <Table.Cell>
            {toList?.length > 0 && (
              <DndContext onDragEnd={(e) => handleDragEnd(e, setToList, 'to')}>
                <SortableContext
                  items={toList}
                  strategy={horizontalListSortingStrategy}
                >

                  {toList?.map((item) => (
                    <DraggableTableRow
                      id={item.id}
                      fieldData={item}
                      key={item.id}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </Table.Cell>
          {/*</Table.Row>*/}
        </Table.Body>
      </Table>

      <Button variant={'primary'} onClick={onSaveHandler} isDisabled={!validateFieldsMapping()}>Save</Button>
    </Flex>
  ) : <></>
}

export default TransformFields