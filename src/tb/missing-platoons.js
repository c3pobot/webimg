'use strict'
const getUnitPlayer = (player = {})=>{
  let html = '<tr><td colspan="2" class="zonePlayerName">'
  html += `${player.name} `
  if(player.relicTier){
    html += `R${player.relicTier}`
  }else{
    html += `${player.rarity}*`
  }
  html += '</td></tr>'
  return html
}
const getZoneUnit = (unit = {})=>{
  let html = `<tr><td colspan="2" class="zoneUnitName">`
  if(unit.relic > 0){
    html += `R${+unit.relic - 2} `
  }else{
    html += `${unit.rarity}* `
  }
  html += `${unit.nameKey} (${unit.missing})`
  html += '</td>'
  html += '</tr>'
  if(unit.players?.length > 0){
    for(let i in unit.players) html += getUnitPlayer(unit.players[i])
  }else{
    html += '<tr><td colspan="2" class="zoneNoUnit">No one has this unit available</td></tr>'
  }
  return html
}
const getZoneData = (data = {})=>{
  let unitCount = Object.values(data?.units || {})?.length || 0
  let html = `<tr><td colspan="2" class="zoneTitle">${data.key} ${data.nameKey} (${unitCount})</td></tr>`
  for(let i in data.units) html += getZoneUnit(data.units[i])
  return html
}
module.exports = ({ name, tbName, currentRound, timeTillEnd = {}, data = [], showPlayers})=>{
  let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
  html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
  html += '<link href="/css/missing-platoons.css" rel="stylesheet">'
  html += '<link href="/css/unitImg.css" rel="stylesheet">'
  html += '</head>'
  html += '<body>'
  html += '<table width=100% border="0" class="review">'
    html += `<tr><td colspan="2" class="title">${name} ${tbName} Available platoon units</td></tr>`
    for(let i in data){
      html += getZoneData(data[i])
    }
    html += `<tr><td colspan="2" class="footer">Round ${currentRound} Ends in ${timeTillEnd.h}:${timeTillEnd.m}:${timeTillEnd.s}</td></tr>`
  html += '</table>'
  html += '</body>'
  html += '</html>'
  return html
}
