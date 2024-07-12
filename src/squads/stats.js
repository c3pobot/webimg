'use strict'
const GetCharImg = require('../getCharImg')
const isOdd = (num)=>{
  return num % 2
}
const GetSquadHTML = async(squadData = {}, opts = {})=>{
  try{
    let colLimit = opts.tdSpan || 5, colCount = 0, index = 0, html = '', units = squadData.units
    for(let i in units){
      if(colCount == 0) html += '<tr>';
      colCount++;
      html += '<td><table>'
        html += '<tr><td valign="top" width="130px">'
        html += await GetCharImg(units[i], true)
        html += '</td></tr>'
        html += '<tr><td class="stat-table-td" colspan="2" align="center"><table class="stat-table">'
          html += '<tr><td>Speed</td><td>'+units[i].stats?.speed+'</td></tr>'
          html += '<tr><td>Health</td><td>'+units[i].stats?.health+'</td></tr>'
          html += '<tr><td>Prot</td><td>'+units[i].stats?.protection+'</td></tr>'
          html += '<tr><td>PD</td><td>'+units[i].stats?.pd+'</td></tr>'
          html += '<tr><td>SD</td><td>'+units[i].stats?.sd+'</td></tr>'
        html += '</table></td></tr>'
      html += '</table></td>'
      if(colCount == colLimit){
        colCount = 0
        html += '</tr>'
      }
      if(colCount != 0 && colCount != colLimit && units.length == (+i + 1)){
        for(let c=colCount;c<colLimit;c++) html += '<td></td>';
        html += '</tr>'
      }
    }
    if(squadData.note) html += '<tr><td class="squad-note" colspan="'+(opts.tdSpan || 5)+'">'+squadData.note+'</td></tr>'
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
      if(squadData.includeHeader) html += '<tr><td class="title" colspan="'+(opts.tdSpan || 5)+'">'+header+'</td></tr>'
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
