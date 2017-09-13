module.exports = {
  networks: {
    local: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    development: {
      host: "139.199.180.239",
      port: 9527,
      network_id: "*" // Match any network id
    }
  }
};
