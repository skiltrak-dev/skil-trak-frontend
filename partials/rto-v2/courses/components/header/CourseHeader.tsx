// File: components/CourseSetup/CourseHeader.tsx
"use client";
import { Button } from '@components/ui/button';
import { Card, CardHeader } from '@components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@components/ui/collapsible';
import { CourseHeaderStats, CourseHeaderTitle, LogbookSummaryDisplay, PlacementRequirementsConfiguration } from '@partials/rto-v2/courses';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';



export const CourseHeader = ({ coursesData }: any) => {
    const [expandedCourses, setExpandedCourses] = useState<string[]>([coursesData?.[0]?.id]);



    const getCompletionColor = (progress: number) => {
        if (progress >= 80) return "text-success";
        if (progress >= 50) return "text-warning";
        return "text-destructive";
    };
    const toggleCourse = (courseId: string) => {
        setExpandedCourses((prev) =>
            prev.includes(courseId)
                ? prev.filter((id) => id !== courseId)
                : [...prev, courseId]
        );
    };
    return (
        <div className="space-y-3">
            {coursesData?.map((course: any) => {
                const isExpanded = expandedCourses?.includes(course?.id);
                return (
                    <Card
                        key={course.id}
                        className="border border-border/50 transition-all shadow-sm hover:shadow-md bg-card overflow-hidden"
                    >
                        <Collapsible open={isExpanded} onOpenChange={() => toggleCourse(course?.id)}>
                            <CollapsibleTrigger asChild>
                                <CardHeader className="cursor-pointer transition-all pb-4">
                                    {/* Course Title Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <CourseHeaderTitle course={course} />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-9 w-9 rounded-full shrink-0 mt-1"
                                            >
                                                {isExpanded ? (
                                                    <ChevronDown className="h-5 w-5" />
                                                ) : (
                                                    <ChevronRight className="h-5 w-5" />
                                                )}
                                            </Button>
                                        </div>

                                        {/* Stats Grid */}
                                        <CourseHeaderStats course={course} />
                                    </div>
                                </CardHeader>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <PlacementRequirementsConfiguration course={course} />
                            </CollapsibleContent>
                        </Collapsible>
                    </Card>


                )
            })}
            {/* <LogbookSummaryDisplay course={course} /> */}



        </div>
    );
};
