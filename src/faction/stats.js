'use strict'
const GetCharImg = require('../getCharImg')
const isOdd = (num)=>{
  return num % 2
}
module.exports = async(units = [], info = {})=>{
  try{
    //console.log(pObj.map(x=>x.baseId))
    let colLimit = 4, colCount = 0, bkImg = 'unit-even', oddCount = 0
    if(units.length < 4) colLimit = +units.length
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/faction.css" rel="stylesheet">'
    html += '<link href="/css/unitImg.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table padding="0">'
      html += '<tr><td colspan="'+(colLimit * 2)+'" class="player-name" align="center">'+info.player+'\'s '+info.nameKey+' units</td></tr>'
      for(let i in units){
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
        html += '<td valign="top" width="200px" align="center">'
        html += await GetCharImg(units[i], true)
        //html += '</td><td class="unit-stats"><table class="stat-table"><tr><td colspan="2" class="unit-name">'+pObj[i].nameKey+'</td></tr>'
        html += '</td><td class="unit-stats"><table class="stat-table">'
        html += '<tr><td>Speed</td><td>'+units[i].stats?.speed+'</td></tr>'
        html += '<tr><td>Health</td><td>'+units[i].stats?.health+'</td></tr>'
        html += '<tr><td>Protection</td><td>'+units[i].stats?.protection+'</td></tr>'
        html += '<tr><td>PD</td><td>'+units[i].stats?.pd+'</td></tr>'
        html += '<tr><td>SD</td><td>'+units[i].stats?.sd+'</td></tr>'
        html += '</table></td>'
        if(colCount == colLimit){
          colCount = 0
          html += '</tr>'
        }
        if(colCount != 0 && colCount != colLimit && units.length == (+i + 1)){
          for(let c=colCount; c<colLimit; c++){
            html += '<td></td><td></td>'
          }
          html += '</tr>'
        }
      }

    if(info.footer) html += '<tr class="footer-text"><td colspan="'+(colLimit * 2)+'">'+info.footer+'</td></tr>'
    html += '</table>'
    html += '</body>'
    html += '</html>'
    return {html: html, colLimit: colLimit}
  }catch(e){
    console.error(e)
  }
}
