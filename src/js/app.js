App = {
    web3Provider: null,
    contracts: {},

    localData:{
        //httpProvider:'http://localhost:8545',
        httpProvider:'http://139.199.180.239:9527',
        userKey:"0x5d931ee908a0134698f93d1f1d5ec4edbdc074f7",
        delegates:["0x221e35a7a795083abdfb9cc6c44b976d8ba3c869"],
        longTimeLock: 86400,
        shortTimeLock: 7200,
    },
    
    init: function() {
        // Load Address.
        // ...
        console.log("init ...");

        return App.initWeb3();
    },

    initWeb3: function() {
        // Initialize web3 and set the provider to the testRPC.
        if (false){//typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            var Web3 = require('web3');
            web3 = new Web3();

            // set the provider you want from Web3.providers
            App.web3Provider = new web3.providers.HttpProvider(App.localData.httpProvider);
            web3.setProvider(App.web3Provider);
        }
        return App.initContract();
    },

    initContract: function() {
        $.getJSON('IdentityFactory.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            var IdentityFactoryArtifact = data;
            App.contracts.IdentityFactory = TruffleContract(IdentityFactoryArtifact);

            // Set the provider for our contract.
            App.contracts.IdentityFactory.setProvider(App.web3Provider);
            console.log("IdentityFactory:")
            console.log(App.contracts.IdentityFactory);
        });
        console.log("init done");
        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', '#createIdentity', App.createIdentity);
    },

    createIdentity: function() {
        event.preventDefault();
        console.log("createIdentity ...");

        var createIdentityInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
                return;
            }

            var account = accounts[0];
            var password = "12345678";

            web3.personal.unlockAccount(account, password, 100000);
            App.contracts.IdentityFactory.deployed().then(function(instance) {
                createIdentityInstance = instance;
                console.log("start createIdentity:");
                console.log(createIdentityInstance);

                return createIdentityInstance.CreateProxyWithControllerAndRecovery(
                    App.localData.userKey,
                    App.localData.delegates,
                    App.localData.longTimeLock,
                    App.localData.shortTimeLock,
                    {from: account, to:'0xc8035fb56b1e90afdbb456543f5e9a42349359e0', gas:4000000}
                    );
            }).then(function(result) {
                console.log("deploy done:");
                console.log(result);
            }).catch(function(err) {
                console.log("deploy error:");
                console.log(err.message);
            });
        });
    }

};

$(function() {
    $(window).load(function() {
        App.init();
    });
});
