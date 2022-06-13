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
    InlineResponse409Data,
    InlineResponse409DataFromJSON,
    InlineResponse409DataFromJSONTyped,
    InlineResponse409DataToJSON,
} from './InlineResponse409Data';

/**
 * Duplicate symbol found for input or vsToken. The server will respond an error structure which contains the conflict addresses. User will have to use address mode instead.
 * @export
 * @interface InlineResponse409
 */
export interface InlineResponse409 {
    /**
     * 
     * @type {InlineResponse409Data}
     * @memberof InlineResponse409
     */
    data?: InlineResponse409Data;
}

export function InlineResponse409FromJSON(json: any): InlineResponse409 {
    return InlineResponse409FromJSONTyped(json, false);
}

export function InlineResponse409FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse409 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : InlineResponse409DataFromJSON(json['data']),
    };
}

export function InlineResponse409ToJSON(value?: InlineResponse409 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': InlineResponse409DataToJSON(value.data),
    };
}

