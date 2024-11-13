import { SectorCard } from './SectorCard'

export const SectorList = ({ requestList }: any) => {
    return (
        <div className="space-y-6">
            {/* {requestList?.courses?.map((course: any) => { */}
            {/* return */}
            {/* })} */}
            <SectorCard requestList={requestList} />
        </div>
    )
}
