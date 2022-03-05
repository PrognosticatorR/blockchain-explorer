/** @jsxImportSource @emotion/react */
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { css } from "@emotion/react";
const wrapper = css`
  text-align: center;
  min-height: 100vh;
  background-color: #f8f8fe;
`;

function App() {
  return (
    <div css={wrapper}>
      <Header />
      <Home />
    </div>
  );
}

export default App;
