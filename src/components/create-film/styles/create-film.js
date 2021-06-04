import styled from "styled-components/macro";

export const Body = styled.div`
  margin: 20px;
  background-color: white;
  width: 1200px;
  .dp-block {
    display: block;
  }
  .dp-none {
    display: none;
  }
  .add-user {
    border: 2px solid #1890ff;
    padding: 20px;
  }
  .edit-detail {
    /* border: 2px solid rgba(77, 220, 20, 0.741); */
    padding: 20px;
    margin-top: 5px;
  }
  .input {
    outline: none;
    border-color: rgba(220, 20, 60, 0.741);
    box-shadow: 0 0 5px rgba(220, 20, 60, 0.741);
  }
  #btn-add {
    margin-top: 5px;
  }
  .btn-delete {
    margin-right: 8px;
  }
  .action {
    text-align: center;
  }
`;
