import { useState } from 'react'

// Icons

// components
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

    const onPackageClicked = (pkg: Packages) => {
        setSelectedPackage(pkg)
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
        <div className="w-full mt-6">
            <div>
                <p className="font-semibold text-lg">
                    What kind of package do you want to use?
                </p>
                <p className="font-medium text-sm text-gray-400">
                    Each package varies in providing functionalities &amp;
                    services.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-x-6 w-full relative mt-8">
                <div className="border-r pr-6 md:w-1/3 flex flex-col gap-y-1 md:gap-y-4">
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
                            <>
                                <PackageItem
                                    key={pkg.id}
                                    pkg={pkg}
                                    selected={
                                        selectedPackage &&
                                        selectedPackage.id === pkg.id
                                    }
                                    onClick={() => onPackageClicked(pkg)}
                                />
                                <div
                                    className={`md:hidden ${
                                        selectedPackage?.id === pkg?.id
                                            ? 'max-h-[1000px] mb-5'
                                            : 'max-h-0 '
                                    } overflow-hidden transition-all duration-1000 `}
                                >
                                    {selectedPackage && (
                                        <PackageView pkg={selectedPackage} />
                                    )}
                                </div>
                            </>
                        ))
                    ) : (
                        !packages.isError && (
                            <NoData text={'No Package added by admin'} />
                        )
                    )}
                </div>
                <div className="hidden md:block w-full md:w-2/3">
                    {selectedPackage && <PackageView pkg={selectedPackage} />}
                </div>
            </div>
            <div className="mt-4">
                <Button
                    variant={'primary'}
                    onClick={onSubmit}
                    disabled={!selectedPackage}
                    text={'Continue'}
                />
            </div>
        </div>
    )
}
