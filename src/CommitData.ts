export default class CommitData {
    wordFrequencies : Map<String, number> = new Map();
    lastRepoCommits : Map<string, string> = new Map();
    
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
        console.log('JSON.stringify(this.wordFrequencies)', JSON.stringify(this.wordFrequencies))
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
        if(word === '') return;
        word = word.toLowerCase();
        let count : number | undefined = this.wordFrequencies.get(word);
        if( count === undefined ) count = 0;
        this.wordFrequencies.set(word, count + 1);
    }
}

interface Commit {
    oid : string
    message : string
}