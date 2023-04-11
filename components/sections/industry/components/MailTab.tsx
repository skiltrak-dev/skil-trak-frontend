// components

// query
// query
import { useGetIndustryMessagesQuery } from '@queries'

// hooks
import { useContextBar } from 'hooks'
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

    return <>{/* <MailsTab user={} /> */}</>
}
