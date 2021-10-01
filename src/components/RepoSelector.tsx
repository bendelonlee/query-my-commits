import { graphql } from "babel-plugin-relay/macro"
import { Dispatch, SetStateAction } from "react"
import { QueryRenderer } from "react-relay"
import RelayEnvironment from "../RelayEnvironment"
import { RepoSelectorQuery } from "./__generated__/RepoSelectorQuery.graphql"

export interface RepoSelectorProps {
    repoName: string;
    setRepoName: Dispatch<SetStateAction<string>>;
}

function RepoSelector({repoName, setRepoName}: RepoSelectorProps){
    return <div>    
        <QueryRenderer<RepoSelectorQuery>
            environment={RelayEnvironment}
            query={reposQuery}
            variables={{}}
            render={({ error, props: response, retry }) => {
                return (
                  <p>repos</p>
                );
            }}
        />
        <p>{repoName}</p>
    </div>
}

export const reposQuery = graphql`
query RepoSelectorQuery {
        viewer {
        repositories(first: 100, 
            privacy: PUBLIC
            orderBy: {
                direction: ASC
                field: CREATED_AT
            }
            )       {
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
        }
}
`


export default RepoSelector