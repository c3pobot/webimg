'use strict'
const GetCharImg = require('../getCharImg')
const isOdd = (num)=>{
  return num % 2
}
module.exports = async(arena = [], info = {})=>{
  try{
    let colLimit = 2, squad = info?.arena?.char?.squad, leader, units = []
    if(arena?.length > 0){
      leader = squad.find(x=>x.squadUnitType == 2)
      if(leader?.unitDefId) leader = arena.find(x=>x.baseId == leader.unitDefId.split(':')[0])
      if(leader?.baseId) units = arena.filter(x=>x.baseId !== leader.baseId)
    }
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/arena.css" rel="stylesheet">'
    html += '<link href="/css/unitImg.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table padding="0">'
    if(leader?.nameKey || units?.length > 0){
      html += '<tr><td colspan="4" class="player-name" width="100%">'+info.name+' Squad Arena Rank : '+info.rank+'</td></tr>'
      if(leader?.nameKey){
        html += '<tr><td colspan="4" align="center"><table><tr><td class="unit-image">'
        html += await GetCharImg(leader, false)
        html += '</td><td class="unit-stats"><table class="stat-table"><tr><td colspan="2" class="unit-name">'+leader.nameKey+'</td></tr>'
        html += '<tr><td>GP</td><td>'+leader.formatedGP+'</td></tr>'
        html += '<tr><td>Speed</td><td>'+leader.stats.speed+'</td></tr>'
        html += '<tr><td>Health</td><td>'+leader.stats.health+'</td></tr>'
        html += '<tr><td>Protection</td><td>'+leader.stats.protection+'</td></tr>'
        html += '<tr><td>PD</td><td>'+leader.stats.pd+'</td></tr>'
        html += '<tr><td>SD</td><td>'+leader.stats.sd+'</td></tr>'
        html += '</table></td></tr></table></td></tr>'
      }
      if(units?.length > 0){
        let colCount = 0
        for(let i in units){
          if(colCount == 0) html += '<tr>'
          colCount++;
          html += '<td class="unit-image">'
          html += await GetCharImg(units[i], false)
          html += '</td><td class="unit-stats"><table class="stat-table"><tr><td colspan="2" class="unit-name">'+units[i].nameKey+'</td></tr>'
          html += '<tr><td>GP</td><td>'+units[i].formatedGP+'</td></tr>'
          html += '<tr><td>Speed</td><td>'+units[i].stats.speed+'</td></tr>'
          html += '<tr><td>Health</td><td>'+units[i].stats.health+'</td></tr>'
          html += '<tr><td>Protection</td><td>'+units[i].stats.protection+'</td></tr>'
          html += '<tr><td>PD</td><td>'+units[i].stats.pd+'</td></tr>'
          html += '<tr><td>SD</td><td>'+units[i].stats.sd+'</td></tr>'
          html += '</table></td>'
          if(colCount == colLimit){
            colCount = 0
            html += '</tr>'
          }
          if(colCount != 0 && colCount != colLimit && units.length == (+i + 1)){
            for(let c=colCount;c<colLimit;c++){
              html += '<td></td><td></td>'
            }
            html += '</tr>'
          }
        }
      }
    }
    if(info.footer) html += '<tr class="footer-text"><td colspan="4">'+info.footer+'</td></tr>'
    html += '</table>'
    html += '</body>'
    html += '</html>'
    return {html: html, colLimit: colLimit}
  }catch(e){
    console.error(e);
  }
}
