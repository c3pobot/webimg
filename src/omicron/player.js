'use strict'
const GetCharImg = require('../getCharImg')
const isOdd = (num)=>{
  return num % 2
}
const GetSkillType = (skillId)=>{
  try{
    if(skillId) return skillId.toString().charAt(0).toUpperCase()
  }catch(e){
    console.error(e);
  }
}
module.exports = async(data = [], info = {})=>{
  try{
    let colLimit = 5, colCount = 0, unitHTML, bkImg = 'unit-even', oddCount = 0, maxUnitsFound = 0
    const omi = {}
    for(let i in data){
      if(data[i]?.units?.length > 4){
        colLimit = 5
        break;
      }else{
        if(data[i]?.units?.length > maxUnitsFound){
          maxUnitsFound = +data[i]?.units?.length
          if(data[i]?.units?.length < 5) colLimit = +data[i]?.units?.length
        }
      }
      if(maxUnitsFound >= 5) break;
    }
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/faction.css" rel="stylesheet">'
    html += '<link href="/css/unitImg.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table padding="0">'
    for(let i in data){
      if(data[i].units?.length > 0){
        colCount = 0
        html += '<tr><td colspan="'+colLimit+'" class="player-name">'+info.player+'\'s '+data[i].nameKey+' omicrons ('+data[i].count+')</td></tr>'
        for(let u in data[i].units){
          if(colCount == 0){
            if(isOdd(oddCount)){
              bkImg = 'unit-odd'
            }else{
              bkImg = 'unit-even'
            }
            oddCount++
            html += '<tr class="'+bkImg+'">'
          }
          colCount++;
          html += '<td valign="top">'
            html += '<table width="100%" border="0"><tr><td valign="top">'
            html += await GetCharImg(data[i].units[u], true)
            html += '</td></tr>'
            html += '<tr><td align="left">'
            for(let s in data[i].units[u].omiSkills) html += '('+GetSkillType(data[i].units[u].omiSkills[s]?.id)+') '+data[i].units[u].omiSkills[s].nameKey+'<br>'
            html += '</td></tr></table>'
          html += '</td>'
          if(colCount == colLimit){
            colCount = 0
            html += '</tr>'
          }
          if(colCount != 0 && colCount != colLimit && +data[i].units.length == (+u + 1)){
            for(let c=colCount;c<colLimit;c++){
              html += '<td></td>'
            }
            html += '</tr>'
          }
        }
      }
    }
    if(info.footer) html += '<tr class="footer-text"><td colspan="'+colLimit+'">'+info.footer+'</td></tr>'
    html += '</table>'
    html += '</body>'
    html += '</html>'
    return {html: html, colLimit: colLimit}
  }catch(e){
    console.error(e);
  }
}
