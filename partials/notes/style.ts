import styled from "styled-components";

export const SwiperContainer = styled.div`
.swiper-container{
  height: 100%; 
  max-height: 100vw;
  // CSS Grid/Flexbox bug size workaround
  // @see https://github.com/kenwheeler/slick/issues/982
  min-height: 0;
  min-width: 0;
  max-width: 100vw; 
  width: 100%;
  overflow: hidden;
}
 
.swiper-slide{
  width: auto !important;
  flex-shrink: 0;
  display: block;
  height: 100%;
  max-height: 100%;
}

.swiper-wrapper{
  max-height: 100%;
  height: 100%t;
  display: flex;
}
`;
