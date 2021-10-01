/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RepoSelectorQueryVariables = {};
export type RepoSelectorQueryResponse = {
    readonly viewer: {
        readonly repositories: {
            readonly nodes: ReadonlyArray<{
                readonly isPrivate: boolean;
                readonly id: string;
                readonly name: string;
            } | null> | null;
            readonly pageInfo: {
                readonly endCursor: string | null;
                readonly hasNextPage: boolean;
            };
            readonly totalCount: number;
        };
    };
};
export type RepoSelectorQuery = {
    readonly response: RepoSelectorQueryResponse;
    readonly variables: RepoSelectorQueryVariables;
};



/*
query RepoSelectorQuery {
  viewer {
    repositories(first: 100, privacy: PUBLIC, orderBy: {direction: ASC, field: CREATED_AT}) {
      nodes {
        isPrivate
        id
        name
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "first",
      "value": 100
    },
    {
      "kind": "Literal",
      "name": "orderBy",
      "value": {
        "direction": "ASC",
        "field": "CREATED_AT"
      }
    },
    {
      "kind": "Literal",
      "name": "privacy",
      "value": "PUBLIC"
    }
  ],
  "concreteType": "RepositoryConnection",
  "kind": "LinkedField",
  "name": "repositories",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Repository",
      "kind": "LinkedField",
      "name": "nodes",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isPrivate",
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PageInfo",
      "kind": "LinkedField",
      "name": "pageInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "endCursor",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hasNextPage",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalCount",
      "storageKey": null
    }
  ],
  "storageKey": "repositories(first:100,orderBy:{\"direction\":\"ASC\",\"field\":\"CREATED_AT\"},privacy:\"PUBLIC\")"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RepoSelectorQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RepoSelectorQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b3742dc8fd52956a5804fc1b48768c88",
    "id": null,
    "metadata": {},
    "name": "RepoSelectorQuery",
    "operationKind": "query",
    "text": "query RepoSelectorQuery {\n  viewer {\n    repositories(first: 100, privacy: PUBLIC, orderBy: {direction: ASC, field: CREATED_AT}) {\n      nodes {\n        isPrivate\n        id\n        name\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      totalCount\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '3cd7b9279d67835d20cf868eb8adc082';
export default node;
