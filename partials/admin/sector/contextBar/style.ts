import styled from "styled-components";

export const TabsStyle = styled.div`
  .react-tabs__tab-list {
    border-bottom: 1px solid #f3f4f6;
  }

  .react-tabs__tab {
    color: #fb923c;
    font-size: 14px;
    font-weight : 500px;
    border: 1px solid transparent;
    transition: all .3s ease-in-out;
  }

  .react-tabs__tab--selected {
    color: #f97316;
    border-bottom: 1px solid #f97316;

    &:after {
      background: transparent;
    }
  }
`;
