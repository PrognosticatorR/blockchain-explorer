/** @jsxImportSource @emotion/react */
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { css } from "@emotion/react";
import { Route, Routes } from "react-router-dom";
import { Transactions } from "./components/Transactions";
import { TransactionsDetails } from "./components/TransactionsDetails";
const wrapper = css`
  text-align: center;
  min-height: 100vh;
  background-color: #f8f8fe;
`;

function App() {
  return (
    <div css={wrapper}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="transactions/:hash" element={<TransactionsDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
