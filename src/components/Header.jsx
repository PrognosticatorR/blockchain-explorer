/** @jsxImportSource @emotion/react */
import { Outlet } from "react-router-dom";
import { css } from "@emotion/react";

import { headerStyles } from "../styles/index";

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
