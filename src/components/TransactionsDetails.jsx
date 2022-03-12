/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";

import { convertChainIdToNetworkName } from "../utils/helpers";
import { txnTableContainer, txnTableStyles } from "../styles/table-styles";
import { transactionsTableContainer } from "../styles/index";

export const TransactionsDetails = () => {
  const state = useSelector((state) => state);
  const [transactionData, setTransactionData] = useState([]);

  const { transactions } = state.transactionReducer;
  const { pathname } = new URL(window.location.href);
  useEffect(() => {
    const txnHash = pathname.split("/")[2];
    const currentTransaction = transactions.filter(
      (txn) => txn.hash === txnHash
    );
    setTransactionData(currentTransaction[0]);
  }, [pathname, transactions]);

  return (
    <div
      css={css`
        ${transactionsTableContainer}
      `}
    >
      <h2>{`Transaction @Block: ${transactionData?.blockNumber}`}</h2>
      {!transactionData ? (
        <ClipLoader />
      ) : (
        <div css={txnTableContainer}>
          <table css={txnTableStyles}>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nonce:</td>
                <td>{transactionData?.nonce}</td>
              </tr>
              <tr>
                <td>Confirmations:</td>
                <td>{transactionData?.confirmations}</td>
              </tr>
              <tr>
                <td>Gas Price:</td>
                <td>{Number(transactionData?.gasPrice?._hex) + " Wei"}</td>
              </tr>
              <tr>
                <td>Gas Limit:</td>
                <td>{Number(transactionData?.gasLimit?._hex) + " Wei"}</td>
              </tr>
              <tr>
                <td>From:</td>
                <td>{transactionData?.from}</td>
              </tr>
              <tr>
                <td>To:</td>
                <td>{transactionData?.to}</td>
              </tr>
              <tr>
                <td>Value:</td>
                <td>{Number(transactionData?.value) + " Wei"}</td>
              </tr>
              <tr>
                <td>Chain:</td>
                <td>{convertChainIdToNetworkName(transactionData?.chainId)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
