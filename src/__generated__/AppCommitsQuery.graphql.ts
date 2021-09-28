/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AppCommitsQueryVariables = {
    name: string;
    owner: string;
    authorId: string;
    after?: string | null;
};
export type AppCommitsQueryResponse = {
    readonly repository: {
        readonly defaultBranchRef: {
            readonly target: {
                readonly history?: {
                    readonly nodes: ReadonlyArray<{
                        readonly message: string;
                        readonly messageBody: string;
                        readonly id: string;
                    } | null> | null;
                    readonly pageInfo: {
                        readonly hasNextPage: boolean;
                        readonly hasPreviousPage: boolean;
                        readonly endCursor: string | null;
                    };
                    readonly totalCount: number;
                };
            };
        } | null;
    } | null;
};
export type AppCommitsQuery = {
    readonly response: AppCommitsQueryResponse;
    readonly variables: AppCommitsQueryVariables;
};



/*
query AppCommitsQuery(
  $name: String!
  $owner: String!
  $authorId: ID!
  $after: String
) {
  repository(name: $name, owner: $owner) {
    defaultBranchRef {
      target {
        __typename
        ... on Commit {
          history(first: 9, author: {id: $authorId}, after: $after) {
            nodes {
              message
              messageBody
              id
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              endCursor
            }
            totalCount
          }
        }
        id
      }
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "authorId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "owner"
},
v4 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
  },
  {
    "kind": "Variable",
    "name": "owner",
    "variableName": "owner"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
        {
          "fields": [
            {
              "kind": "Variable",
              "name": "id",
              "variableName": "authorId"
            }
          ],
          "kind": "ObjectValue",
          "name": "author"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 9
        }
      ],
      "concreteType": "CommitHistoryConnection",
      "kind": "LinkedField",
      "name": "history",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Commit",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "message",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "messageBody",
              "storageKey": null
            },
            (v5/*: any*/)
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
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasPreviousPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
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
      "storageKey": null
    }
  ],
  "type": "Commit",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppCommitsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Ref",
            "kind": "LinkedField",
            "name": "defaultBranchRef",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "target",
                "plural": false,
                "selections": [
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AppCommitsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Ref",
            "kind": "LinkedField",
            "name": "defaultBranchRef",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "target",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1d1d0dca6e585dea45cd5772eb9ec582",
    "id": null,
    "metadata": {},
    "name": "AppCommitsQuery",
    "operationKind": "query",
    "text": "query AppCommitsQuery(\n  $name: String!\n  $owner: String!\n  $authorId: ID!\n  $after: String\n) {\n  repository(name: $name, owner: $owner) {\n    defaultBranchRef {\n      target {\n        __typename\n        ... on Commit {\n          history(first: 9, author: {id: $authorId}, after: $after) {\n            nodes {\n              message\n              messageBody\n              id\n            }\n            pageInfo {\n              hasNextPage\n              hasPreviousPage\n              endCursor\n            }\n            totalCount\n          }\n        }\n        id\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '714e71f5e71b4c3e3b7cb3c06527d44f';
export default node;
