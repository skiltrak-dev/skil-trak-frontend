import Image from 'next/image'
import { LiaTimesSolid } from 'react-icons/lia'
import { Button, GlobalModal } from '@components'
import { isBrowser } from '@utils'

export const ContestModal = ({ onCancel }: { onCancel: () => void }) => {
    return (
        <GlobalModal>
            <div className="relative !z-[999999] w-full lg:max-w-4xl xl:max-w-5xl h-auto md:h-[63vh] lg:h-[80vh]">
                <div className="p-1 bg-white absolute -top-2 -right-2 hover:rotate-90 transition-all duration-700 rounded-full">
                    <LiaTimesSolid
                        onClick={onCancel}
                        className="  text-black text-2xl cursor-pointer "
                    />
                </div>
                <Image
                    src={'/images/banner.png'}
                    alt={'Banner'}
                    width={0}
                    height={0}
                    sizes={'100vh 100vw'}
                    className="w-full h-full"
                />
                <div className="absolute bottom-4 right-12 lg:bottom-10 lg:right-28 lg:w-48 lg:h-12">
                    <Button
                        text="Apply Now"
                        fullHeight
                        variant="primaryNew"
                        fullWidth
                        onClick={() => {
                            if (isBrowser()) {
                                window.open(
                                    'https://docs.google.com/forms/d/e/1FAIpQLSfRQO5RUSOhGps_afKHLDupZLK16rQ20NB8bHbHfZ_QT313eg/viewform?vc=0&c=0&w=1&flr=0'
                                )
                            }
                        }}
                    />
                </div>
            </div>
        </GlobalModal>
    )
}
