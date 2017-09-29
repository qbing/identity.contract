App = {
    web3Provider: null,
    contracts: {},

    localData:{
        //httpProvider:'http://localhost:8545',
        httpProvider:'http://139.199.180.239:8545',
        opaccount:'0x2716eb344548927bff266b16edb10d9c911121f4',//yqtc test account
        //idfactory:'0xe14cae734ac54c7bcecd56190f0d62b361416af4',//idfactory address
        userKey:"0x2716eb344548927bff266b16edb10d9c911121f4",
        delegates:["0x2716eb344548927bff266b16edb10d9c911121f4", "0x2716eb344548927bff266b16edb10d9c911121f4"],
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

        //var password = "12345678";
        //web3.personal.unlockAccount(account, password, 100000);
        App.contracts.IdentityFactory.deployed().then(function(instance) {
            createIdentityInstance = instance;
            console.log("start createIdentity:");
            console.log("IdentityFactory address:" + instance.address);
            console.log(createIdentityInstance);

            return createIdentityInstance.CreateProxyWithControllerAndRecovery(
                    App.localData.userKey,
                    App.localData.delegates,
                    App.localData.longTimeLock,
                    App.localData.shortTimeLock,
                    {from: App.localData.opaccount, gas:4000000}
                    );
        }).then(function(result) {
            console.log("deploy done:");
            console.log(result);
        }).catch(function(err) {
            console.log("deploy error:");
            console.log(err.message);
        });

    }

};

$(function() {
    $(window).load(function() {
        App.init();
    });
});
