import { Typography } from '@components'
import { WorkBaseQueryForm } from '../form'

import { motion } from 'framer-motion'

export const WorkbaseQuery = () => {
    const onSubmit = (values: any) => {
        console.log({ values })
    }
    return (
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
            className="lg:border-[10px] border-transparent border-solid h-auto w-full md:max-w-2xl mx-auto lg:py-6 px-5 lg:px-11 flex flex-col gap-y-4 lg:gap-y-7 bg-no-repeat relative"
            style={{
                borderImage:
                    'url(/images/site/services/webbasetraining/formBorder.png) 12 round',
            }}
        >
            <Typography variant="h4" center>
                Query Form
            </Typography>
            <div className="shadow-site rounded-[10px] bg-white px-6 py-8">
                <WorkBaseQueryForm onSubmit={onSubmit} result={{}} />
            </div>
        </motion.div>
    )
}
