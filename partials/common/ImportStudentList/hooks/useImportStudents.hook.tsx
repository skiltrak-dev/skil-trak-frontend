import { RtoApi, SubAdminApi } from '@queries'
import { useRouter } from 'next/router'

export const useImportStudents = () => {
    const router = useRouter()

    const [importStudents, importStudentsResult] =
        SubAdminApi.Rto.useImportStudentList()

    const [RTOImportStudents, RTOImportStudentsResult] =
        RtoApi.Students.useImportStudents()

    const onRtoImportStudents = async (values: any) => {
        const data = await RTOImportStudents(values)
        return data
    }
    const onSubadminImportStudents = async (values: any) => {
        const data = await importStudents({
            id: Number(router.query.id),
            body: values,
        })
        return data
    }
    return {
        onRtoImportStudents,
        importStudentsResult,
        RTOImportStudentsResult,
        onSubadminImportStudents,
    }
}
