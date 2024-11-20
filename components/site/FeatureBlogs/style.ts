import styled from 'styled-components'

export const FeatureBlogContainer = styled.div`
    .swiper {
        position: static !important;
    }
    .swiper-initialized {
        padding: 20px !important;
    }

    .swiper-horizontal > .swiper-pagination-bullets,
    .swiper-pagination-bullets.swiper-pagination-horizontal {
        bottom: -30px !important;
    }
    .swiper-pagination-bullets .swiper-pagination-bullet {
        width: 18px;
        height: 18px;
        background-color: white;
        background: #d9d9d9;
        opacity: 1 !important;
        border-radius: 12px !important;
    }

    .swiper-pagination-bullet-active {
        background: var(--theme-primary-default) !important;
    }
`
