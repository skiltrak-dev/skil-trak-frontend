export interface NoteTemplateType {
    id: number
    sequence: number
    status: string
    createdBy: string
    updated: string
    title: string
    description?: Array<{
        id: number
        status: string
        description: string
        createdBy: string
        dated: string
    }>
    expanded?: boolean
}

export const initialData = [
    {
        id: 1,
        sequence: 1,
        status: 'Assign me',
        createdBy: 'Admin',
        updated: '04 Dec 2025',
        title: 'Student assign to this Subadmin',
        description: [
            {
                id: 1,
                status: 'Student assign to this Subadmin',
                description:
                    'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                createdBy: 'Admin',
                dated: '04 Dec 2025',
            },
        ],
        expanded: false,
    },
    {
        id: 2,
        sequence: 2,
        status: 'Assign me 2',
        createdBy: 'Admin',
        updated: '04 Dec 2025',
        title: 'Student assign to this Subadmin',
        description: [
            {
                id: 1,
                status: 'Student assign to this Subadmin',
                description:
                    'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                createdBy: 'Admin',
                dated: '04 Dec 2025',
            },
        ],
        expanded: false,
    },
    {
        id: 3,
        sequence: 3,
        status: 'Assign me 3',
        createdBy: 'Admin',
        updated: '04 Dec 2025',
        title: 'Student assign to this Subadmin',
        description: [
            {
                id: 2,
                status: 'Student assign to this Subadmin',
                description:
                    'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                createdBy: 'Admin',
                dated: '04 Dec 2025',
            },
        ],
        expanded: false,
    },
]
