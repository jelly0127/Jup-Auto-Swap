/* tslint:disable */
/* eslint-disable */
/**
 * Jupiter API
 * Jupiter quote and swap API
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    V1SwapRoute,
    V1SwapRouteFromJSON,
    V1SwapRouteFromJSONTyped,
    V1SwapRouteToJSON,
} from './V1SwapRoute';

/**
 * 
 * @export
 * @interface InlineObject
 */
export interface InlineObject {
    /**
     * 
     * @type {V1SwapRoute}
     * @memberof InlineObject
     */
    route?: V1SwapRoute;
    /**
     * Wrap/unwrap SOL
     * @type {boolean}
     * @memberof InlineObject
     */
    wrapUnwrapSOL?: boolean;
    /**
     * fee account
     * @type {string}
     * @memberof InlineObject
     */
    feeAccount?: string;
    /**
     * custom token ledger account
     * @type {string}
     * @memberof InlineObject
     */
    tokenLedger?: string;
    /**
     * Public key of the user
     * @type {string}
     * @memberof InlineObject
     */
    userPublicKey?: string;
}

export function InlineObjectFromJSON(json: any): InlineObject {
    return InlineObjectFromJSONTyped(json, false);
}

export function InlineObjectFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'route': !exists(json, 'route') ? undefined : V1SwapRouteFromJSON(json['route']),
        'wrapUnwrapSOL': !exists(json, 'wrapUnwrapSOL') ? undefined : json['wrapUnwrapSOL'],
        'feeAccount': !exists(json, 'feeAccount') ? undefined : json['feeAccount'],
        'tokenLedger': !exists(json, 'tokenLedger') ? undefined : json['tokenLedger'],
        'userPublicKey': !exists(json, 'userPublicKey') ? undefined : json['userPublicKey'],
    };
}

export function InlineObjectToJSON(value?: InlineObject | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'route': V1SwapRouteToJSON(value.route),
        'wrapUnwrapSOL': value.wrapUnwrapSOL,
        'feeAccount': value.feeAccount,
        'tokenLedger': value.tokenLedger,
        'userPublicKey': value.userPublicKey,
    };
}

