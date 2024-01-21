'use strict'
const squadStatusMap = {
  "SQUADAVAILABLE": "Loss",
  "SQUADDEFEATED": "Win"
}
const getBattle = (battle = {})=>{
  let battleStatus = squadStatusMap[battle.squadStatus]
  if(battle.playerPreloaded) battleStatus = 'Preloaded'
  let html = '<tr>'
    html += `<td>${battle.battleNum?.toString()?.padStart(2, 0)} ${battle.playerName}`
    if(battle.squadStatus === 'UNKNOWN'){
      html += ` - Unknown`
    }else{
      html += ` (${battle.finishUnits}/${battle.startUnits}) - ${battleStatus}`
    }
    html += '</td></tr>'
    return html
}

const getSquadLog = (squad = {})=>{
  let html = `<tr><td>${squad.playerName} - ${squad.leader} (${squad.battleCount})<td></tr>`
  html += '<tr><td>'
    html += '<table width="100%">'
      for(let i in squad.log) html += getBattle(squad.log[i])
    html += '</table>'
  html += '</td></tr>'
  return html
}
module.exports = ({ squads = [], profile = {} })=>{
  try{
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/twlog.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table class="log-table">'
      html += `<tr><td>${profile.name} TW Attack log for ${profile.zone}</td></tr>`
      if(squads.length > 0){
        for(let i in squads) html += getSquadLog(squads[i])
      }else{
        html += `<tr><td>There is no battle history available for this zone</td></tr>`
      }
    html += '</table>'
    html += '</body>'
    html += '</html>'
    return html
  }catch(e){
    throw(e)
  }
}
