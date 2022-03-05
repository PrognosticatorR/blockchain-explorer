/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { getWeb3Provider } from "../utils/helpers";
import ETHLogo from "../ethereum.svg";
import { Table } from "./Table";

export const Home = (props) => {
  const [blocks, setBlocks] = useState([]);
  const [fetchingBlocks, setFetchingBlocks] = useState(false);
  const provider = getWeb3Provider();

  useEffect(() => {
    setFetchingBlocks(true);
    getBlocks().then((blocks) => {
      setBlocks(blocks);
      setFetchingBlocks(false);
    });
  }, []);

  async function getBlocks() {
    let blockNumbers = [];
    let number = await provider.getBlockNumber();
    console.log("The last block number: " + number);
    for (let i = 0; i < 10; i++) {
      blockNumbers.push(number - i);
    }
    const getBlocksMapArray = blockNumbers.map((number) => {
      return provider.getBlock(number);
    });
    return Promise.all(getBlocksMapArray);
  }

  return (
    <div
      css={css`
        margin: 20px;
      `}
    >
      <img width={40} height={80} src={ETHLogo} alt="React Logo" />
      <p
        css={css`
          font-size: 20px;
        `}
      >
        Ethereum Block Explorer
      </p>
      {!fetchingBlocks ? <Table blocks={blocks} /> : <h3>Loading blocks...</h3>}
    </div>
  );
};
