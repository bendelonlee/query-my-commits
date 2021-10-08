export default class CommitData {
    wordFrequencies: {[name: string]: number} = {};
    lastRepoCommits: Map<string, string> = new Map();
    removeList: Set<string> = new Set(['', 'for', 'in', 'of', 'a', 'the', 'to', 'from', 'when', 'as', 'is', 'was', 'be', 'without', 'with', 'and'])
    addedRepoNames: Set<string> = new Set()
    addedRepos: Map<string, Array<string>> = new Map()
    selectedRepos: Set<string> = CommitData.initialSelectedRepos
    static fromStorage(): CommitData {
        const cd = new CommitData();
        cd.wordFrequencies = JSON.parse(localStorage.getItem('wordFrequencies')!);
        return cd;
    }

    static initialSelectedRepos: Set<string> = new Set<string>(['backend_prework'])
    
    addCommits(commits: [Commit], repoName: string, endCursor: string){
        this.addedRepos.set(repoName, [])
        commits.forEach((commit)=>{
            this.addCommit(repoName, commit);
        })
        this.lastRepoCommits.set(repoName, endCursor) 
        this.updateLocalStorage();
    }

    addCommit(repoName: string, commit : Commit): void {
        this.addedRepos.get(repoName)?.push(commit.message)
    }


    updateLocalStorage(): void {
        localStorage.setItem('lastRepoCommits', JSON.stringify(this.lastRepoCommits))
        localStorage.setItem('wordFrequencies', JSON.stringify(this.wordFrequencies))
    }


    loadMessage(message : string): void {
        message.split(/\ |\./).forEach((word) => this.loadWord(word))
    }

    loadWord(word : string): void {
        if(this.removeList.has(word)) return;
        word = word.toLowerCase();
        let count : number | undefined = this.wordFrequencies[word];
        if( count === undefined ) count = 0;
        this.wordFrequencies[word] = count + 1;
    }

    toWordCloudArray(){
        let result: WordCloudWord[] = [];
        for (let word in this.makeWordFrequencies()){
            // let displayWord: string  = word.substr(0, 10)
            let wcw = {text: word, value: this.wordFrequencies[word] * 10000}
            result.push(wcw)
        }
        return result
    }

    makeWordFrequencies(){
        this.wordFrequencies = {};
        this.selectedRepos.forEach((repoName: string) => {
            this.addedRepos.get(repoName)?.forEach((commitMessage)=>{
                this.loadMessage(commitMessage)
            })
        })
        return this.wordFrequencies;
    }

    setSelectedRepos(newRepos: Set<string> ){
        this.selectedRepos = newRepos;
    }
}

interface Commit {
    oid : string
    message : string
}

interface WordCloudWord {
    text: string,
    value: number
}