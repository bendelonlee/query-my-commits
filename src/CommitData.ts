export default class CommitData {
    wordFrequencies : Map<String, number> = new Map();
    commits : Map<String, boolean> = new Map();
    lastRepoCommits : Map<string, string> = new Map();
  
    addCommits(commits : [Commit], repoId : string){
        commits.forEach((commit)=>{
            this.addCommit(commit, repoId);
        })
    }
    addCommit(commit : Commit, repoId : string){
        
        if(this.commits.get(commit.oid) === true) return;
        console.log("adding commit", commit)
        this.commits.set(commit.oid, true);
        this.lastRepoCommits.set(repoId, commit.oid) // might be better to do only if the last one
        this.addMessage(commit.message);
    }
    addMessage(message : string){
        message.split(/\ |\./).forEach((word) => this.addWord(word))
    }
    addWord(word : string){
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