import React, { useState } from 'react'
import { GlobalContext, initialGlobalState } from './globalContext'

function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState(initialGlobalState.currentLocale)
  const [isHyperLinkModalOpen, setIsHyperLinkModalOpen] = useState(initialGlobalState.isHyperLinkModalOpen)
  const [isStylingModalOpen, setIsStylingModalOpen] = useState(initialGlobalState.isStylingModalOpen)
  const [activeColor, setActiveColor] = useState(initialGlobalState.activeColor)

  return <GlobalContext.Provider value={{
    currentLocale, setCurrentLocale,
    isHyperLinkModalOpen, setIsHyperLinkModalOpen,
    isStylingModalOpen, setIsStylingModalOpen,
    activeColor, setActiveColor,
  }}>
    {children}
  </GlobalContext.Provider>
}

export default GlobalProvider