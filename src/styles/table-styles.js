import { css } from "@emotion/react";

export const tableContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  z-index: 10;
  padding: 8px;
  @media (min-width: 920px) {
    min-width: 820px;
  }
  box-sizing: border-box;
  overflow: scroll;
  @media (max-width: 920px) {
    width: 100% !important;
  }
`;

export const tableStyles = css`
  border: 1px solid gray;
  max-width: 900px;
  border-collapse: collapse;
  width: 90%;
  box-shadow: 0px 0px 10px 3px #d3d3d3;
  td,
  th {
    border: 1px solid #222222;
    text-align: left;
    padding: 10px;
  }
  td {
    cursor: pointer;
    min-width: 150px;
  }
  tr:nth-of-type(even) {
    background-color: #fefefe;
  }
`;

export const rowStyles = css`
  &:hover {
    box-shadow: 0 0 6px rgba(220, 220, 220);
    background-color: #dcdcdc !important;
  }
`;

export const txnTableContainer = css`
  ${tableContainer}
  font-size: 16px;
  max-height: auto;
  margin-top: 20px;
`;

export const txnTableStyles = css`
  ${tableStyles}
  width:90%;
  td {
    cursor: default;
  }
`;
