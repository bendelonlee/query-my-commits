import React, { useState } from 'react';
import './App.css';
import { graphql } from 'babel-plugin-relay/macro';
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
  
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import CommitData from './CommitData';
import CommitWordcloud from './CommitWordcloud';
import RepoSelector from './components/RepoSelector';

const { Suspense } = React;
const variables = {
  "name": "",
  "owner": "bendelonlee",
  "authorId": "MDQ6VXNlcjQxNjQ1Nzcx",
}
// Define a query
const repoCommitsQuery = graphql`
query AppCommitsQuery($name: String!, $owner: String!, $authorId: ID!, $after: String) {
  repository(name: $name, owner: $owner) {
    defaultBranchRef {
      target {
        ... on Commit {
          history(author: {id: $authorId}, after: $after) {
            nodes {
              message
              messageBody
              oid
            }
            pageInfo {
                
              hasNextPage
              hasPreviousPage
              endCursor
            }
            totalCount
          }
        }
      }
    }
  }
}
`


// Immediately load the query as our app starts. For a real app, we'd move this
// into our routing configuration, preloading data as we transition to new routes.


// Inner component that reads the preloaded query results via `usePreloadedQuery()`.
// This works as follows:
// - If the query has completed, it returns the results of the query.
// - If the query is still pending, it "suspends" (indicates to React that the
//   component isn't ready to render yet). This will show the nearest <Suspense>
//   fallback.
// - If the query failed, it throws the failure error. For simplicity we aren't
//   handling the failure case here.
function App(props: any) {

  
  const [selectedRepos, setSelectedRepos] = useState(new Set<string>(['backend_prework']))
  const [commitData, setCommitData] = useState(new CommitData())
  const [lastSelectedRepo, setLastSelectedRepo] = useState('backend_prework')
  const preloadedQuery = loadQuery(RelayEnvironment, repoCommitsQuery, 
    {...variables, name: lastSelectedRepo},
  );
  const data : any = usePreloadedQuery(repoCommitsQuery, preloadedQuery)
  const commits = data.repository.defaultBranchRef.target.history.nodes;
  commitData.addCommits(commits, 'fooId', data.repository.defaultBranchRef.target.history.pageInfo.endCursor)
  
  // const commitData = CommitData.fromStorage();
  
  console.log(commitData.wordFrequencies);
  return (
    <div className="App">
      <RepoSelector selectedRepos={selectedRepos} setSelectedRepos={setSelectedRepos} setLastSelectedRepo={setLastSelectedRepo}/>
      <CommitWordcloud commitData={commitData}/>
    </div>
  );
}

// The above component needs to know how to access the Relay environment, and we
// need to specify a fallback in case it suspends:
// - <RelayEnvironmentProvider> tells child components how to talk to the current
//   Relay Environment instance
// - <Suspense> specifies a fallback in case a child suspends.
function AppRoot(props: any) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'Loading...'}>
        <App />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;