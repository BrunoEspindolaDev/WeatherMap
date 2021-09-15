import {Resource} from 'types/common';

export declare namespace GetByQuery {
  export interface Response {
    authenticationResultCode: string;
    brandLogoUri: string;
    copyright: string;
    resourceSets: {estimedTotal: number; resources: Resource[]}[];
    statusCode: number;
    statusDescription: string;
    traceId: string;
  }
}
