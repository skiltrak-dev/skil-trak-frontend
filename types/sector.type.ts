
export interface CourseType {
    code: string;
    title: string;
    description: string;
    hours: number;
    requirementFile: string;
    sector: SectorType;
    // folders: Folder[];
}

export interface SectorType {
    code: string
    name: string
    courses: CourseType[];
    // industry?: Industry;
}
