import { ethers } from "ethers";

const blocksMap = new Map();

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
export const filterAccordingToTransaction = async (data) => {
  // check if we alredy computed transactions for a perticular block
  if (blocksMap.has(data?.number)) {
    const block = blocksMap.get(data?.number);
    return block?.transactions;
  }
  //clear map when it grows beyond a size
  if (blocksMap.size > 1000) {
    blocksMap.clear();
  }
  const provider = getWeb3Provider();
  const promisesMap = data?.transactions?.map((txHash) =>
    provider.getTransaction(txHash)
  );
  let res = await Promise.all(promisesMap);
  let filteredResult = res.filter((txn) => Number(txn.value._hex) > 0);
  data.transactions = filteredResult;
  blocksMap.set(data?.number, data);
  return filteredResult;
};

/**
 * truncates a string
 * @params {string} anystring
 * @patram {number} lenth of trucated characters
 * @return {string} truncated hex string
 */
export const truncateStr = (str, chars) => {
  if (!str.length) return "";
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
      return "Ropsten Testnet";
    case 4:
      return "Rinkeby Testnet";
    case 5:
      return "Goerli Testnet";
    default:
      return "incorrect chain id!";
  }
};
