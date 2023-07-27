'use strict'
const sorter = require('json-array-sorter')
const numeral = require('numeral')
const sortTemplate = [{column: 'level', order: 'descending'}]
const GetDCImg = require('./getDCImg')
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
  9: 3
}
const formatStatName = (statName, ln = 3)=>{
  try{
    let array = statName.split(' '), str
    if(array?.length > 0){
      for(let i in array){
        if(!str) str = ''
        str += array[i].substring(0, array.length > 1 ? 1:ln)+' '
      }
    }
    return str
  }catch(e){
    console.error(e);
  }
}
const GetStats = async( data = [], def = {} )=>{
  try{
    let html, tempObj = {}, colCount = 0
    for(let i in data){
      if(data[i].statType && def[data[i].statType]){
        if(!tempObj[data[i].statType]) tempObj[data[i].statType] = { id: data[i].statType, name: def[data[i].statType].nameKey, value: 0, pct: def[data[i].statType]}
        tempObj[data[i].statType].value += (+data[i].statValue || 0) / 1e8
      }
    }
    tempObj = Object.values(tempObj)
    if(tempObj?.length > 0){
      html = '<table padding="0" border="0" width="100%">'
      for(let i in tempObj){
        if(tempObj[i].pct){
          tempObj[i].value = numeral(tempObj[i].value * 100).format('0.00')+'%'
        }else{
          tempObj[i].value = numeral(tempObj[i].value).format('0,0')
        }
        //html += '<tr><td>'+formatStatName(tempObj[i].name?.replace(' %', ''))+'</td></tr><tr><td>'+tempObj[i].value+'</td></tr>'
        html += '<tr><td>'+tempObj[i].name?.replace(' %', '')+'</td></tr><tr><td>'+tempObj[i].value+'</td></tr>'
      }
      html += '</table>'
    }
    return html
  }catch(e){
    console.error(e);
  }
}
const GetDataCron = async(datacron = {}, def = {})=>{
  try{
    let rowCount = enumRows[datacron.level]
    const stats = await GetStats(datacron.affix, def.stat)
    let html = '<table border="0" padding="0">'
      html += '<tr>'
        html += '<td rowspan="'+rowCount+'" valign="top" width="70px">'
        html += await GetDCImg(datacron, def)
        if(stats) html += '<td rowspan="'+rowCount+'" valign="top" width="100px">'+stats+'</td>'
        if(rowCount >= 1){
          html += '<td class="datacron-text" width="500px"><b>Alignment : </b><br>'+def.ability[datacron.affix[2]?.abilityId]?.target[datacron.affix[2]?.targetRule]?.descKey+'</td>'
        }else{
          html += '<td class="datacron-text" width="500px">&nbsp;</td>'
        }
      html += '</tr>'
      if(rowCount >= 2) html += '<tr><td class="datacron-text" width="500px"><b>Faction : </b><br>'+def.ability[datacron.affix[5]?.abilityId]?.target[datacron.affix[5]?.targetRule]?.descKey+'</td></tr>'
      if(rowCount >= 3) html += '<tr><td class="datacron-text" width="500px"><b>Unit : </b><br>'+def.ability[datacron.affix[8]?.abilityId]?.target[datacron.affix[8]?.targetRule]?.descKey+'<td></tr>'
    html += '</table>'
    return html
  }catch(e){
    console.error(e);
  }
}
const GetDataCrons = async(data = [], def = {})=>{
  try{
    if(data?.length > 0){
      data = await sorter(sortTemplate, data)
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
          html += await GetDataCron(data[i], def)
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
  }catch(e){
    console.error(e);
  }
}
module.exports = async({ data = [], info = {}, dcDef = {}})=>{
  try{
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/gaHist.css" rel="stylesheet">'
    html += '<link href="/css/datacron.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
      html += '<table width="1400px">'
      html += '<tr><td class="datacron-footer">'+info.name+' Datacron(s)'+'</td></tr>'
      for(let i in dcDef){
        if(dcDef[i].id){
          const tempObj = await GetDataCrons(data.filter(x=>x.templateId === dcDef[i].id), dcDef[i])
          if(tempObj) html += '<tr><td>'+tempObj+'</td></tr>'
        }
      }
      html += '<tr><td class="datacron-footer">Data Updated '+(new Date(+info.updated)).toLocaleString('en-US', {timeZone: 'America/New_York'})+'</td></tr>'
      html += '</table>'
    html += '</body>'
    html += '</html>'
    return html
  }catch(e){
    console.error(e);
  }
}
