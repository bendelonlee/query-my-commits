import { Dispatch, SetStateAction } from "react";

export default function RepoCheckboxItem(props: 
    {repo: any, 
     setSelectedRepos: Dispatch<SetStateAction<Set<string>>>, 
     selectedRepos: Set<string>
     setLastSelectedRepo: Dispatch<SetStateAction<string>> 
    }){
    function handleCheckboxChange(){
        const newSet = new Set<string>(props.selectedRepos)
        if(!props.selectedRepos.has(props.repo.name)){
            props.setLastSelectedRepo(props.repo.name)
            newSet.add(props.repo.name)
        } else {
            newSet.delete(props.repo.name) 
        }
        props.setSelectedRepos(newSet)
    }
    
    return <div className="repo-checkbox-item">
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