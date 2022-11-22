import React, { ReactElement, ReactNode, useContext, useState } from 'react'

interface ContextBarContextType {
   content: ReactElement | ReactNode | undefined
   setContent: Function
   show: Function
   hide: Function
   isVisible: boolean
   fixed: boolean
   switchOff: Function
   off: boolean
   title: string
   setTitle: Function
}

export const ContextBarContext =
   React.createContext<ContextBarContextType | null>(null)

export const ContextBarProvider = ({
   children,
}: {
   children: ReactElement | ReactNode
}) => {
   const [off, setOff] = useState(false)
   const [isVisible, setVisible] = useState(false)
   const [fixed, setFixed] = useState(false)
   const [content, setContent] = useState(null)
   const [title, setTitle] = useState('')

   const value = {
      content,
      setContent,
      show: (fixed: boolean = false) => {
         setVisible(true)
         setFixed(fixed)
      },
      hide: () => setVisible(false),
      isVisible,
      fixed,
      switchOff: (value: boolean) => setOff(value),
      off,
      setTitle,
      title,
   }

   return (
      <ContextBarContext.Provider value={value}>
         {children}
      </ContextBarContext.Provider>
   )
}

export const useContextBar = () => {
   return useContext(ContextBarContext) as ContextBarContextType
}
