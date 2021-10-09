import CommitData from "./CommitData";
import ReactWordcloud, { Scale } from 'react-wordcloud';
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
  
} from 'react-relay/hooks';
import internal from "stream";
import useWindowDimensions from "./hooks/useWindowDimensions";
import RelayEnvironment from "./RelayEnvironment";
import { Suspense } from "react";
import { graphql } from "babel-plugin-relay/macro";

const repoCommitsQuery = graphql`
query CommitWordcloudCommitsQuery($name: String!, $owner: String!, $authorId: ID!, $after: String) {
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

const callbacks = {
    
    // getWordColor: (word: any)=> word.value > 50 ? "white" : "white",
    // onWordClick: console.log,
    // onWordMouseOver: console.log,
    // getWordTooltip: (word: any) => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
  }
  const options: ReactWordCloudOptions = {
    rotations: 0,
    rotationAngles: [-90, 0],
  };
  const size: [number, number] = [1600, 1000];
   
function CommitWordcloud(props: {commitData: CommitData, lastSelectedRepo: string}) {
    const preloadedQuery = loadQuery(RelayEnvironment, repoCommitsQuery, 
      {...variables, name: props.lastSelectedRepo},
    );
    const data : any = usePreloadedQuery(repoCommitsQuery, preloadedQuery)
    if(!props.commitData.addedRepoNames.has(props.lastSelectedRepo)){
      const commits = data.repository?.defaultBranchRef?.target.history.nodes;
      if(commits != null){
        props.commitData.addCommits(commits, props.lastSelectedRepo, data.repository.defaultBranchRef.target.history.pageInfo.endCursor)
      }
    }
    
    const {height, width} = useWindowDimensions();
    return (
      <ReactWordcloud
        callbacks={{
          getWordTooltip: () => undefined,
          getWordColor: (word: any) => ["#B4C2D6", "#BFE3DA", "#F5FCDC", "#FEFFF7", "#C0DDBE"][Math.floor(Math.random() * 5)]
        }}
        options={{
          
          padding: 0,
          scale: 'linear',
          rotations: 0,
          fontFamily: 'monospace',
          fontSizes: [10, 100]
        }}
        size={[width - 320, height]}
        words={props.commitData.toWordCloudArray()}
      />
    );
  }

const variables = {
    "name": "",
    "owner": "bendelonlee",
    "authorId": "MDQ6VXNlcjQxNjQ1Nzcx",
}


interface ReactWordCloudOptions {
  
  rotations: number,
  rotationAngles: [number, number]
}

export default function ComponentRoot(props: {commitData: CommitData, lastSelectedRepo: string}): JSX.Element{
  return <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'Loading...'}>
        <CommitWordcloud {...props}/>
      </Suspense>
    </RelayEnvironmentProvider>
}