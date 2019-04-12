class MatchModel{
    match = ""
    matchId = 0
    time = ""
    date = ""
    score = ""
    venue = ""
    vote_enable = false
    button_disabled = true
    constructor(props){
        if(props){
            this.match = props.match
            this.matchId = parseInt(props.matchId)
            this.time = props.time
            this.date = props.date
            this.score = props.score
            this.venue = props.venue
            this.vote_enable = props.vote_enable
        }
    }
}

export default MatchModel