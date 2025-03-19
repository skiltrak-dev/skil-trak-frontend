'use client'
import { Employee } from '@partials/common/kpis'
import { createColumnHelper } from '@tanstack/react-table'
import Image from 'next/image'
import { FaRegHandshake } from 'react-icons/fa6'
import { FiEye } from 'react-icons/fi'
import { HiCheck } from 'react-icons/hi'
import { LiaFileContractSolid } from 'react-icons/lia'
import { MdVerified } from 'react-icons/md'
import { RiGitPullRequestFill, RiUserHeartLine } from 'react-icons/ri'
import { CircularProgress } from '../Common/CircularProgress'
import { colors } from '../Employees'

export const getEmployeeColumns = () => {
    const columnHelper = createColumnHelper<Employee>()
    const columns = [
        columnHelper.accessor('id', {
            header: 'S.No',
            cell: ({ row }) => (
                <span className="text-black font-medium text-sm">
                    {row.original.id === 1 ? (
                        <Image
                            src={'/images/kpis/firstcup.svg'}
                            alt="First Cup"
                            width={0}
                            height={0}
                            sizes="100vh 100vw"
                            className="w-full -h-full"
                        />
                    ) : row.original.id === 2 ? (
                        <Image
                            src={'/images/kpis/silverMedal.svg'}
                            alt="Silver Medal"
                            width={0}
                            height={0}
                            sizes="100vh 100vw"
                            className="w-full -h-full"
                        />
                    ) : row.original.id === 3 ? (
                        <Image
                            src={'/images/kpis/bronzeMedal.svg'}
                            alt="Bronze Medal"
                            width={0}
                            height={0}
                            sizes="100vh 100vw"
                            className="w-full -h-full"
                        />
                    ) : row.original.id <= 9 ? (
                        '0' + row.original.id
                    ) : (
                        row.original.id
                    )}
                </span>
            ),
            enableSorting: false,
        }),
        columnHelper.accessor('name', {
            header: 'Employee',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Image
                        className="w-8 h-8 rounded-full"
                        src={
                            'https://learnubuntumate.weebly.com/uploads/1/0/8/4/108446579/pixlr013_orig.jpg'
                        }
                        width={0}
                        height={0}
                        sizes="100vh 100vw"
                        alt={'image'}
                    />
                    <div>
                        <div className="font-medium text-sm">
                            {row.original.name}
                        </div>
                        <div className="text-xs text-gray-500">
                            {row.original.email}
                        </div>
                    </div>
                </div>
            ),
        }),
        columnHelper.accessor('department', {
            header: 'Department',
            cell: ({ row }) => (
                <span className="text-xs">{row.original.department}</span>
            ),
        }),
        columnHelper.accessor('kpiScore', {
            header: 'KPI',
            cell: ({ row }) => (
                <span className="">
                    <CircularProgress value={row.original.kpiScore} />
                </span>
            ),
            enableSorting: false,
        }),
        columnHelper.accessor('metrics', {
            header: () => (
                <div className="flex gap-4">
                    <div className="p-1 bg-white border rounded-lg border-[#1436b05b]">
                        <RiUserHeartLine className="text-lg text-[#0365F5]" />
                    </div>
                    <div className="p-1 bg-white border rounded-lg border-[#1436b05b]">
                        <RiGitPullRequestFill className="text-lg rounded-full p-[1px] text-white bg-[#F5A70C]" />
                    </div>
                    <div className="p-1 bg-white border rounded-lg border-[#1436b05b]">
                        <HiCheck className="text-lg rounded-full p-[1px] text-white bg-[#FF0303]" />
                    </div>
                    <div className="p-1 bg-white border rounded-lg border-[#1436b05b]">
                        <FaRegHandshake className="text-lg text-[#35E100]" />
                    </div>
                    <div className="p-1 bg-white border rounded-lg border-[#1436b05b]">
                        <LiaFileContractSolid className="text-lg text-[#207D04]" />
                    </div>
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex gap-[13px]">
                    {(colors as (keyof typeof row.original.metrics)[]).map(
                        (color) => (
                            <span
                                key={color}
                                className={`text-${color}-500 text-[12px] rounded`}
                            >
                                {row.original.metrics[color]}/20
                            </span>
                        )
                    )}
                </div>
            ),
            enableSorting: false,
        }),
        columnHelper.accessor('checked', {
            header: '',
            cell: ({ row }) =>
                row.original.checked && (
                    <div className="flex items-center justify-center">
                        <MdVerified className="text-lg text-[#207D04]" />
                    </div>
                ),
            enableSorting: false,
        }),
        columnHelper.accessor('verified', {
            header: '',
            cell: ({ row }) =>
                row.original.verified && (
                    <div className={`flex items-center px-10 justify-center `}>
                        <MdVerified className="text-lg text-[#096DFF]" />
                    </div>
                ),
            enableSorting: false,
        }),
        columnHelper.accessor('id', {
            id: 'actions',
            header: '',
            cell: () => (
                <button
                    className="p-2 hover:bg-gray-50 bg-white rounded-lg border border-[#1436b05b]"
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                >
                    <FiEye className="w-5 h-5 text-[#1436B0]" />
                </button>
            ),
            enableSorting: false,
        }),
    ]

    return columns
}
