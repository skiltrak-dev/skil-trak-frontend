import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { EmergencyContact } from '../EmergencyContact'
import { StudentDetailCard } from '../StudentDetailCard'

// jest.mock('swiper/react', () => ({
//     Swiper: ({ children }: any) => (
//         <div data-testid="swiper-mock">{children}</div>
//     ),
//     SwiperSlide: ({ children }: any) => (
//         <div data-testid="swiper-slide-mock">{children}</div>
//     ),
// }))

describe('MyComponent', () => {
    it('Saad', () => {
        render(<StudentDetailCard detail="Saad" title="Saad" />)
    })
})
