'use strict'
const sorter = require('json-array-sorter')
const numeral = require('numeral')
const sortTemplate = [{column: 'level', order: 'descending'}]
const getDCImg = require('./getDCImg')
const isOdd = (num)=>{
  return num % 2
}
const enumRows = {
  0: 0,
  1: 0,
  2: 0,
  3: 1,
  4: 1,
  5: 1,
  6: 2,
  7: 2,
  8: 2,
  9: 3,
  10: 3,
  11: 3,
  12: 4,
  13: 4,
  14: 4
}
const formatStatName = (statName, ln = 3)=>{
  let array = statName.split(' ')
  if(!array || array?.length == 0) return
  let str = ''
  for(let i in array) str += array[i].substring(0, array.length > 1 ? 1:ln)+' '
  return str
}
const getStats = ( data = [], def = {}, statMap )=>{
  let html, tempObj = {}, colCount = 0
  for(let i in data){
    if(data[i].statType && statMap[data[i].statType]){
      if(!tempObj[data[i].statType]) tempObj[data[i].statType] = { id: data[i].statType, name: statMap[data[i].statType].nameKey, value: 0, pct: statMap[data[i].statType].pct }
      tempObj[data[i].statType].value += (+data[i].statValue || 0) / 1e8
    }
    /*
    if(data[i].statType && def[data[i].statType]){
      if(!tempObj[data[i].statType]) tempObj[data[i].statType] = { id: data[i].statType, name: def[data[i].statType].nameKey, value: 0, pct: def[data[i].statType]}
      tempObj[data[i].statType].value += (+data[i].statValue || 0) / 1e8
    }
    */
  }
  tempObj = Object.values(tempObj)
  if(tempObj?.length > 0){
    html = '<table padding="0" border="0" width="100%">'
    for(let i in tempObj){
      if(!tempObj[i].value) continue
      if(tempObj[i].pct){
        tempObj[i].value = numeral(tempObj[i].value * 100).format('0.00')+'%'
      }else{
        tempObj[i].value = numeral(tempObj[i].value).format('0,0')
      }
      //html += '<tr><td>'+formatStatName(tempObj[i].name?.replace(' %', ''))+'</td></tr><tr><td>'+tempObj[i].value+'</td></tr>'
      if(tempObj[i].value) html += '<tr><td>'+tempObj[i].name?.replace(' %', '')+'</td></tr><tr><td>'+tempObj[i].value+'</td></tr>'
    }
    html += '</table>'
  }
  return html
}
const getDataCron = (datacron = {}, def = {}, statMap = {})=>{
  //let rowCount = enumRows[datacron.level]
  let rowCount = 0, cronLevel = (datacron.affix?.length || 0), scopeIcon
  if(cronLevel > 0) scopeIcon = datacron.affix[cronLevel - 1]?.scopeIcon
  let stats = getStats(datacron.affix, def.stat, statMap)
  let abilities = datacron?.affix?.filter(x=>x.abilityId)
  let alignmentText, abilityText, unitText
  if(abilities?.length > 0){
    for(let i in abilities){
      if(abilities[i].abilityId?.includes('alignment')){
        if(!alignmentText){
          alignmentText = '<b>Alignment : </b><br>'
        }else{
          alignmentText += '<br>'
        }
        alignmentText += def.ability[abilities[i]?.abilityId]?.target[abilities[i]?.targetRule]?.descKey
      }else{
        if(def.ability[abilities[i]?.abilityId]?.target[abilities[i]?.targetRule]?.unit?.baseId){
          if(!unitText){
            unitText = '<b>Unit : </b><br>'
          }else{
            unitText += '<br>'
          }
          unitText += def.ability[abilities[i]?.abilityId]?.target[abilities[i]?.targetRule]?.descKey
        }else{
          if(!abilityText){
            abilityText = '<b>Faction : </b><br>'
          }else{
            abilityText += '<br>'
          }
          abilityText += def.ability[abilities[i]?.abilityId]?.target[abilities[i]?.targetRule]?.descKey
        }
      }
    }
  }
  if(alignmentText) rowCount++
  if(abilityText) rowCount++
  if(unitText) rowCount++
  let html = '<table border="0" padding="0">'
    html += '<tr>'
      html += '<td rowspan="'+rowCount+'" valign="top" width="70px">'
      html += getDCImg(datacron, def, scopeIcon)
      if(stats) html += '<td rowspan="'+rowCount+'" valign="top" width="100px">'+stats+'</td>'
      if(alignmentText){
        html += `<td class="datacron-text" width="500px">${alignmentText}</td>`
      }else{
        html += '<td class="datacron-text" width="500px">&nbsp;</td>'
      }
    html += '</tr>'
    if(abilityText) html += `<tr><td class="datacron-text" width="500px">${abilityText}</td></tr>`
    if(unitText) html += `<tr><td class="datacron-text" width="500px">${unitText}</td><tr>`
  html += '</table>'
  return html
}
const getDataCrons = (data = [], def = {}, statMap)=>{
  if(!data || data.length == 0) return
  data = sorter(sortTemplate, data)
  let html = '<table border="0" padding="0">', colCount = 0, oddCount = 0, rowClass = 'datacron-row-even'
    html += '<tr><td class="datacron-header" colspan="3">'+def?.nameKey+'</td></tr>'
    for(let i in data){
      if(colCount === 0){
        if(isOdd(oddCount)){
          rowClass = 'datacron-row-odd'
        }else{
          rowClass = 'datacron-row-even'
        }
        oddCount++
        html += '<tr>'
      }
      colCount++;
      html += '<td valign="top" class="'+rowClass+'">'
      html += getDataCron(data[i], def, statMap)
      html += '</td>'
      if(+i + 1 === +data.length){
        if(colCount < 3) html += '<td>&nbsp;</td>'
        colCount = 3
      }
      if(colCount === 3){
        colCount = 0
        html += '</tr>'
      }
    }
  html += '</table>'
  return html
}
module.exports = ({ data = [], info = {}, dcDef = {}}, statMap = {})=>{
  let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
  html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
  html += '<link href="/css/gaHist.css" rel="stylesheet">'
  html += '<link href="/css/datacron.css" rel="stylesheet">'
  html += '</head>'
  html += '<body>'
    html += '<table width="1400px">'
    html += '<tr><td class="datacron-footer">'+info.name+' Datacron(s)'+'</td></tr>'
    for(let i in dcDef){
      //if(!dcDef[i].id || !dcDef[i].focused) continue

      let tempObj = getDataCrons(data.filter(x=>x.templateId === dcDef[i].id), dcDef[i], statMap)
      if(tempObj) html += '<tr><td>'+tempObj+'</td></tr>'
    }
    html += '<tr><td class="datacron-footer">Data Updated '+(new Date(+info.updated)).toLocaleString('en-US', {timeZone: 'America/New_York'})+'</td></tr>'
    html += '</table>'
  html += '</body>'
  html += '</html>'
  return html
}
