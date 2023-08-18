/**
 * Axiom4.net API
 * API app Axiom4.net
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface User { 
    readonly id?: number;
    readonly url?: string;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    first_name?: string;
    last_name?: string;
    email?: string;
}

