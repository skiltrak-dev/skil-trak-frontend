import { ThemeColors } from '@utils'
import styled from 'styled-components'

export const PackageSliderContainer = styled.div`
    .swiper {
        position: static !important;
    }

    .swiper-horizontal > .swiper-pagination-bullets,
    .swiper-pagination-bullets.swiper-pagination-horizontal {
        bottom: -30px !important;
    }
    .swiper-pagination-bullets .swiper-pagination-bullet {
        width: 13px;
        height: 13px;
        background-color: white;
        background: #d9d9d9;
        opacity: 1 !important;
        border-radius: 12px !important;
    }

    .swiper-pagination-bullet-active {
        background: linear-gradient(
            180deg,
            #0d3958 0%,
            #072337 100%
        ) !important;
    }
`
