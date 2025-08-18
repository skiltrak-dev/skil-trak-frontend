import {
    ChevronDown,
    ChevronUp,
    Clock,
    Eye,
    EyeOff,
    MessageSquare,
} from 'lucide-react'
import moment from 'moment'
import { useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { HiOutlineStatusOnline } from 'react-icons/hi'

export const StatusChangeHistoryCommunication = ({ item }: { item: any }) => {
    const [showComments, setShowComments] = useState(false)
    return (
        <div
            className={`w-full mx-auto rounded-xl  border-l-4 border-l-green-500`}
        >
            <div className={`p-4 bg-green-50`}>
                <div className="pb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <HiOutlineStatusOnline
                                className={`h-5 w-5 text-green-600`}
                            />
                            <div className={`uppercase text-green-600`}>
                                {item?.status}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {item?.comment && (
                                <div
                                    onClick={() =>
                                        setShowComments(!showComments)
                                    }
                                    className="cursor-pointer flex items-center gap-2 h-7 px-2 text-xs"
                                >
                                    <div className="flex items-center gap-2 bg-white rounded-md p-1">
                                        {showComments ? (
                                            <EyeOff className="h-3 w-3" />
                                        ) : (
                                            <Eye className="h-3 w-3" />
                                        )}
                                        {showComments
                                            ? 'Hide Comments'
                                            : 'View Comments'}
                                        {showComments ? (
                                            <ChevronUp className="h-3 w-3" />
                                        ) : (
                                            <ChevronDown className="h-3 w-3" />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="pt-0 pb-3 space-y-3">
                    <div className="flex items-center gap-6 text-[13px] text-muted-foreground">
                        <div className="flex items-center gap-2">
                            {/* <Calendar className="h-4 w-4" /> */}
                            <span>
                                {moment(item?.createdAt).format(
                                    'ddd DD MMM YYYY'
                                )}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>
                                {moment(item?.createdAt).format('hh:mm A')}
                            </span>
                        </div>
                        {item?.addedBy && (
                            <div className="flex items-center gap-2">
                                <BiUser className="h-4 w-4" />
                                <span>Added by: {item?.addedBy?.name}</span>
                            </div>
                        )}
                    </div>

                    {/*  */}
                    {item?.comment && showComments && (
                        <div className="border-t pt-3 animate-in slide-in-from-top-2 duration-200">
                            <div className="flex items-start gap-2">
                                <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                    <span className="text-[13px] font-medium text-muted-foreground">
                                        Comments:
                                    </span>
                                    <p className="text-[13px] text-foreground leading-relaxed bg-muted/30 p-2 rounded-md border">
                                        {item?.comment}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
