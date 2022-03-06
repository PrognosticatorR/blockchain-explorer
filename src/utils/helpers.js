import { ethers } from "ethers";

export const getWeb3Provider = (type) => {
  if (type === "websocket") {
    return new ethers.providers.WebSocketProvider(
      process.env.REACT_APP_WS_RPC_URL
    );
  }

  return new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
};

export const getBalance = (address) => {
  const provider = getWeb3Provider();
  return new Promise((resolve, reject) => {
    provider.getBalance(address, (error, result) => {
      if (error) reject(error);
      else resolve(result.toString(10));
    });
  });
};

export const getBlockNumber = () => {
  const provider = getWeb3Provider();
  console.log(provider);
  return new Promise((resolve, reject) => {
    provider.getBlockNumber((error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

export const getBlock = (hashStringOrBlockNumber) => {
  const provider = getWeb3Provider();
  return new Promise((resolve, reject) => {
    provider.getBlock(hashStringOrBlockNumber, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

export const getTransaction = async (hash) => {
  const provider = getWeb3Provider();
  return await provider.getTransaction(hash);
};

export const filterAccordingToTransaction = async (transactionHashes) => {
  const provider = getWeb3Provider();
  const promisesMap = transactionHashes.map((txHash) =>
    provider.getTransaction(txHash)
  );
  let res = await Promise.allSettled(promisesMap);
  let filteredResult = res.filter((txn) => Number(txn.value.value._hex) > 0);
  return filteredResult;
};
// export const filterAccordingToTransaction = async (blockHash) => {
//   const provider = getWeb3Provider();
//   let block = await getBlock(blockHash);
//   let refreshBalanceAddresses = [];
//   block.transactions.forEach((txHash) => {
//     getTransaction(txHash).then((tx) => {
//       let blockNumber = tx.blockNumber;
//       let gas = tx.gas;
//       let gasPrice = tx.gasPrice;
//       let hash = tx.hash;
//       let value = tx.value;
//       let to = tx.to || "";
//       let from = tx.from || "";
//       //   app.watchs
//       [].forEach((w) => {
//         let address = w.address.toLowerCase();
//         if (address === to.toLowerCase() || address === from.toLowerCase()) {
//           w.txs.push(tx);
//         }
//       });
//     });
//   });
// };

export const truncateStr = (str, chars) => {
  return (
    str.slice(0, Math.ceil(chars / 2)) +
    "..." +
    str.slice(str.length - Math.floor(chars / 2))
  );
};
