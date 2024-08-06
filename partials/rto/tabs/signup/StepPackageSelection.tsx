import { useRef, useState } from 'react'
import { Button, LoadingAnimation, NoData } from '@components'
import { PackageItem, PackageView } from '@partials/rto/components'
import { AuthApi } from '@queries'
import { Packages } from '@types'
import { SignUpUtils } from '@utils'
import { useRouter } from 'next/router'

export const StepPackageSelection = () => {
    const router = useRouter()
    const packages = AuthApi.usePackages()
    const [selectedPackage, setSelectedPackage] = useState<
        Packages | undefined
    >(undefined)
    const accordionRef = useRef<HTMLDivElement>(null)
    const onPackageClicked = (pkg: Packages) => {
        setSelectedPackage((prev) => (prev?.id === pkg.id ? undefined : pkg))
    }

    const onSubmit = () => {
        const values = SignUpUtils.getValuesFromStorage()

        if (values) {
            SignUpUtils.setValuesToStorage({
                ...values,
                package: selectedPackage,
            })

            if (selectedPackage) {
                router.push({ query: { step: 'review-info' } })
            }
        }
    }

    return (
        <div className="w-full mt-6 px-4 md:px-0">
            <div>
                <p className="font-semibold text-lg">
                    What kind of package do you want to use?
                </p>
                <p className="font-medium text-sm text-gray-400">
                    Each package varies in providing functionalities &amp;
                    services.
                </p>
            </div>

            <div className="flex flex-col w-full relative mt-8">
                <div className="w-full flex flex-col gap-y-2 md:gap-y-5">
                    {packages.isError && (
                        <NoData
                            text={
                                'There is some Network issue, try reload browser'
                            }
                        />
                    )}
                    {packages?.isLoading ? (
                        <LoadingAnimation size={60} />
                    ) : packages?.data && packages?.data?.length > 0 ? (
                        packages?.data?.map((pkg: Packages) => (
                            <div
                                key={pkg.id}
                                ref={
                                    selectedPackage?.id === pkg.id
                                        ? accordionRef
                                        : null
                                }
                                className={`${
                                    selectedPackage?.id === pkg.id
                                        ? 'shadow-lg rounded-lg mb-5'
                                        : ''
                                }`}
                            >
                                <PackageItem
                                    pkg={pkg}
                                    selected={selectedPackage?.id === pkg.id}
                                    onClick={() => onPackageClicked(pkg)}
                                />
                                <div
                                    className={`overflow-hidden  px-3 rounded-b-md transition-all duration-500 ${
                                        selectedPackage?.id === pkg.id
                                            ? 'max-h-[500px] mb-5'
                                            : 'max-h-0'
                                    }`}
                                >
                                    {selectedPackage?.id === pkg.id && (
                                        <PackageView pkg={selectedPackage} />
                                    )}
                                    <div className="mt-4">
                                        <Button
                                            variant={'primary'}
                                            onClick={onSubmit}
                                            disabled={!selectedPackage}
                                            text={'Choose'}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        !packages.isError && (
                            <NoData text={'No Package added by admin'} />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
