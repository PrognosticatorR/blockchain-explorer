/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import moment from "moment";
const tableContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  max-height: 450px;
  z-index: 10;
  box-sizing: border-box;
  overflow: scroll;
  @media (max-width: 920px) {
    width: 100% !important;
  }
`;

const tableStyles = css`
  border: 1px solid black;
  max-width: 900px;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(240, 245, 245);
  td,
  th {
    border: 1px solid #222222;
    text-align: left;
    padding: 10px;
  }
  td {
    cursor: pointer;
    min-width: 150px;
  }
  tr:nth-of-type(even) {
    background-color: #fefefe;
  }
`;

const rowStyles = css`
  &:hover {
    box-shadow: 0 0 6px rgba(220, 220, 220);
    background-color: #dcdcdc !important;
  }
`;

export const Table = ({ blocks }) => {
  return (
    <div key={"txn_table"} css={tableContainer}>
      <table css={tableStyles}>
        <thead>
          <tr>
            <th>Block Number</th>
            <th>Txn Hash</th>
            <th>Time</th>
            <th>gasUsed</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block) => (
            <tr css={rowStyles} key={block.blockNumber}>
              <td>{block.number}</td>
              <td>{block.hash.slice(0, 20) + "...." + block.hash.slice(55)}</td>
              <td>{moment(new Date(block.timestamp * 1000)).fromNow()}</td>
              <td>{Number(block.gasUsed._hex) + " wei"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
