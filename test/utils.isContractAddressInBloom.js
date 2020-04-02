var chai = require('chai');
var utils = require('../packages/web3-utils');

var assert = chai.assert;

var tests = [
    {value: '0x08200081a06415012858022200cc48143008908c0000824e5405b41520795989024800380a8d4b198910b422b231086c3a62cc40' +
            '2e2573070306f180446440ad401016c3e30781115844d028c89028008a12240c0a2c184c0425b90d7af0530002f981221aa5658091' +
            '32000818c82805023a132a25150400010530ba0080420a10a137054454021882505080a6b6841082d84151010400ba8100c8802d44' +
            '0d060388084052c1300105a0868410648a40540c0f0460e190400807008914361118000a5202e94445ccc088311050052c80028072' +
            '05212a090d90ba428030266024a910644b1042011aaae05391cc2094c45226400000380880241282ce4e12518c'}
];

describe('lib/utils/utils', function () {
    describe('isUserEthereumAddressInBloom', function () {
        tests.forEach(function (tests) {
            it( `should turn boolean `, function () {
                    assert.isBoolean(utils.isContractAddressInBloom(tests.value, '0x494bfa3a4576ba6cfe835b0deb78834f0c3e3994'));
            });
        });
    });
});
