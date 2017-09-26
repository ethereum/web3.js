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

/** @file jsonrpc.js
 * @authors:
 *   Fabian Vogelsteller <fabian@ethereum.org>
 *   Marek Kotewicz <marek@ethdev.com>
 *   Aaron Kumavis <aaron@kumavis.me>
 * @date 2015
 */

// Initialize Jsonrpc as a simple object with utility functions.
const Jsonrpc = {
    messageId: 0,

    /**
     * Should be called to valid json create payload object
     *
     * @method toPayload
     * @param {Function} method of jsonrpc call, required
     * @param {Array} params, an array of method params, optional
     * @returns {Object} valid jsonrpc payload object
     */
    toPayload (method, params = []) {
        if (!method) {
            throw new Error(`JSONRPC method should be specified for params: "${JSON.stringify(params)}"!`);
        }

        // advance message ID
        this.messageId += 1;

        return {
            jsonrpc: '2.0',
            id: this.messageId,
            method,
            params,
        };
    },

    /**
     * Should be called to check if jsonrpc response is valid
     *
     * @method isValidResponse
     * @param {Object}
     * @returns {Boolean} true if response is valid, otherwise false
     */
    isValidResponse (response) {
        const validateSingleMessage = message =>
            !!message &&
            !message.error &&
            message.jsonrpc === '2.0' &&
            (typeof message.id === 'number' || typeof message.id === 'string') &&
            message.result !== undefined; // only undefined is not valid json object

        if (Array.isArray(response)) {
            return response.every(validateSingleMessage);
        }

        return validateSingleMessage(response);
    },

    /**
     * Should be called to create batch payload object
     *
     * @method toBatchPayload
     * @param {Array} messages, an array of objects with method (required)
    *     and params (optional) fields
     * @returns {Array} batch payload
     */
    toBatchPayload (messages) {
        return messages.map(message => this.toPayload(message.method, message.params));
    },
};

module.exports = Jsonrpc;
