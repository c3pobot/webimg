'use strict'
const GetCharImg = require('../getCharImg')
const isOdd = (num)=>{
  return num % 2
}
module.exports = async(pObj = [], eObj = [], info = {})=>{
  try{
    //console.log(pObj.map(x=>x.baseId))
    let colLimit = 2, colCount = 0, bkImg = 'unit-even', oddCount = 0
    if(pObj.length < 2) colLimit = 1
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/faction.css" rel="stylesheet">'
    html += '<link href="/css/unitImg.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table padding="0">'
      html += '<tr><td colspan="'+(colLimit * 4)+'" class="unit-odd" align="center">'+info.nameKey+' units</td></tr>'
      html += '<tr class="player-name">'
      for(let i=0; i<colLimit; i++) html += '<td colspan="2">'+info.player+'</td><td colspan="2">'+info.enemy+'</td>'
      html += '</tr>'

      for(let i in pObj){
        //if(colCount == 0) html = '<tr>'
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
        const eUnit = eObj?.find(x=>x.baseId === pObj[i].baseId)
        html += '<td valign="top" width="200px" align="center">'
        html += await GetCharImg(pObj[i], true)
        //html += '</td><td class="unit-stats"><table class="stat-table"><tr><td colspan="2" class="unit-name">'+pObj[i].nameKey+'</td></tr>'
        html += '</td><td class="unit-stats"><table class="stat-table">'
        html += '<tr><td>Speed</td><td>'+pObj[i].stats.speed+'</td></tr>'
        html += '<tr><td>Health</td><td>'+pObj[i].stats.health+'</td></tr>'
        html += '<tr><td>Protection</td><td>'+pObj[i].stats.protection+'</td></tr>'
        html += '<tr><td>PD</td><td>'+pObj[i].stats.pd+'</td></tr>'
        html += '<tr><td>SD</td><td>'+pObj[i].stats.sd+'</td></tr>'
        html += '</table></td>'
        html += '<td valign="top" width="200px" align="center">'
        html += await GetCharImg(eUnit, true)
        //html += '</td><td class="unit-stats"><table class="stat-table"><tr><td colspan="2" class="unit-name">'+eUnit.nameKey+'</td></tr>'
        html += '</td><td class="unit-stats"><table class="stat-table">'
        html += '<tr><td>Speed</td><td>'+eUnit.stats.speed+'</td></tr>'
        html += '<tr><td>Health</td><td>'+eUnit.stats.health+'</td></tr>'
        html += '<tr><td>Protection</td><td>'+eUnit.stats.protection+'</td></tr>'
        html += '<tr><td>PD</td><td>'+eUnit.stats.pd+'</td></tr>'
        html += '<tr><td>SD</td><td>'+eUnit.stats.sd+'</td></tr>'
        html += '</table></td>'
        if(colCount == colLimit){
          colCount = 0
          html += '</tr>'
        }
        if(colCount != 0 && colCount != colLimit && pObj.length == (+i + 1)){
          for(let c=colCount; c<colLimit; c++){
            html += '<td></td><td></td><td></td><td></td>'
          }
          html += '</tr>'
        }
      }

    if(info.footer) html += '<tr class="footer-text"><td colspan="'+(colLimit * 4)+'">'+info.footer+'</td></tr>'
    html += '</table>'
    html += '</body>'
    html += '</html>'
    return {html: html, colLimit: colLimit}
  }catch(e){
    console.error(e)
  }
}
