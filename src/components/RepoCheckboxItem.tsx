import { Dispatch, SetStateAction } from "react";

export default function RepoCheckboxItem(props: {repo: any, setSelectedRepos: Dispatch<SetStateAction<Set<string>>>, selectedRepos: Set<String>}){
    function handleCheckboxChange(){

    }
    
    return <div>
        <label>
            <input
                type="checkbox"
                value={props.repo.name}
                checked={props.selectedRepos.has(props.repo.name)}
                onChange={handleCheckboxChange}
            />
            {props.repo.name}
        </label>
    </div>
}