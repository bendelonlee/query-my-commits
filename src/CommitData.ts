export default class CommitData {
    wordFrequencies: {[name: string]: number} = {};
    lastRepoCommits: Map<string, string> = new Map();
    removeList: Set<string> = new Set(['', 'for', 'in', 'of', 'a', 'the', 'to', 'from', 'when', 'as', 'is', 'was', 'be', 'without', 'with', 'and'])
    static fromStorage(): CommitData {
        const cd = new CommitData();
        cd.wordFrequencies = JSON.parse(localStorage.getItem('wordFrequencies')!);
        return cd;
    }

    addCommits(commits : [Commit], repoId: string, endCursor: string){
        commits.forEach((commit)=>{
            this.addCommit(commit);
        })
        this.lastRepoCommits.set(repoId, endCursor) 
        this.updateLocalStorage();
    }

    updateLocalStorage(): void {
        localStorage.setItem('lastRepoCommits', JSON.stringify(this.lastRepoCommits))
        localStorage.setItem('wordFrequencies', JSON.stringify(this.wordFrequencies))
    }

    addCommit(commit : Commit): void {
        this.addMessage(commit.message);
    }

    addMessage(message : string): void {
        message.split(/\ |\./).forEach((word) => this.addWord(word))
    }

    addWord(word : string): void {
        if(this.removeList.has(word)) return;
        word = word.toLowerCase();
        let count : number | undefined = this.wordFrequencies[word];
        if( count === undefined ) count = 0;
        this.wordFrequencies[word] = count + 1;
    }

    toWordCloudArray(){
        let result: WordCloudWord[] = [];
        for (let word in this.wordFrequencies){
            // let displayWord: string  = word.substr(0, 10)
            let wcw = {text: word, value: this.wordFrequencies[word] * 10000}
            result.push(wcw)
        }
        return result
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