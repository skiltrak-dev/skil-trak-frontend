import { ShowErrorNotifications, Typography } from '@components'
import { WorkBaseQueryForm } from '../form'

import { motion } from 'framer-motion'
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'
import moment from 'moment'

export const WorkbaseQuery = ({ onCloseModal }: { onCloseModal?: any }) => {
    const [addWorkBase, addWorkBaseResult] =
        CommonApi.WorkBased.useAddWorkBased()

    const { notification } = useNotification()
    const onSubmit = (values: any) => {
        addWorkBase({ ...values, hours: Number(values?.hours) }).then(
            (res: any) => {
                if (res?.data) {
                    notification.success({
                        title: 'Work based Query Sent',
                        description:
                            'Your inquiry has been submitted to our administrator',
                    })
                    onCloseModal()
                }
            }
        )
    }

    return (
        <>
            <ShowErrorNotifications result={addWorkBaseResult} />
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0,
                }}
                transition={{
                    duration: 0.7,
                }}
                whileInView={{
                    opacity: 1,
                    scale: 1,
                }}
                className="lg:border-[10px] border-transparent border-solid h-auto w-full md:max-w-2xl mx-auto lg:py-6 px-5 lg:px-11 flex flex-col gap-y-4 lg:gap-y-7 bg-no-repeat relative -z-10"
                style={{
                    borderImage:
                        'url(/images/site/services/webbasetraining/formBorder.png) 12 round',
                }}
            >
                <Typography variant="h4" center>
                    Query Form
                </Typography>
                <div className="shadow-site rounded-[10px] bg-white px-6 py-8">
                    <WorkBaseQueryForm
                        onSubmit={onSubmit}
                        result={addWorkBaseResult}
                    />
                </div>
            </motion.div>
        </>
    )
}
