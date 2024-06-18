'use strict'
const GetCharImg = require('../getCharImg')
const isOdd = (num)=>{
  return num % 2
}
const GetSquadHTML = async(squadData = {}, opts = {})=>{
  try{
    let colLimit = opts.colLimit || 5, colCount = 0, index = 0, html = '', units = squadData.units
    for(let i in units){
      units[i].squadLayout = true
      let unitClass = 'unit-'+(units[i].notMet ? 'not-':'')+'met'
      //if(units[i].reqGP && units[i]?.gp < units[i].reqGP) unitClass = 'unit-gp-not-met'
      if(opts.showStats){
        units[i].showStats = opts.showStats
        unitClass += '-stats-'+(units[i].statsNotMet ? 'not-':'')+'met'
      }else{
        if(units[i].notMet && units[i].rarityMet) unitClass = 'unit-met-stats-not-met'
      }
      if(colCount == 0) html += '<tr>';
      colCount++;
      html += '<td class="unit-image '+unitClass+'">'

      html += await GetCharImg(units[i], true)
      html += '</td>'
      if(opts.showStats){
        html += '<td class="stat-table-td" colspan="3"><table class="stat-table">';
        if(units[i].stats?.length > 0){
          for(let s in units[i].stats){
            html += '<tr class="stat-title'+(units[i].stats[s].notMet ? '':' stat-title-met')+'"><td colspan="3">'+units[i].stats[s].nameKey+'</td></tr>'
            html += '<tr align="center"><td class="stat-td">'+units[i].stats[s].min+'</td><td class="stat-td'+(units[i].stats[s].notMet ? ' stat-not-met':'')+'">'+units[i].stats[s].stat+'</td><td class="stat-td">'+(units[i].stats[s].max ? units[i].stats[s].max:'')+'</td></tr>'
          }

        }
        html += '</table></td>'
      }
      if(colCount == colLimit){
        colCount = 0
        html += '</tr>'
      }
      if(colCount != 0 && colCount != colLimit && units.length == (+i + 1)){
        for(let c=colCount;c<colLimit;c++){
          html += '<td></td>'
          if(opts.showStats) html += '<td></td>'
        }
        html += '</tr>'
      }
    }
    if(squadData.info?.note) html += '<tr><td class="squad-note" colspan="'+opts.tdSpan+'">'+squadData.info.note+'</td></tr>'
    return html
  }catch(e){
    console.error(e)
  }
}
module.exports = async(squadData = {}, opts = {})=>{
  try{
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/squad.css" rel="stylesheet">'
    html += '<link href="/css/unitImg.css" rel="stylesheet">'
    html += '</head>'
    let header = opts.playerName+'\'s units for Squad '+opts.squadName
    if(opts.header) header = opts.header
    html += '<body>'
    html += '<table padding="0">'
      if(squadData.includeHeader) html += '<tr><td class="title" colspan="'+opts.tdSpan+'">'+header+'</td></tr>'
      if(opts.showStats){
        html += '<tr align="center">'
        for(let i=0;i<opts.colLimit;i++) html += '<td>Unit</td><td class="stat-td">Min</td><td class="stat-td">Value</td><td class="stat-td">Max</td>'
        html += '</tr>'
      }
      const squadHtml = await GetSquadHTML(squadData, opts)
      if(squadHtml) html += squadHtml
    if(squadData.includeFooter && opts.footer) html += '<tr><td colspan="'+(opts.tdSpan || 5)+'" class="footer-text">'+opts.footer+'</td></tr>'
    html += '</table>'
    html += '</body>'
    html += '</html>'
    return html
  }catch(e){
    console.error(e);
  }
}
