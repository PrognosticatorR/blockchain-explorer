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

export const getTransaction = (hash) => {
  const provider = getWeb3Provider();
  return new Promise((resolve, reject) => {
    provider.getTransaction(hash, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

// provider.filter("latest", function (error, result) {
//   if (!error) {
//     console.log("Block created ", result);
//     app.watchs.forEach((w) =>
//       getBalance(w.address).then(
//         (r) => (w.balance = web3.fromWei(r, "ether") + " ETH")
//       )
//     );
//     //- filter(result);
//   }
// });

export const filter = async (blockHash) => {
  const provider = getWeb3Provider();

  var block = await getBlock(blockHash);
  var refreshBalanceAddresses = [];
  block.transactions.forEach((txHash) => {
    getTransaction(txHash).then((tx) => {
      var blockNumber = tx.blockNumber;
      var gas = tx.gas;
      var gasPrice = tx.gasPrice;
      var hash = tx.hash;
      var value = tx.value;
      var to = tx.to || "";
      var from = tx.from || "";
      //   app.watchs
      [].forEach((w) => {
        var address = w.address.toLowerCase();
        if (address === to.toLowerCase() || address === from.toLowerCase()) {
          w.txs.push(tx);
        }
      });
    });
  });
};
