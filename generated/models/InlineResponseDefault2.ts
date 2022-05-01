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
/**
 * Default response
 * @export
 * @interface InlineResponseDefault2
 */
export interface InlineResponseDefault2 {
    /**
     * Base64 encoded transaction
     * @type {string}
     * @memberof InlineResponseDefault2
     */
    setupTransaction?: string;
    /**
     * Base64 encoded transaction
     * @type {string}
     * @memberof InlineResponseDefault2
     */
    swapTransaction?: string;
    /**
     * Base64 encoded transaction
     * @type {string}
     * @memberof InlineResponseDefault2
     */
    cleanupTransaction?: string;
}

export function InlineResponseDefault2FromJSON(json: any): InlineResponseDefault2 {
    return InlineResponseDefault2FromJSONTyped(json, false);
}

export function InlineResponseDefault2FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponseDefault2 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'setupTransaction': !exists(json, 'setupTransaction') ? undefined : json['setupTransaction'],
        'swapTransaction': !exists(json, 'swapTransaction') ? undefined : json['swapTransaction'],
        'cleanupTransaction': !exists(json, 'cleanupTransaction') ? undefined : json['cleanupTransaction'],
    };
}

export function InlineResponseDefault2ToJSON(value?: InlineResponseDefault2 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'setupTransaction': value.setupTransaction,
        'swapTransaction': value.swapTransaction,
        'cleanupTransaction': value.cleanupTransaction,
    };
}

