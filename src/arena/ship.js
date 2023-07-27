'use strict'
const GetCharImg = require('../getCharImg')
const isOdd = (num)=>{
  return num % 2
}
module.exports = async(arena = [], info = {})=>{
  try{
    let colLimit = 2, squad = info?.arena?.ship?.squad, leader, units = [], shipR = []
    if(arena?.length > 0){
      for(let i in squad){
        const tempUnit = arena.find(x=>x.baseId == squad[i].unitDefId.split(':')[0])
        if(tempUnit){
          if(squad[i].squadUnitType == 1) units.push(tempUnit)
          if(squad[i].squadUnitType == 3) leader = tempUnit
          if(squad[i].squadUnitType == 5) shipR.push(tempUnit)
        }
      }
    }
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/arena.css" rel="stylesheet">'
    html += '<link href="/css/unitImg.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table padding="0">'
    if(leader?.nameKey || units?.length > 0){
      html += '<tr><td colspan="4" class="player-name" width="100%">'+info.name+' Fleet Arena Rank : '+info.rank+'</td></tr>'
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
      if(shipR?.length > 0){
        html += '<tr><td colspan="4" class="player-name" width="100%">Reinforcements</td></tr>'
        let colCount = 0
        for(let i in shipR){
          if(colCount == 0) html += '<tr>'
          colCount++;
          html += '<td class="unit-image">'
          html += await GetCharImg(shipR[i], false)
          html += '</td><td class="unit-stats"><table class="stat-table"><tr><td colspan="2" class="unit-name">'+shipR[i].nameKey+'</td></tr>'
          html += '<tr><td>GP</td><td>'+shipR[i].formatedGP+'</td></tr>'
          html += '<tr><td>Speed</td><td>'+shipR[i].stats.speed+'</td></tr>'
          html += '<tr><td>Health</td><td>'+shipR[i].stats.health+'</td></tr>'
          html += '<tr><td>Protection</td><td>'+shipR[i].stats.protection+'</td></tr>'
          html += '<tr><td>PD</td><td>'+shipR[i].stats.pd+'</td></tr>'
          html += '<tr><td>SD</td><td>'+shipR[i].stats.sd+'</td></tr>'
          html += '</table></td>'
          if(colCount == colLimit){
            colCount = 0
            html += '</tr>'
          }
          if(colCount != 0 && colCount != colLimit && shipR.length == (+i + 1)){
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
