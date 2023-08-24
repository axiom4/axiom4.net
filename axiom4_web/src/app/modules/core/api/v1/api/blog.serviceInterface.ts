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
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { Category } from '../model/models';
import { Group } from '../model/models';
import { ListPosts200Response } from '../model/models';
import { Page } from '../model/models';
import { Post } from '../model/models';
import { User } from '../model/models';


import { Configuration }                                     from '../configuration';


export interface ListPostsRequestParams {
    page?: number;
    pageSize?: number;
    categoriesName?: string;
    search?: string;
    ordering?: string;
}

export interface RetrieveCategoryRequestParams {
    id: string;
}

export interface RetrieveGroupRequestParams {
    id: string;
}

export interface RetrievePageRequestParams {
    tag: string;
}

export interface RetrievePostRequestParams {
    id: string;
    categoriesName?: string;
    search?: string;
    ordering?: string;
}

export interface RetrieveUserRequestParams {
    id: string;
}


export interface BlogServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * 
     * API endpoint that allows groups to be viewed or edited.
*/
    listCategorys(extraHttpRequestParams?: any): Observable<Array<Category>>;

    /**
     * 
     * API endpoint that allows groups to be viewed or edited.
*/
    listGroups(extraHttpRequestParams?: any): Observable<Array<Group>>;

    /**
     * 
     * 
*/
    listPages(extraHttpRequestParams?: any): Observable<Array<Page>>;

    /**
     * 
     * 
* @param requestParameters
     */
    listPosts(requestParameters: ListPostsRequestParams, extraHttpRequestParams?: any): Observable<ListPosts200Response>;

    /**
     * 
     * API endpoint that allows users to be viewed or edited.
*/
    listUsers(extraHttpRequestParams?: any): Observable<Array<User>>;

    /**
     * 
     * API endpoint that allows groups to be viewed or edited.
* @param requestParameters
     */
    retrieveCategory(requestParameters: RetrieveCategoryRequestParams, extraHttpRequestParams?: any): Observable<Category>;

    /**
     * 
     * API endpoint that allows groups to be viewed or edited.
* @param requestParameters
     */
    retrieveGroup(requestParameters: RetrieveGroupRequestParams, extraHttpRequestParams?: any): Observable<Group>;

    /**
     * 
     * 
* @param requestParameters
     */
    retrievePage(requestParameters: RetrievePageRequestParams, extraHttpRequestParams?: any): Observable<Page>;

    /**
     * 
     * 
* @param requestParameters
     */
    retrievePost(requestParameters: RetrievePostRequestParams, extraHttpRequestParams?: any): Observable<Post>;

    /**
     * 
     * API endpoint that allows users to be viewed or edited.
* @param requestParameters
     */
    retrieveUser(requestParameters: RetrieveUserRequestParams, extraHttpRequestParams?: any): Observable<User>;

}
