/** @jsxImportSource @emotion/react */
import { Outlet } from "react-router-dom";
import { css } from "@emotion/react";

const headerStyles = css`
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

const headingText = css`
  padding-left: 50px;
  font-size: calc(10px + 2vmin);
`;

export const Header = () => {
  return (
    <>
      <div css={headerStyles}>
        <div css={headingText}>Block Explorer</div>
      </div>
      <Outlet />
    </>
  );
};
