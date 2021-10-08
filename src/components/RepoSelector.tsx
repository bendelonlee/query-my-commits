import { graphql } from "babel-plugin-relay/macro"
import { Dispatch, SetStateAction, useState } from "react"
import { QueryRenderer } from "react-relay"
import RelayEnvironment from "../RelayEnvironment"
import RepoCheckboxItem from "./RepoCheckboxItem"
import { RepoSelectorQuery, RepoSelectorQueryResponse } from "./__generated__/RepoSelectorQuery.graphql"

export interface RepoSelectorProps {
    selectedRepos: Set<string>;
    setSelectedRepos: Dispatch<SetStateAction<Set<string>>>;
    setLastSelectedRepo: Dispatch<SetStateAction<string>>;
}

function RepoSelector({selectedRepos, setSelectedRepos, setLastSelectedRepo}: RepoSelectorProps){
    return <div>
        <QueryRenderer<RepoSelectorQuery>
            environment={RelayEnvironment}
            query={reposQuery}
            variables={{}}
            render={({ error, props: response, retry }) => {
                return (
                    <InnerComponent 
                        loadingError={error} 
                        response={response} 
                        refetch={retry} 
                        setLastSelectedRepo={setLastSelectedRepo}
                        setSelectedRepos={setSelectedRepos} 
                        selectedRepos={selectedRepos}/>
                );
            }}
        />
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

interface Props {
    response: Nullable<RepoSelectorQueryResponse>;
    loadingError: Nullable<Error>;
    refetch?: Nullable<() => void>;
    selectedRepos: Set<string>,
    setSelectedRepos: Dispatch<SetStateAction<Set<string>>>
    setLastSelectedRepo: Dispatch<SetStateAction<string>>;
}
type Nullable<T> = null | T;


function InnerComponent(props: Props): JSX.Element {
    const { response, loadingError, refetch, setSelectedRepos } = props;
    const repos = response?.viewer.repositories.nodes

    return <div className='repo-selector'>
        {repos?.map((repo) => {
            return <RepoCheckboxItem
                repo={repo}
                setLastSelectedRepo={props.setLastSelectedRepo}
                selectedRepos={props.selectedRepos}
                setSelectedRepos={props.setSelectedRepos}
            />
        })}
    </div>

}


export default RepoSelector