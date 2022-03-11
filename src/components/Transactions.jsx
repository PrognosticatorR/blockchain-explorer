/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import moment from "moment";
import { useLocation, Link } from "react-router-dom";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch, useSelector } from "react-redux";

import { fetchTransactions } from "../store/actions/transactionAction";
import { truncateStr } from "../utils/helpers";
import { txnTableContainer, txnTableStyles } from "../styles/table-styles";
import {
  transactionsRowsStyles,
  transactionsTableContainer,
} from "../styles/index";

export const Transactions = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { transactions, isFetchingData, blockData } = state.transactionReducer;
  useEffect(() => {
    dispatch(fetchTransactions(blockData.transactions));
  }, [dispatch, blockData]);

  function renderTransactionRows() {
    return (
      <>
        {transactions.map((txn) => {
          return (
            <Link
              to={`/transactions/${txn.hash}`}
              css={css`
                ${transactionsRowsStyles}
              `}
            >
              {truncateStr(txn.hash, 36)}
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
        {isFetchingData ? "Fetching Data..." : `@Block: ${blockData?.number}`}
      </h2>
      {isFetchingData ? (
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
                <td>{blockData?.number}</td>
              </tr>
              <tr>
                <td>TimeStamp:</td>
                <td>
                  {moment(blockData?.timestamp * 1000).fromNow() +
                    "  " +
                    moment(new Date(blockData?.timestamp * 1000)).format(
                      "(dddd MM/DD/YYYY)"
                    )}
                </td>
              </tr>
              <tr>
                <td>Gas Used:</td>
                <td>{Number(blockData.gasUsed?._hex) + " Wei"}</td>
              </tr>
              <tr>
                <td>Gas Limit:</td>
                <td>{Number(blockData.gasLimit?._hex) + " Wei"}</td>
              </tr>
              <tr>
                <td>Transactions:</td>
                <td
                  css={css`
                    padding: 0 !important;
                  `}
                >
                  {!isFetchingData ? (
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
