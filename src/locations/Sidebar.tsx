import React from 'react'
import { Paragraph } from '@contentful/f36-components'
import { SidebarAppSDK } from '@contentful/app-sdk'
import { useSDK } from '@contentful/react-apps-toolkit'

const Sidebar = () => {
  const sdk = useSDK<SidebarAppSDK>()
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();

  return <div>
    <Paragraph>Hello Sidebar Component (AppId: {sdk.ids.app})</Paragraph>
  </div>
}

export default Sidebar
