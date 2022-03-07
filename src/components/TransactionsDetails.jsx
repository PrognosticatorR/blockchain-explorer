/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

import { getTransaction, convertChainIdToNetworkName } from "../utils/helpers";
import { txnTableContainer, txnTableStyles } from "../styles/table-styles";
import { transactionsTableContainer } from "../styles/index";

export const TransactionsDetails = () => {
  const [transactionData, setTrasanctionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { pathname } = new URL(window.location.href);
  useEffect(() => {
    const txnHash = pathname.split("/")[2];
    getTransaction(txnHash).then((data) => {
      setTrasanctionData(data);
      setLoading(false);
    });
  }, [pathname]);

  return (
    <div
      css={css`
        ${transactionsTableContainer}
      `}
    >
      <h2>
        {loading
          ? "Fetching Data"
          : `Transaction @Block: ${transactionData?.blockNumber}`}
      </h2>
      {loading ? (
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
