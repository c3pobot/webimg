'use strict'
const GetUnitImg = require('./getUnitImg')
const GetDataCron = require('./getDatacron')
const enumBattleOutcome = {
  1: 'Win',
  2: 'Loss',
  3: 'Retreat',
  4: 'Timeout',
  5: 'Client Crash'
}
const getBanners = (attack = [], defense = [], mode, attempt)=>{
  try{
    let maxUnits = 5, score = 15
    if(mode === '3v3') maxUnits = 3
    if(+attempt === 1) score += 30
    if(+attempt === 2) score += 15
    score += +defense?.length
    score += +attack.filter(x=>x.healthPercent > 0).length
    if(maxUnits > +attack.length) score += (maxUnits - +attack.length) * 4
    score += +attack.filter(x=>x.healthPercent === 100).length
    score += +attack.filter(x=>x.shieldPercent === 100).length
    return score
  }catch(e){
    console.error(e);
  }
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
const GetBattle = async(battle = {}, battles = [], mode)=>{
  try{
    let leader = battle.defenderUnit.find(x=>x.squadUnitType === 2 || x.squadUnitType === 3)
    let repeatBattles = battles.filter(x=>x.defenderUnit.filter(y=>y.definitionId === leader.definitionId).length > 0)
    let battleAttempt = await getBattleAttempt(battle.startTime, repeatBattles)
    let combatType = 1, banners
    if(unitList[leader?.squadUnitType === 3]) combatType = 2
    if(combatType === 1 && battle.battleOutcome === 1) banners = getBanners(battle.attackerUnit, battle.defenderUnit, mode, battleAttempt)
    let html = '<tr><td'+(battle.battleOutcome !== 1 ? ' class="battle-loss"':'')+'>'
    html += '<div class="list-group-item">'
    html += '<div class="row">'
      html += '<div class="battle-details">'
        html += '<strong>'
        html += 'Result  : '+enumBattleOutcome[battle.battleOutcome]+'<br>'
        html += 'Attempt : '+battleAttempt+'<br>'
        html += 'Length  : '+getBattleLength(battle.startTime, battle.endTime)
        if(banners) html += '<br>Banners : '+banners
        html += '</strong>'
      html += '</div>'
      html += '<div class="text-right squads">'
        html += await GetSquad(battle.attackerUnit)
        if(battle.attackerDatacron?.affix?.length > 0){
          let tempHtml = await GetDataCron(battle.attackerDatacron)
          if(tempHtml) html += tempHtml
        }
      html += '</div>'
      html += '<div class="vs">'
      html += '<strong>VS<strong>'
      html += '</div>'
      html += '<div class="squads">'
        html += await GetSquad(battle.defenderUnit)
        if(battle.defenderDatacron?.affix?.length > 0){
          let tempHtml = await GetDataCron(battle.defenderDatacron)
          if(tempHtml) html += tempHtml
        }
      html += '</div>'
    html += '</div>'
    html += '</div>'
    html += '</td></tr>'
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
    html += '<link href="/css/datacron.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table>'
      html += '<tr>'
      html += '<td class="header-player">'
        html += match.home?.playerName+' Grand Arena '+(info.side === 'd' ? 'Defense':'Attack')
        if(info.holdOnly) html += ' (Defense holds only)'
      html += '</td>'
      html += '</tr>'
      html += '<tr>'
      html += '<td class="header-info">'
        html += info.date+' Season '+info.season+' '+info.mode+' round '+match.matchId
      html += '</td>'
      html += '</tr>'
      html += '<tr>'
      html += '<td class="header-score">'
        html += match.home?.playerName+' ('+match.home.score+') vs '+match.away?.playerName+' ('+match.away.score+')'
      html += '</td>'
      html += '</tr>'
      for(let i in battles) html += await GetBattle(battles[i], battles, info.mode)
    html += '</table>'
    html += '</body>'
    return html
  }catch(e){
    console.error(e);
  }
}
