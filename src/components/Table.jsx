/** @jsxImportSource @emotion/react */
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { tableContainer, tableStyles, rowStyles } from "../styles/table-styles";

export const Table = ({ blocks }) => {
  const navigate = useNavigate();
  const handleClick = (block) => {
    navigate("/transactions", { state: block });
  };
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
            <tr
              css={rowStyles}
              key={block.blockNumber}
              onClick={() => handleClick(block)}
            >
              <td>{block.number}</td>
              <td>{block.hash.slice(0, 10) + "...." + block.hash.slice(60)}</td>
              <td>{moment(new Date(block.timestamp * 1000)).fromNow()}</td>
              <td>{Number(block.gasUsed._hex) + " wei"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
