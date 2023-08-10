/* tslint:disable */
/* eslint-disable */
/**
 * Jupiter API v6
 * The core of [jup.ag](https://jup.ag). Easily get a quote and swap through Jupiter API.  ### Rate Limit The rate limit is 50 requests / 10 seconds. If you need a higher rate limit, feel free to contact us on [#developer-support](https://discord.com/channels/897540204506775583/910250162402779146) on Discord.  ### API Wrapper - Typescript [@jup-ag/api](https://github.com/jup-ag/jupiter-quote-api-node) 
 *
 * The version of the OpenAPI document: 6.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface TransactionObjectAccountsInner
 */
export interface TransactionObjectAccountsInner {
    /**
     * 
     * @type {string}
     * @memberof TransactionObjectAccountsInner
     */
    pubkey?: string;
    /**
     * 
     * @type {boolean}
     * @memberof TransactionObjectAccountsInner
     */
    isSigner?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof TransactionObjectAccountsInner
     */
    isWritable?: boolean;
}

/**
 * Check if a given object implements the TransactionObjectAccountsInner interface.
 */
export function instanceOfTransactionObjectAccountsInner(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TransactionObjectAccountsInnerFromJSON(json: any): TransactionObjectAccountsInner {
    return TransactionObjectAccountsInnerFromJSONTyped(json, false);
}

export function TransactionObjectAccountsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionObjectAccountsInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'pubkey': !exists(json, 'pubkey') ? undefined : json['pubkey'],
        'isSigner': !exists(json, 'isSigner') ? undefined : json['isSigner'],
        'isWritable': !exists(json, 'isWritable') ? undefined : json['isWritable'],
    };
}

export function TransactionObjectAccountsInnerToJSON(value?: TransactionObjectAccountsInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'pubkey': value.pubkey,
        'isSigner': value.isSigner,
        'isWritable': value.isWritable,
    };
}

