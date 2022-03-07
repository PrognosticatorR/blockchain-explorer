import { ethers } from "ethers";

/**
 * get node provider
 * @param {string} type
 * @return {object} JsonRpcProvider
 */
export const getWeb3Provider = (type) => {
  if (type === "websocket") {
    return new ethers.providers.WebSocketProvider(
      process.env.REACT_APP_WS_RPC_URL
    );
  }
  return new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
};

/**
 * get latest block number
 * @return {number} BlockNumber
 */
export const getBlockNumber = async () => {
  const provider = getWeb3Provider();
  const data = await provider.getBlockNumber();
  return data;
};

/**
 * gets block info for a perticular block
 * @params {string | number} hashstring/blockNumber
 * @return {object} BlockInfo
 */
export const getBlock = async (hashStringOrBlockNumber) => {
  const provider = getWeb3Provider();
  return await provider.getBlock(hashStringOrBlockNumber);
};

/**
 * gets transaction details for a perticular transaction
 * @params {string} hashstring
 * @return {object} transaction info
 */
export const getTransaction = async (hash) => {
  const provider = getWeb3Provider();
  return await provider.getTransaction(hash);
};

/**
 * filters eth sending transactions only
 * @params {string} hashstring
 * @return {object[]} transactions
 */
export const filterAccordingToTransaction = async (transactionHashes) => {
  const provider = getWeb3Provider();
  const promisesMap = transactionHashes.map((txHash) =>
    provider.getTransaction(txHash)
  );
  let res = await Promise.allSettled(promisesMap);
  let filteredResult = res.filter((txn) => Number(txn.value.value._hex) > 0);
  return filteredResult;
};

/**
 * truncates a string
 * @params {string} anystring
 * @patram {number} lenth of trucated characters
 * @return {string} truncated hex string
 */
export const truncateStr = (str, chars) => {
  return (
    str.slice(0, Math.ceil(chars / 2)) +
    "..." +
    str.slice(str.length - Math.floor(chars / 2))
  );
};

/**
 * gets network name by chainId
 * @params {number} chainId
 * @return {string} network name
 */
export const convertChainIdToNetworkName = (chainId) => {
  switch (chainId) {
    case 1:
      return "ETH Mainnet";
    case 3:
      return "Ropsten Teatnet";
    case 4:
      return "Rinkeby Teatnet";
    case 5:
      return "Goerli Teatnet";
    default:
      return "incorrect chain id!";
  }
};
