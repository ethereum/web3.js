var testMethod = require("./helpers/test.method.js");

var method = "getWork";

var tests = [
    {
        args: [],
        formattedArgs: [],
        result: true,
        formattedResult: true,
        call: "eth_" + method
    }
];

testMethod.runTests("eth", method, tests);
