bonusPoints = [10,8,6,5,4,3,2,1,1,1,1,1,1,1,1,1]

class Member {

    tournament = []
    scoreAbs = []
    scoreBonus = []
    finalScore = 0
    position = 0
    realname = ""

    constructor(name){
        this.name = name
        this.tournament = this.setTournaments()
        this.realname = this.setRealname()
    }

    setTournaments(){
        return fetch(`https://api.chess.com/pub/player/${this.name}/tournaments`)
        .then(rawData => rawData.json())
        .then(json => json.finished)
        .then(l => {
            this.tournament = l.filter(x => x.url.includes("cxes-online-2021---ii-copa-alexandre-direne"))
        })
    }

    setRealname() {
        var myHeaders = new Headers();

        var myInit = { method: 'GET',
                       headers: myHeaders,
                       mode: 'cors',
                       cache: 'default' };

        return fetch(`https://api.chess.com/pub/player/${this.name}` , myInit)
        .then(rawData => rawData.json())
        .then(json => {this.realname = json.name})
    }

    setScore() {
        this.tournament.map(t => {
            this.scoreAbs.push(t.wins + 0.5*t.draws)

            if(t.placement <= bonusPoints.length){
                this.scoreBonus.push(bonusPoints[t.placement-1])
            } else {
                this.scoreBonus.push(0)
            }

            this.scoreAbsSum = this.scoreAbs.reduce((x,y) => x + y)
            this.scoreBonusSum = this.scoreBonus.reduce((x,y) => x + y)
            this.finalScore = this.scoreAbsSum + this.scoreBonusSum
            
        })
    }
}

function processMembers(list){
    return Promise.allSettled(list.map(u => u.tournament))
        .then(() => {
            members = list.filter(m => m.tournament.length)
            members.map(m => m.setScore())
            members.sort( (a,b) => a.finalScore < b.finalScore ? -1 : 1)
            return members
        })
        .then(() => {
            var position = 0
            for(var i=0; i < members.length; i++){
                if (i==0){
                    position = 1
                    members[members.length-i-1].position = position 
                    
                } else{
                    if(members[members.length-i-1].finalScore == members[members.length-i].finalScore){
                        members[members.length-i-1].position = position
                    } else {
                        position = position + 1
                        members[members.length-i-1].position = position
                    }
                }
            }
        return members
        })
}

function render(members){
        var table = document.getElementById("mytable");
        members.map(member => {
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            cell1.className = "tooltip";
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = '<div class="tooltip">'+member.name+'<span class="tooltiptext">'+member.realname+'</span></div>'
            cell2.innerHTML = member.finalScore;
            cell3.innerHTML = member.position;
        })

                document.getElementById("idloader").style.display = 'none';

    }

(() => {
fetch("https://api.chess.com/pub/club/clube-de-xadrez-erbo-stenzel/members")
.then(rawData => rawData.json())
.then(json => [].concat(json.all_time, json.weekly, json.monthly))
.then(list => processMembers(list.map(m => new Member(m.username))))
.then(members => render(members))
})()