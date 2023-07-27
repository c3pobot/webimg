'use strict'
const numeral = require('numeral')
const HP = require('../helper')

const { gearColors} = require("../../enum")
const GetUnitStats = require('./getUnitStats')
module.exports = async(unit1 = {}, unit2 = {}, uInfo = {}, info = {})=>{
  try{
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/unit.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
      html += '<table class="unit-image">'
        html += '<tr>'
          html += '<td colspan="3">'
          html += '<table class="unit-portrait-compare" background="/portrait/'+uInfo.thumbnailName+'.png">'
            html += '<tr><td class="unit-name" id="unit-name">'+uInfo.nameKey+'</td></tr>'
            html += '<tr><td colspan="3">&nbsp;</td></tr>'
            html += '<tr><td valign="bottom">'
              html += '<table class="unit-extra" width="100%">'
              if(unit1.combatType === 1 && unit1.skills?.length > 0){
                for(let i in unit1.skills) html += '<tr><td colspan="3" class="unit-zeta"><img src="/asset/'+unit1.skills[i].img+'.png"> '+unit1.skills[i].type+' : '+unit1.skills[i].nameKey+'</td></tr>'
              }
              html += '</table>'
            html += '</td></tr>'
          html += '</table>'
          html += '</td>'
        html += '</tr>'
        html += '<tr class="stat-title">'
          html += '<td class="unit-stat">Rarity</td>'
          html += '<td>'
            for(let i=0;i<7;i++) html += '<img src="/asset/'+(i < unit1.rarity ? 'star-yellow':'star-grey')+'.png">';
          html += '</td>'
          html += '<td>'
            for(let i=0;i<7;i++) html += '<img src="/asset/'+(i < unit2.rarity ? 'star-yellow':'star-grey')+'.png">';
          html += '</td>'
        html += '</tr>'
        if(uInfo.combatType === 1){
          html += '<tr class="stat-relic" id="stat-relic">'
            html += '<td class="unit-stat">Gear/Relic</td>'
            html += '<td class="unit-stat" id="unit1-gear"><div style="color: '+unit1.gear?.color+'">'+unit1.gear?.value+'</div></td>'
            html += '<td class="unit-stat" id="unit2-gear"><div style="color: '+unit2.gear?.color+'">'+unit2.gear?.value+'</div></td>'
          html += '</tr>'
        }
        html += '<tr class="stat-title">'
          html += '<td class="unit-stat">GP</td>'
          html += '<td class="unit-stat" id="unit1-gp">'+numeral(unit1.gp).format('0,0')+'</td>'
          html += '<td class="unit-stat" id="unit2-gp">'+numeral(unit2.gp).format('0,0')+'</td>'
        html += '</tr>'
        const unitStats = await GetUnitStats(unit1, unit2, uInfo)
        if(unitStats) html += unitStats
        if(info.footer) html += '<tr><td colspan="3" class="footer-text">'+info.footer+'</td></tr>'
      html += '</table>'
    html += '</body>'
    return html
  }catch(e){
    console.error(e)
  }
}
