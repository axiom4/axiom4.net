/**
 * Axiom4.net API
 * API app Axiom4.net
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { PostPreview } from './postPreview';


export interface ListPosts200Response { 
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<PostPreview>;
}

