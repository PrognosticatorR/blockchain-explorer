import { css } from "@emotion/react";

export const headerStyles = css`
  background-color: #222222;
  min-height: 7vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  z-index: 100;
  position: sticky;
  top: 0;
  font-weight: normal;
`;

export const transactionsRowsStyles = css`
  display: flex;
  border-bottom: 0.1px solid grey;
  border-width: 100%;
  padding: 15px 5px 5px 15px;
  margin-bottom: 0;
  color: #1d6ea5;
  cursor: pointer;
  text-decoration: none;
  padding-top: 10px;
  &:hover {
    color: #1d8ea5;
  }
`;

export const transactionsTableContainer = css`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  justify-content: center;
  align-items: center;
`;

export const wrapper = css`
  text-align: center;
  min-height: 100vh;
  background-color: #f8f8fe;
`;
