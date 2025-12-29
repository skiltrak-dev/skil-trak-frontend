import { Badge, Button, Card, TextInput, Typography } from '@components'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Mail, MapPin, Phone, User } from 'lucide-react'
export const CollapsibleStudentDetailsCard = ({
    setShowStudentDetails,
    showStudentDetails,
    studentDetails,
}: any) => {
    return (
        <Card noPadding className="border-0 shadow-xl overflow-hidden">
            <Button
                variant="action"
                className="w-full p-4 hover:bg-slate-50 rounded-none border-0"
                onClick={() => setShowStudentDetails(!showStudentDetails)}
            >
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2.5 text-[#044866]">
                        <User className="h-4 w-4" />
                        <h3 className="font-semibold text-sm">
                            Complete Student Information
                        </h3>
                    </div>
                    <motion.div
                        animate={{
                            rotate: showStudentDetails ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronRight className="h-4 w-4 text-slate-500 rotate-90" />
                    </motion.div>
                </div>
            </Button>

            <AnimatePresence>
                {showStudentDetails && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: 'auto',
                            opacity: 1,
                        }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="p-5 pt-0 border-t border-slate-100">
                            <Tabs defaultValue="basic" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-4">
                                    <TabsTrigger
                                        value="basic"
                                        className="text-xs"
                                    >
                                        Basic Info
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="contact"
                                        className="text-xs"
                                    >
                                        Contact & Address
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent
                                    value="basic"
                                    className="space-y-3"
                                >
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-[10px] text-slate-600"
                                            >
                                                First Name
                                            </Typography>
                                            <TextInput
                                                name="firstName"
                                                defaultValue={
                                                    studentDetails?.user
                                                        ?.name || 'NA'
                                                }
                                                className="mt-1 bg-slate-50 border-slate-200 h-9 text-sm"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-[10px] text-slate-600"
                                            >
                                                Family Name
                                            </Typography>
                                            <TextInput
                                                name="familyName"
                                                defaultValue={
                                                    studentDetails?.familyName ||
                                                    'NA'
                                                }
                                                className="mt-1 bg-slate-50 border-slate-200 h-9 text-sm"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-[10px] text-slate-600"
                                            >
                                                Student ID
                                            </Typography>
                                            <TextInput
                                                name="studentId"
                                                defaultValue={
                                                    studentDetails?.studentId ||
                                                    'NA'
                                                }
                                                className="mt-1 bg-slate-50 border-slate-200 h-9 text-sm"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-[10px] text-slate-600"
                                            >
                                                Batch
                                            </Typography>
                                            <TextInput
                                                name="batch"
                                                defaultValue={
                                                    studentDetails?.batch ??
                                                    'NA'
                                                }
                                                className="mt-1 bg-slate-50 border-slate-200 h-9 text-sm"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-[10px] text-slate-600"
                                            >
                                                Age
                                            </Typography>
                                            <TextInput
                                                name="age"
                                                defaultValue={
                                                    studentDetails.age ?? 'NA'
                                                }
                                                className="mt-1 bg-slate-50 border-slate-200 h-9 text-sm"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-[10px] text-slate-600"
                                            >
                                                Student Type
                                            </Typography>
                                            <div className="mt-1">
                                                <Badge
                                                    text={`${
                                                        studentDetails?.isInternational
                                                            ? 'International'
                                                            : 'Domestic'
                                                    }`}
                                                    className="bg-[#044866]/10 text-[#044866] border-[#044866]/20 text-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent
                                    value="contact"
                                    className="space-y-3"
                                >
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-[10px] text-slate-600"
                                            >
                                                Phone
                                            </Typography>

                                            <div className="flex items-start">
                                                <div className="flex items-center justify-center py-3 px-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg">
                                                    <Phone className="size-3 text-slate-500" />
                                                </div>
                                                <div className="">
                                                    <TextInput
                                                        name="phone"
                                                        defaultValue={
                                                            studentDetails?.phone ??
                                                            'NA'
                                                        }
                                                        className="rounded-l-none bg-slate-50 border-slate-200 h-9 text-sm"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Typography
                                                variant="label"
                                                className="text-[10px] text-slate-600"
                                            >
                                                Email
                                            </Typography>
                                            <div className="flex items-start">
                                                <div className="flex items-center px-2 py-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg">
                                                    <Mail className="h-3.5 w-3.5 text-slate-500" />
                                                </div>
                                                <div className="">
                                                    <TextInput
                                                        name="email"
                                                        type="email"
                                                        defaultValue={
                                                            studentDetails?.user
                                                                ?.email ?? 'NA'
                                                        }
                                                        className="rounded-l-none bg-slate-50 border-slate-200 h-9 text-sm"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Typography
                                            variant="label"
                                            className="text-[10px] text-slate-600"
                                        >
                                            Primary Address
                                        </Typography>
                                        <div className="flex items-start">
                                            <div className="flex items-center py-3 px-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg">
                                                <MapPin className="h-3.5 w-3.5 text-slate-500" />
                                            </div>
                                            <TextInput
                                                name="address"
                                                defaultValue={
                                                    studentDetails?.addressLine1 ??
                                                    'NA'
                                                }
                                                className="rounded-l-none bg-slate-50 border-slate-200 h-9 text-sm"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    )
}
