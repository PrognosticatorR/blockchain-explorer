/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { getWeb3Provider } from "../utils/helpers";
import ETHLogo from "../ethereum.svg";
import { Table } from "./Table";

export const Home = () => {
  const [blocks, setBlocks] = useState([]);
  const [fetchingBlocks, setFetchingBlocks] = useState(false);
  const wsProvider = getWeb3Provider("websoket");

  useEffect(() => {
    setFetchingBlocks(true);
    getBlocks().then((blocks) => {
      setBlocks(blocks);
      setFetchingBlocks(false);
    });
    getBlocksStream();
    return () => getBlocksStream();
  }, []);

  function getBlocksStream() {
    wsProvider.on("block", async (block) => {
      let newBlock = await wsProvider.getBlock(block);
      setBlocks((blocks) => [
        newBlock,
        ...blocks.filter((block) => block.number !== blocks[9].number),
      ]);
    });
  }

  async function getBlocks() {
    let blockNumbers = [];
    let number = await wsProvider.getBlockNumber();
    console.log("The last block number: " + number);
    for (let i = 0; i < 10; i++) {
      blockNumbers.push(number - i);
    }
    const getBlocksMapArray = blockNumbers.map((number) => {
      return wsProvider.getBlock(number);
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
      {!fetchingBlocks ? (
        <Table blocks={blocks} />
      ) : (
        <div
          css={css`
            margin-top: 40px;
          `}
        >
          <h3> Fetching latest blocks</h3>
          <ClipLoader />
        </div>
      )}
    </div>
  );
};
