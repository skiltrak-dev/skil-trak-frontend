import { useState } from 'react'

// Icons

// components
import { Button } from '@components'
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
                    What kind of package dou you want to use?
                </p>
                <p className="font-medium text-sm text-gray-400">
                    Each package varies in providing functionalities &amp;
                    services.
                </p>
            </div>

            <div className="flex gap-x-6 w-full relative mt-8">
                <div className="border-r pr-6 w-1/3 flex flex-col gap-y-4">
                    {packages?.data?.map((pkg: Packages) => {
                        return (
                            <PackageItem
                                key={pkg.id}
                                pkg={pkg}
                                selected={
                                    selectedPackage &&
                                    selectedPackage.id === pkg.id
                                }
                                onClick={() => onPackageClicked(pkg)}
                            />
                        )
                    })}
                </div>
                <div className="w-2/3">
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
