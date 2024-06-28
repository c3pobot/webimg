'use strict'
const getCharImg = require('../getCharImg')
let nameWidth = 200, unitWidth = 280
const getPlayerUnits = (units = [], roster = [])=>{
  let html = ''
  for(let i in units){
    let unit = roster.find(x=>x.baseId === units[i].baseId)
    if(!unit?.baseId){
      html += '<td>&nbsp</td>'
      continue
    }
    let tdClass = 'unitMet'
    if(unit.notMet){
      tdClass = 'unitRarityMetGearNotMet'
      if(unit.gearNotMet && unit.rarityNotMet) tdClass = 'unitNotMet'
    }
    html += `<td class="${tdClass}">${unit.gp || 0}<br>${unit.rarity || 0}*<br>`
    if(unit.relicTier){
      html += `R${unit.relicTier}`
    }else{
      html += `G${unit.gear || 0}`
    }
    html += '</td>'
  }
  return html
}
const getPlayerRow = (guideTemplate = {}, member = {})=>{
  let html = `<tr class="${member.notMet ? 'playerNotMet':'playerMet'}" style="border-top: 2px solid black;"><td>${member.name}</td>`
  if(guideTemplate.units?.length > 0){
    html += getPlayerUnits(guideTemplate.units, member.requiredUnits)
  }
  if(guideTemplate.factions?.length > 0){
    for(let i in guideTemplate.factions){
      html += getPlayerUnits(guideTemplate.factions[i].units, member.factions[guideTemplate.factions[i].baseId])
    }
  }
  if(guideTemplate.groups?.length > 0){
    for(let i in guideTemplate.groups){
      html += getPlayerUnits(guideTemplate.groups[i].units, member.groups[guideTemplate.groups[i].id])
    }
  }
  html += '</tr>'
  return html
}
const getUnits = (units = [], unitList = {})=>{
  let res = { html1: '', html2: '' }
  for(let i in units){
    let unit = unitList[units[i].baseId]
    if(!unit.baseId) continue
    if(unit.optional){
      res.html1 += `<td align="center" width="${unitWidth}">OPT</td>`
    }else{
      res.html1 += `<td width="${unitWidth}">&nbsp;</td>`
    }
    res.html2 += '<td align="center">'
    res.html2 += getCharImg(unit)
    res.html2 += '</td>'
  }
  return res
}
const getHeaderRow = (guideTemplate = {}, unitList = {})=>{
  let html1 = `<tr><td width="${nameWidth}">&nbsp;</td>`, html2 = '<tr><td>&nbsp;</td>'
    if(guideTemplate.units?.length > 0){
      let tempRes = getUnits(guideTemplate.units, unitList)
      html1 += tempRes.html1, html2 += tempRes.html2
    }
    if(guideTemplate.factions?.length > 0){
      for(let i in guideTemplate.factions){
        let tempRes = getUnits(guideTemplate.factions[i].units, unitList)
        html1 += tempRes.html1, html2 += tempRes.html2
      }
    }
    if(guideTemplate.groups?.length > 0){
      for(let i in guideTemplate.groups){
        let tempRes = getUnits(guideTemplate.groups[i].units, unitList)
        html1 += tempRes.html1, html2 += tempRes.html2
      }
    }
    html1 += '</tr>'
    html2 += '</tr>'
    return `${html1}${html2}`
}
module.exports = ({ guideTemplate = {}, unitList = {}, profile = {}, member = [], updated})=>{
  let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/guild-panic.css" rel="stylesheet">'
    html += '<link href="/css/unitImg.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
      html += `<table padding="0" cellspacing="0" cellpadding="0" width="${(unitWidth * unitList.count) + nameWidth}">`
      html += `<tr class="title"><td colspan="${unitList.count + 1}">${profile.name} readiness for ${guideTemplate?.name} (${member.filter(x=>x.notMet === 0).length}/${member.length})</td></tr>`
      html += getHeaderRow(guideTemplate, unitList)
      for(let i in member){
        html += getPlayerRow(guideTemplate, member[i])
      }
    html += `<tr class="title"><td colspan="${unitList.count + 1}">Data updated ${(new Date(updated))?.toLocaleString('en-US', {timeZone: 'America/New_York'})}</td></tr>`
    html += '</table>'
    html += '</body>'
    return html
}
