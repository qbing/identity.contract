pragma solidity 0.4.15;
import "./RecoveryQuorum.sol";


contract IdentityFactory {
    mapping(address => address) public senderToProxy;
    event IdentityCreated(
        address indexed userKey,
        address proxy,
        address controller,
        address recoveryQuorum);


    //cost ~2.4M gas
    function CreateProxyWithControllerAndRecovery(address userKey, address[] delegates, uint longTimeLock, uint shortTimeLock) {
        require(senderToProxy[userKey] == address(0x0));
        Proxy proxy = new Proxy();
        RecoverableController controller = new RecoverableController(proxy, userKey, longTimeLock, shortTimeLock);
        proxy.transfer(controller);
        RecoveryQuorum recoveryQuorum = new RecoveryQuorum(controller, delegates);
        controller.changeRecoveryFromRecovery(recoveryQuorum);

        IdentityCreated(userKey, proxy, controller, recoveryQuorum);
        senderToProxy[userKey] = proxy;
    }
}
