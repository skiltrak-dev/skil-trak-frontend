import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { StudentDetailCard } from '../StudentDetailCard'

describe('Student Profile', () => {
    it('Detail Card', () => {
        const title = 'name'
        const detail = 'Saad Mushtaq'

        render(<StudentDetailCard title={title} detail={detail} />)
        // const titleData = screen.getByText(title)
        // const detailData = screen.getByText(detail)

        // expect(titleData).toBeInTheDocument()
        // expect(detailData).toBeInTheDocument()
    })
})
