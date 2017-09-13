const ArrayLib = artifacts.require('./libs/ArrayLib.sol')
const IdentityFactory = artifacts.require('./IdentityFactory.sol')
const IdentityFactoryWithRecoveryKey = artifacts.require('./IdentityFactoryWithRecoveryKey.sol')

const RecoveryQuorum = artifacts.require('./RecoveryQuorum.sol')

module.exports = function (deployer, network) {
  deployer.deploy(ArrayLib)
  deployer.link(ArrayLib, [RecoveryQuorum, IdentityFactory])
  deployer.deploy(IdentityFactory)
  deployer.deploy(IdentityFactoryWithRecoveryKey)
}
