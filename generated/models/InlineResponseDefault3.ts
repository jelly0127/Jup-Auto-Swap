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
 * @interface InlineResponseDefault3
 */
export interface InlineResponseDefault3 {
    /**
     * All the mints that are indexed to match in indexedRouteMap
     * @type {Array<string>}
     * @memberof InlineResponseDefault3
     */
    mintKeys?: Array<string>;
    /**
     * All the possible route and their corresponding output mints
     * @type {{ [key: string]: Array<number>; }}
     * @memberof InlineResponseDefault3
     */
    indexedRouteMap?: { [key: string]: Array<number>; };
}

export function InlineResponseDefault3FromJSON(json: any): InlineResponseDefault3 {
    return InlineResponseDefault3FromJSONTyped(json, false);
}

export function InlineResponseDefault3FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponseDefault3 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'mintKeys': !exists(json, 'mintKeys') ? undefined : json['mintKeys'],
        'indexedRouteMap': !exists(json, 'indexedRouteMap') ? undefined : json['indexedRouteMap'],
    };
}

export function InlineResponseDefault3ToJSON(value?: InlineResponseDefault3 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'mintKeys': value.mintKeys,
        'indexedRouteMap': value.indexedRouteMap,
    };
}

