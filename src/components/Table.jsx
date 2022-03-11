/** @jsxImportSource @emotion/react */
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { tableContainer, tableStyles, rowStyles } from "../styles/table-styles";
import { truncateStr } from "../utils/helpers";
import { setCurrentBlock } from "../store/actions/transactionAction";

export const Table = ({ blocks }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (block) => {
    dispatch(setCurrentBlock(block));
    navigate("/transactions");
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
              <td>{truncateStr(block.hash, 24)}</td>
              <td>{moment(new Date(block.timestamp * 1000)).fromNow()}</td>
              <td>{Number(block.gasUsed._hex) + " wei"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
