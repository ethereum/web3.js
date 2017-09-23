/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file index.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */

import _ from 'lodash';
import swarm from 'swarm-js';

let givenProvider = null;
if (typeof ethereumProvider !== 'undefined' && ethereumProvider.bzz) {
  givenProvider = ethereumProvider.bzz;
}

export default class Bzz {
  static givenProvider = givenProvider

  givenProvider = null
  provider = null
  pick = null

  constructor (p) {
    this.givenProvider = Bzz.givenProvider;

    let provider = p;
    if (provider && provider._requestManager) {
      provider = provider.currentProvider;
    }

    // only allow file picker when in browser
    if (typeof document !== 'undefined') {
      this.pick = swarm.pick;
    }

    this.setProvider(provider);
  }

  setProvider (_provider) {
    let provider = _provider;

    // is ethereum provider
    if (_.isObject(provider) && _.isString(provider.bzz)) {
      provider = provider.bzz;
    }

    // else if(!_.isString(provider)) {
    //   // is no string, set default
    //   provider = 'http://swarm-gateways.net'; // default to gateway
    // }

    if (!_.isString(provider)) {
      this.currentProvider = null;
      return false;
    }

    // add functions
    this.provider = provider;
    this.download = swarm.at(provider).download;
    this.upload = swarm.at(provider).upload;
    this.isAvailable = swarm.at(provider).isAvailable;
    return true;
  }
}
