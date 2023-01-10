import React, { useState, useEffect } from 'react'

// components
import {
  LoadingAnimation,
  Mail,
  EmptyData,
  MailForm,
  TechnicalError,
} from '@components'

// query
// query
import { useGetIndustryMessagesQuery, useSendMessageMutation } from '@queries'

// hooks
import { useContextBar } from 'hooks'
import { MailsTab } from '@partials/common'
export const MailTab = () => {
  const { isVisible } = useContextBar()
  // const [messagesList, setMessagesList] = useState([])
  // const [approvedUser, setApprovedUser] = useState(
  //     industry?.user?.status === 'approved'
  // )

  // query
  const messages = useGetIndustryMessagesQuery()

  // useEffect(() => {
  //     setApprovedUser(industry?.user?.status === 'approved')
  // }, [industry])

  // useEffect(() => {
  //     messages.refetch()
  // }, [messages.refetch])

  return (
    <>
      <MailsTab />
    </>
  )
}
