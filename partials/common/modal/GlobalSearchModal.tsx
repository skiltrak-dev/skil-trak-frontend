import { GlobalModal, Typography } from '@components'
import { useCallback, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { SubAdminApi } from '@queries'
import { debounce } from 'lodash'

export const GlobalSearchModal = ({ onCancel }: { onCancel: () => void }) => {
    const [searchValue, setSearchValue] = useState('')
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const usersList = SubAdminApi.SubAdmin.globalSearchList(
        {
            search: searchValue,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            skip: !searchValue,
        }
    )

    const delayedSearch = useCallback(
        debounce((value) => {
            setSearchValue(value)
        }, 700),
        []
    )

    return (
        <GlobalModal>
            <div className="w-full lg:w-[850px] relative max-h-[85vh] overflow-auto custom-scrollbar p-5">
                <div className="flex justify-between items-center">
                    <Typography> Global User Filter </Typography>
                    <MdCancel
                        onClick={onCancel}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                </div>

                {/*  */}
                {/* <GlobalFilterForm onSearch={delayedSearch} />

                {!searchValue && <NoData text="Search User By Name or Email" />}

                {usersList?.isError ? <TechnicalError /> : null}
                {usersList?.isLoading || usersList?.isFetching ? (
                    <LoadingAnimation />
                ) : searchValue ? (
                    usersList?.data?.data &&
                    usersList?.data?.data?.length > 0 ? (
                        <GlobalSearchList
                            setPage={setPage}
                            itemPerPage={itemPerPage}
                            students={usersList?.data}
                            setItemPerPage={setItemPerPage}
                        />
                    ) : usersList?.isSuccess ? (
                        <EmptyData />
                    ) : null
                ) : null} */}
            </div>
        </GlobalModal>
    )
}
