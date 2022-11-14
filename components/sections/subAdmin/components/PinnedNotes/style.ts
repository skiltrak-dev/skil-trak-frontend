import styled from "styled-components";

export const PinedNotesStyles = styled.div`
.swiper {
    // width: 100%;
    // height: 100%;
        position: static !important;
  }
  
  .swiper-slide {
    font-size: 18px;
  
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }  
  

.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal {
    bottom: -18px !important;
}
// .swiper-pagination-bullets .swiper-pagination-bullet {
//     width: 16px;
//     height: 16px;
//     background-color: white;
//     border: 2px solid #4fcffd;
//     opacity: 1 !important;
// }
`;