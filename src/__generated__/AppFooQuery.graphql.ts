/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AppFooQueryVariables = {
    name: string;
    owner: string;
};
export type AppFooQueryResponse = {
    readonly repository: {
        readonly name: string;
    } | null;
};
export type AppFooQuery = {
    readonly response: AppFooQueryResponse;
    readonly variables: AppFooQueryVariables;
};



/*
query AppFooQuery(
  $name: String!
  $owner: String!
) {
  repository(name: $name, owner: $owner) {
    name
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "owner"
  }
],
v1 = [
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AppFooQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AppFooQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a9eb68da40e387113f95e3061c161ddb",
    "id": null,
    "metadata": {},
    "name": "AppFooQuery",
    "operationKind": "query",
    "text": "query AppFooQuery(\n  $name: String!\n  $owner: String!\n) {\n  repository(name: $name, owner: $owner) {\n    name\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '8336e346b6295089c16ac2c95bc195cb';
export default node;
