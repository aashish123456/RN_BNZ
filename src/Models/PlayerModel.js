class PlayerModel{
    playerId = 0
    playerName = ""
    jersyNo = 0

    constructor(props){
        if(props){
            this.playerId = parseInt(props.id)
            this.playerName = props.name
            this.jersyNo = parseInt(props.jersy_no)
        }
    }
}

export default PlayerModel