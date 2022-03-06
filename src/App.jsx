/** @jsxImportSource @emotion/react */
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { css } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Transactions } from "./components/Transactions";
const wrapper = css`
  text-align: center;
  min-height: 100vh;
  background-color: #f8f8fe;
`;

function App() {
  return (
    <div css={wrapper}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="" element={<Home />} />
            <Route path="transactions/:id" element={<Transactions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
