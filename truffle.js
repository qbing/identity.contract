module.exports = {
  networks: {
    testrpc: {
      host: "139.199.180.239",
      port: 8545,
      network_id: "*" // Match any network id
    },
    local: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    development: {
      host: "139.199.180.239",
      port: 9527,
      network_id: "*", // Match any network id
      from: "0xd389f4f0d98b099df1aac3e0c7784c84d13691d0"
    }
  }
};
