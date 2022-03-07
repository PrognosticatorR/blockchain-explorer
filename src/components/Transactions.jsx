/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import moment from "moment";
import { useLocation, Link } from "react-router-dom";
import { filterAccordingToTransaction } from "../utils/helpers";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";

import { truncateStr } from "../utils/helpers";
import { txnTableContainer, txnTableStyles } from "../styles/table-styles";
import {
  transactionsRowsStyles,
  transactionsTableContainer,
} from "../styles/index";

export const Transactions = () => {
  const [transactions, setTrasanction] = useState([]);
  const [blockInfo, setBlockInfo] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);
  const location = useLocation();

  useEffect(() => {
    filterAccordingToTransaction(location.state.transactions).then((res) => {
      setTrasanction(res);
      setFetchingData(false);
    });
    setBlockInfo(location.state);
  }, [location.state]);

  function renderTransactionRows() {
    return (
      <>
        {transactions.map((txn) => {
          return (
            <Link
              to={{
                pathname: `/transactions/${txn.value.hash}`,
                state: { transaction: txn.hash },
              }}
              css={css`
                ${transactionsRowsStyles}
              `}
            >
              {truncateStr(txn.value.hash, 36)}
            </Link>
          );
        })}
      </>
    );
  }
  return (
    <div
      css={css`
        ${transactionsTableContainer}
      `}
    >
      <h2>
        {fetchingData ? "Fetching Data..." : `@Block: ${blockInfo?.number}`}
      </h2>
      {fetchingData ? (
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
                <td>BlockHeight:</td>
                <td>{blockInfo?.number}</td>
              </tr>
              <tr>
                <td>TimeStamp:</td>
                <td>
                  {moment(blockInfo?.timestamp * 1000).fromNow() +
                    "  " +
                    moment(new Date(blockInfo?.timestamp * 1000)).format(
                      "(dddd MM/DD/YYYY)"
                    )}
                </td>
              </tr>
              <tr>
                <td>Gas Used:</td>
                <td>{Number(blockInfo.gasUsed?._hex) + " Wei"}</td>
              </tr>
              <tr>
                <td>Gas Limit:</td>
                <td>{Number(blockInfo.gasLimit?._hex) + " Wei"}</td>
              </tr>
              <tr>
                <td>Transactions:</td>
                <td
                  css={css`
                    padding: 0 !important;
                  `}
                >
                  {!fetchingData ? (
                    renderTransactionRows()
                  ) : (
                    <div
                      css={css`
                        padding-left: 15px;
                      `}
                    >
                      <BeatLoader />
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
