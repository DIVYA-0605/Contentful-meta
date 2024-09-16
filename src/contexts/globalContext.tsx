import React, { createContext } from 'react'

interface GlobalStateI {
  currentLocale: string;
  setCurrentLocale: React.Dispatch<React.SetStateAction<string>>;
  isHyperLinkModalOpen: boolean;
  setIsHyperLinkModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isStylingModalOpen: boolean;
  setIsStylingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeColor: {
    fontColor: string;
    highlightColor: string | null;
  }
  setActiveColor: React.Dispatch<React.SetStateAction<{
    fontColor: string;
    highlightColor: string | null;
  }>>
}

export const initialGlobalState: GlobalStateI = {
  currentLocale: 'en-CA',
  setCurrentLocale: () => {
  },
  isHyperLinkModalOpen: false,
  setIsHyperLinkModalOpen: () => {
  },
  isStylingModalOpen: false,
  setIsStylingModalOpen: () => {
  },
  activeColor: {
    fontColor: 'black',
    highlightColor: null,
  },
  setActiveColor: () => {
  },
}
export const GlobalContext = createContext(initialGlobalState)