import { NoData } from '@components';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { RtoV2Api } from '@queries'
import { CheckCircle2, Plus, X } from 'lucide-react';
import React from 'react'

export const EligibleWpTypes = ({ courseId }: any) => {
    // rtos/course/:id/workplace-types
    const { data, isLoading, isError } = RtoV2Api.Courses.useCourseWorkplaceTypes(courseId, {
        skip: !courseId
    })
    return (

        <div className='mx-6'>
            <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
                <h3 className="font-semibold text-base">Eligible Workplace Types</h3>
            </div>
            {isError && <NoData isError />}
            {data && data?.length > 0 ? (<>
                <div className="bg-gradient-to-br from-success/5 to-success/10 rounded-xl p-5 border border-success/20">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {data?.map((type: any, index: number) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="bg-success/10 text-success border-success/30 gap-2 pr-1.5 pl-3 py-1.5"
                            >
                                {type?.name}
                                <button
                                    // onClick={() => handleRemoveEligibleKeyword(course.id, keyword)}
                                    className="hover:bg-success/20 rounded-full p-0.5 transition-colors"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                    {/* <div className="flex items-center gap-2">
                    <Input
                        // value={newEligibleKeyword}
                        // onChange={(e) => setNewEligibleKeyword(e.target.value)}
                        placeholder="Add keyword"
                        className="h-9 flex-1 text-sm bg-background/50"
                    // onKeyDown={(e) => {
                    //     if (e.key === 'Enter') handleAddEligibleKeyword(course.id);
                    // }}
                    />
                    <Button
                        size="sm"
                        variant="outline"
                        // onClick={() => handleAddEligibleKeyword(course.id)}
                        className="h-9 px-3 gap-1.5 bg-success/10 hover:bg-success/20 text-success border-success/30"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        Add Keyword
                    </Button>
                </div> */}
                </div></>) : (!isError && <NoData text='No workplace type found' />)}
        </div>
    )
}
