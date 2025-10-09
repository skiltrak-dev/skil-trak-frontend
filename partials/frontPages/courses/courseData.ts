// src/data/coursesData.ts
export interface Course {
    id: number
    name: string
}

export interface Sector {
    id: number
    title: string
    courses: Course[]
}

export const sectorsData: Sector[] = [
    {
        id: 1,
        title: 'Community Services',
        courses: [
            { id: 1, name: 'Diploma of Community Services (CHC52021)' },
            { id: 2, name: 'Certificate IV in Mental Health (CHC43315)' },
            { id: 3, name: 'Certificate IV in Youth Work (CHC40421)' },
        ],
    },
    {
        id: 2,
        title: 'Information Technology',
        courses: [
            { id: 1, name: 'Diploma of Information Technology (ICT50220)' },
            { id: 2, name: 'Advanced Diploma of Network Security (ICT60220)' },
        ],
    },
    {
        id: 3,
        title: 'Health',
        courses: [
            { id: 1, name: 'Certificate III in Individual Support (CHC33021)' },
            { id: 2, name: 'Certificate IV in Ageing Support (CHC43015)' },
        ],
    },
]
