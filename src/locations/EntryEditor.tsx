import { EditorAppSDK } from '@contentful/app-sdk'
import { Flex, Select } from '@contentful/f36-components'
import { useSDK } from '@contentful/react-apps-toolkit'
import React, { useContext, useEffect, useState } from 'react'
import InputFieldsRenderer from '../components/InputFields/InputFieldsRenderer'
import fieldsConfig, { globalCommonFields } from '../configs/fields.config'
import { GlobalContext } from '../contexts/globalContext'

const Entry = () => {

  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();

  const sdk = useSDK<EditorAppSDK>()
  const sdkFields = sdk.entry.fields

  const contentTypeId = sdk.entry.getSys().contentType.sys.id
  // const isObject = contentTypeId.includes('Object')

  const [template, setTemplate] = useState()
  const { currentLocale, setCurrentLocale } = useContext(GlobalContext)
  const languages = sdk.locales.names

  useEffect(() => {
    // render input fields based on selected template
    // if (!isObject) {
    sdkFields['template']?.onValueChanged((value) => {
      setTemplate(value)
    })

    if (sdkFields['template']) {
      globalCommonFields.push('template')
    }
    // }
    console.log('Locale', sdk.locales)
  }, [sdkFields])


  return (

    <div style={{ width: '70%', margin: '20px auto' }}>
      <Flex justifyContent={'space-between'}>
        {/* {<UseExistingModal />} */}
        <Select
          name='language-selector'
          value={currentLocale}
          onChange={(e) => setCurrentLocale(e.target.value)}
        >
          {Object.keys(languages).map((key) => {
            return <option key={key} value={key}>{languages[key]}</option>
          })}
        </Select>
      </Flex>
      {globalCommonFields.map((fieldId) => {
        return <InputFieldsRenderer key={`${fieldId}-${currentLocale}`} fieldId={fieldId} currentLocale={'en-CA'} />
      })}
      {template && fieldsConfig[contentTypeId][template].map((fieldId: string) => {
        return <InputFieldsRenderer key={`${fieldId}-${currentLocale}`} fieldId={fieldId}
          currentLocale={currentLocale} />
      })}
      {(!template) && Object.entries(sdkFields).map(([fieldId, _]) => {

        if (fieldId === 'internalName') return null

        return <InputFieldsRenderer key={`${fieldId}-${currentLocale}`} fieldId={fieldId}
          currentLocale={currentLocale} />
      })}
    </div>
  )
}

export default Entry