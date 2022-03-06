/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import moment from "moment";
import { useLocation, Link } from "react-router-dom";
import { filterAccordingToTransaction } from "../utils/helpers";
import { css } from "@emotion/react";
import { truncateStr } from "../utils/helpers";
import { txnTableContainer, txnTableStyles } from "../styles/table-styles";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";

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
              `}
            >
              {truncateStr(txn.value.hash, 30)}
            </Link>
          );
        })}
      </>
    );
  }
  return (
    <div>
      <h2>{fetchingData ? "Fetching Data" : `@Block: ${blockInfo?.number}`}</h2>
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
                <td>{Number(blockInfo.gasUsed?._hex)}</td>
              </tr>
              <tr>
                <td>Gas Limit:</td>
                <td>{Number(blockInfo.gasLimit?._hex)}</td>
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
