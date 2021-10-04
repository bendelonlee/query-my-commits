import { graphql } from "babel-plugin-relay/macro"
import { Dispatch, SetStateAction } from "react"
import { QueryRenderer } from "react-relay"
import RelayEnvironment from "../RelayEnvironment"
import { RepoSelectorQuery, RepoSelectorQueryResponse } from "./__generated__/RepoSelectorQuery.graphql"

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
                    <InnerComponent loadingError={error} response={response} refetch={retry} setRepoName={setRepoName} />
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
    setRepoName: Dispatch<SetStateAction<string>>;
}
type Nullable<T> = null | T;


function InnerComponent(props: Props): JSX.Element {
    const { response, loadingError, refetch, setRepoName } = props;
    const repos = response?.viewer.repositories.nodes

    const onRepoChange = (event: any) => {
        setRepoName(event.target.value)
    }

    return <select onChange={onRepoChange}>
        {repos?.map((repo) => {
            return <option>{repo!.name}</option>
        })}
    </select>

}


export default RepoSelector