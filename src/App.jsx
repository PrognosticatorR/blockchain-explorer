/** @jsxImportSource @emotion/react */
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Transactions } from "./components/Transactions";
import { TransactionsDetails } from "./components/TransactionsDetails";
import { wrapper } from "./styles/index";

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
