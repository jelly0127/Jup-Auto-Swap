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


import * as runtime from '../runtime';
import {
    InlineObject,
    InlineObjectFromJSON,
    InlineObjectToJSON,
    InlineResponse200,
    InlineResponse200FromJSON,
    InlineResponse200ToJSON,
    InlineResponse409,
    InlineResponse409FromJSON,
    InlineResponse409ToJSON,
    InlineResponseDefault,
    InlineResponseDefaultFromJSON,
    InlineResponseDefaultToJSON,
    InlineResponseDefault1,
    InlineResponseDefault1FromJSON,
    InlineResponseDefault1ToJSON,
    InlineResponseDefault2,
    InlineResponseDefault2FromJSON,
    InlineResponseDefault2ToJSON,
} from '../models';

export interface V1IndexedRouteMapGetRequest {
    onlyDirectRoutes?: boolean;
}

export interface V1PriceGetRequest {
    id: string;
    vsToken?: string;
    amount?: number;
}

export interface V1QuoteGetRequest {
    inputMint: string;
    outputMint: string;
    amount: number;
    swapMode?: V1QuoteGetSwapModeEnum;
    slippage?: number;
    feeBps?: number;
    onlyDirectRoutes?: boolean;
}

export interface V1SwapPostRequest {
    body?: InlineObject;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Returns a hash map, input mint as key and an array of valid output mint as values, token mints are indexed to reduce the file size
     */
    async v1IndexedRouteMapGetRaw(requestParameters: V1IndexedRouteMapGetRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<InlineResponseDefault2>> {
        const queryParameters: any = {};

        if (requestParameters.onlyDirectRoutes !== undefined) {
            queryParameters['onlyDirectRoutes'] = requestParameters.onlyDirectRoutes;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/indexed-route-map`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponseDefault2FromJSON(jsonValue));
    }

    /**
     * Returns a hash map, input mint as key and an array of valid output mint as values, token mints are indexed to reduce the file size
     */
    async v1IndexedRouteMapGet(requestParameters: V1IndexedRouteMapGetRequest = {}, initOverrides?: RequestInit): Promise<InlineResponseDefault2> {
        const response = await this.v1IndexedRouteMapGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get simple price for a given input mint, output mint and amount
     * Return simple price
     */
    async v1PriceGetRaw(requestParameters: V1PriceGetRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<InlineResponse200>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling v1PriceGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        if (requestParameters.vsToken !== undefined) {
            queryParameters['vsToken'] = requestParameters.vsToken;
        }

        if (requestParameters.amount !== undefined) {
            queryParameters['amount'] = requestParameters.amount;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/price`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse200FromJSON(jsonValue));
    }

    /**
     * Get simple price for a given input mint, output mint and amount
     * Return simple price
     */
    async v1PriceGet(requestParameters: V1PriceGetRequest, initOverrides?: RequestInit): Promise<InlineResponse200> {
        const response = await this.v1PriceGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get quote for a given input mint, output mint and amount
     * Return route
     */
    async v1QuoteGetRaw(requestParameters: V1QuoteGetRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<InlineResponseDefault>> {
        if (requestParameters.inputMint === null || requestParameters.inputMint === undefined) {
            throw new runtime.RequiredError('inputMint','Required parameter requestParameters.inputMint was null or undefined when calling v1QuoteGet.');
        }

        if (requestParameters.outputMint === null || requestParameters.outputMint === undefined) {
            throw new runtime.RequiredError('outputMint','Required parameter requestParameters.outputMint was null or undefined when calling v1QuoteGet.');
        }

        if (requestParameters.amount === null || requestParameters.amount === undefined) {
            throw new runtime.RequiredError('amount','Required parameter requestParameters.amount was null or undefined when calling v1QuoteGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.inputMint !== undefined) {
            queryParameters['inputMint'] = requestParameters.inputMint;
        }

        if (requestParameters.outputMint !== undefined) {
            queryParameters['outputMint'] = requestParameters.outputMint;
        }

        if (requestParameters.amount !== undefined) {
            queryParameters['amount'] = requestParameters.amount;
        }

        if (requestParameters.swapMode !== undefined) {
            queryParameters['swapMode'] = requestParameters.swapMode;
        }

        if (requestParameters.slippage !== undefined) {
            queryParameters['slippage'] = requestParameters.slippage;
        }

        if (requestParameters.feeBps !== undefined) {
            queryParameters['feeBps'] = requestParameters.feeBps;
        }

        if (requestParameters.onlyDirectRoutes !== undefined) {
            queryParameters['onlyDirectRoutes'] = requestParameters.onlyDirectRoutes;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/quote`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponseDefaultFromJSON(jsonValue));
    }

    /**
     * Get quote for a given input mint, output mint and amount
     * Return route
     */
    async v1QuoteGet(requestParameters: V1QuoteGetRequest, initOverrides?: RequestInit): Promise<InlineResponseDefault> {
        const response = await this.v1QuoteGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * [DEPRECATED] use /indexed-route-map Returns a hash map, input mint as key and an array of valid output mint as values
     */
    async v1RouteMapGetRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/route-map`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * [DEPRECATED] use /indexed-route-map Returns a hash map, input mint as key and an array of valid output mint as values
     */
    async v1RouteMapGet(initOverrides?: RequestInit): Promise<void> {
        await this.v1RouteMapGetRaw(initOverrides);
    }

    /**
     * Get swap serialized transactions for a route
     * Return setup, swap and cleanup transactions
     */
    async v1SwapPostRaw(requestParameters: V1SwapPostRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<InlineResponseDefault1>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/swap`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InlineObjectToJSON(requestParameters.body),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponseDefault1FromJSON(jsonValue));
    }

    /**
     * Get swap serialized transactions for a route
     * Return setup, swap and cleanup transactions
     */
    async v1SwapPost(requestParameters: V1SwapPostRequest = {}, initOverrides?: RequestInit): Promise<InlineResponseDefault1> {
        const response = await this.v1SwapPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum V1QuoteGetSwapModeEnum {
    ExactIn = 'ExactIn',
    ExactOut = 'ExactOut'
}
