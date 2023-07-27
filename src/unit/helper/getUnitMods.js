'use strict'
const HP = require('../../helper')
module.exports = (mods)=>{
  try{
    let html = '<td id="unitMods" valign="top" background="/asset/stats-dk-bg.png">'
    html += '<table width="358">'
    html += '<tbody id="unit-mods">'
    html += '<tr>'
    html += '<td class="stat-title">Mods</td>'
    html += '</tr>'
    for(let i in mods){
      html += '<tr><td class="mod-image">'
      html += '<div class="mod-shape '+mods[i].shapeId+'"><div class="mod-icon '+mods[i].iconId+' '+mods[i].posId+'"></div></div>'
      html += '<div class="modsPrimary"><b>'+mods[i].pStatText+'</b></div>'
      html += '<div class="modsSecondary">'+mods[i].sStatText+'</div></td></tr>'
    }
    html += '</tbody>'
    html += '</table>'
    html += '</td>'
    return html
  }catch(e){
    console.error(e)
  }
}
