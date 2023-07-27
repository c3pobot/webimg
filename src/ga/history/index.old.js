'use strict'
const GetUnitImg = require('./getUnitImg')
const enumBattleOutcome = {
  1: 'Win'
}
const isOdd = (num)=>{
  return num % 2
}
const GetSquad = async(units = {})=>{
  let html = ''
  for(let i in units) html += await GetUnitImg(units[i], unitList[units[i].definitionId?.split(':')[0]])
  return html
}
const getBattleLength = (startTime, endTime)=>{
  try{
    let timeDiff = Math.floor(Math.abs((+endTime - +startTime)/1000)), timeAdjust = (1000 * 60 * 60 * 24 * 60) - 4000
    if(timeDiff > 10 * 60){
      timeDiff = Math.floor(Math.abs(((+endTime - timeAdjust) - +startTime)/1000))
    }
    let m = Math.floor(timeDiff/60)
    let s = Math.floor((timeDiff - (m * 60)))
    return m+':'+s?.toString()?.padStart(2, '0')
  }catch(e){
    console.error(e);
  }
}
const getBattleAttempt = (startTime, battles = [])=>{
  try{
    let attempt = battles.findIndex(x=>x.startTime === startTime?.toString())
    return +attempt + 1
  }catch(e){
    console.error(e);
  }
}
const GetBattle = async(battle = {}, battles = [])=>{
  try{
    let leader = battle.defenderUnit.find(x=>x.squadUnitType === 2 || x.squadUnitType === 3)
    let repeatBattles = battles.filter(x=>x.defenderUnit.filter(y=>y.definitionId === leader.definitionId).length > 0)
    let battleAttempt = await getBattleAttempt(battle.startTime, repeatBattles)
    let html = '<div class="list-group-item">'
    html += '<div class="row">'
      html += '<div class="battle-details '+(battle.battleOutcome == 1 ? 'battle-win':'battle-loss')+'">'
        html += '<strong>'
        html += 'Result  : '+enumBattleOutcome[battle.battleOutcome]+'<br>'
        html += 'Attempt : '+battleAttempt+'<br>'
        html += 'Length  : '+getBattleLength(battle.startTime, battle.endTime)+'<br>'
        html += 'Banners : '
        html += '</strong>'
      html += '</div>'
      html += '<div class="text-right squads">'
        html += await GetSquad(battle.attackerUnit)
      html += '</div>'
      html += '<div class="vs">'
      html += '<strong>VS<strong>'
      html += '</div>'
      html += '<div class="squads">'
        html += await GetSquad(battle.defenderUnit)
      html += '</div>'
    html += '</div>'
    html += '</div>'
    return html
  }catch(e){
    console.error(e);
  }
}
module.exports = async( match = {}, info = {})=>{
  try{
    let battles = match.defenseResult
    if(info.side !== 'd') battles = match.attackResult
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/unitImg.css" rel="stylesheet">'
    html += '<link href="/css/gaHist.css" rel="stylesheet">'

    html += '</head>'
    html += '<body>'
    for(let i in battles) html += await GetBattle(battles[i], battles)
    html += '</body>'
    return html
  }catch(e){
    console.error(e);
  }
}
