import styled from "styled-components/macro";

export const Body = styled.div`
  margin-left: 20px;
  .name-film{
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .title-comment{
    margin-top: 20px;
    font-size: 16px;
    font-weight: 400;
  };
  .comment{
    margin-top: 10px;
    margin-left: 20px;
    background-color: #eff0f1;
    max-width: 850px;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 12px;
    padding-right: 8px;
    border-radius: 10px;
  }
  .userName{
    font-size: 13px;
    font-weight: 700;
  }
  .inputComment{
    margin-left: 12px;
  }
  .form-rating{
    display: block;
    margin-top: 30px;
  }
  .viewer-rating{
    font-size: 16px;
    font-weight: 400;
  }
  .dpl-none{
    display: none;
  }
`