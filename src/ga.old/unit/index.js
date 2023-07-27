'use strict'
const numeral = require('numeral')
const mainCss = require('../../css/unit.css')
const isOdd = (num)=>{
  return num % 2
}
module.exports = async(unit1 = {}, unit2 = {}, info = {})=>{
  try{
    let oddCount = 0
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet"><style>'+mainCss+'</style></head>'
    html += '<body>'
      html += '<table class="unit-image">'
        html += '<tr><td colspan="3" class="unit-portrait-compare" background="data:image/png;base64,'+unit1.portrait+'"><div class="unit-name" id="unit-name">'+unit1.nameKey+'</div></td></tr>'
        html += '<tr class="stat-name"><td>Player</td><td id="player-name">'+info.player+'</td><td id="enemy-name">'+info.enemy+'</td></tr>'
        html += '<tr class="stat-even unit-stat"><td>GP</td><td id="unit1-gp">'+numeral(unit1?.gp || 0).format('0,0')+'</td><td id="unit2-gp">'+numeral(unit2?.gp || 0).format('0,0')+'</td></tr>'
        html += '<tr class="stat-odd unit-stat"><td>Rarity Gear/Relic</td><td id="unit1-rarity">'+(unit1?.rarity || 0)+'* '+(unit1.combatType == 1 ? unit1.gear.value:'')+' </td><td id="unit2-rarity">'+(unit2?.rarity || 0)+'* '+(unit2.combatType == 1 ? unit2.gear.value:'')+'</td></tr>'

        html += '<tr class="stat-even unit-stat"><td>Health<br>Protection<br>Speed<br>Critical Damage</td>'
        html += '<td id="unit1-stat-1">'+(unit1.stats[1] || 0)+'<br>'+(unit1.stats[28] || 0)+'<br>'+(unit1.stats[5] || 0)+'<br>'+(unit1.stats[16] || 0)+'</td>'
        html += '<td id="unit2-stat-1">'+(unit2.stats[1] || 0)+'<br>'+(unit2.stats[28] || 0)+'<br>'+(unit2.stats[5] || 0)+'<br>'+(unit2.stats[16] || 0)+'</td></tr>'
        html += '<tr class="stat-odd unit-stat"><td>Potency<br>Tenacity<br>Health Steal</td>'
        html += '<td id="unit1-stat-2">'+(unit1.stats[17] || 0)+'<br>'+(unit1.stats[18] || 0)+'<br>'+(unit1.stats[27] || 0)+'</td>'
        html += '<td id="unit2-stat-2">'+(unit2.stats[17] || 0)+'<br>'+(unit2.stats[18] || 0)+'<br>'+(unit2.stats[27] || 0)+'</td></tr>'
        html += '<tr class="stat-even unit-stat"><td>Physical Damage<br>Critical Chance<br>Armor Pen<br>Armor</td>'
        html += '<td id="unit1-stat-3">'+(unit1.stats[6] || 0)+'<br>'+(unit1.stats[14] || 0)+'<br>'+(unit1.stats[10] || 0)+'<br>'+(unit1.stats[8] || 0)+'</td>'
        html += '<td id="unit2-stat-3">'+(unit2.stats[6] || 0)+'<br>'+(unit2.stats[14] || 0)+'<br>'+(unit2.stats[10] || 0)+'<br>'+(unit2.stats[8] || 0)+'</td></tr>'
        html += '<tr class="stat-odd unit-stat"><td>Special Damage<br>Critical Chance<br>Resistance Pen<br>Resistance</td>'
        html += '<td id="unit1-stat-4">'+(unit1.stats[7] || 0)+'<br>'+(unit1.stats[15] || 0)+'<br>'+(unit1.stats[11] || 0)+'<br>'+(unit1.stats[9] || 0)+'</td>'
        html += '<td id="unit2-stat-4">'+(unit2.stats[7] || 0)+'<br>'+(unit2.stats[15] || 0)+'<br>'+(unit2.stats[11] || 0)+'<br>'+(unit2.stats[9] || 0)+'</td></tr>'
        if(unit1.combatType == 1 && (unit1.addStats?.length > 0 || unit2.addStats?.length > 0)){
          let addStats = unit1.addStats
          if(!addStats && unit2.addStats) addStats = unit2.addStats
          if(addStats?.length > 0){
            for(let i in addStats){
              let bkImg = 'stat-even'
              if(isOdd(oddCount)) bkImg = 'stat-odd'
              oddCount++;
              html += '<tr class="'+bkImg+' unit-stat"><td>'+addStats[i].nameKey+' : </td><td>'+(unit1?.addStats[i]?.value || 0)+'</td><td>'+(unit2?.addStats[i]?.value || 0)+'</td></tr>'
            }
          }
        }
        if(unit1?.damage?.length > 0 || unit2?.damage?.length > 0){
          let unitDamage = unit1.damage
          if(!unitDamage && unit2.damage) unitDamage = unit2.damage
          if(unitDamage && unitDamage.length > 0){
            html += '<tr class="stat-title"><td colspan="3">Ability Damage</td></tr>'
            for(let i in unitDamage){
              let bkImg = 'stat-even'
              if(isOdd(oddCount)) bkImg = 'stat-odd'
              oddCount++;
              html += '<tr class="'+bkImg+' unit-stat"><td>'+unitDamage[i].nameKey+' ('+unitDamage[i].type+') : </td><td>'
              for(let d in unitDamage[i].damage) html += (unit1?.damage[i]?.damage[d] || 0)+'<br>'
              html += '</td><td>'
              for(let d in unitDamage[i].damage) html += (unit2?.damage[i]?.damage[d] || 0)+'<br>'
              html += '</td></tr>'
            }
          }
        }
        if(info.footer) html += '<tr><td colspan="3" class="footer-text">'+info.footer+'</td></tr>'
      html += '</table>'
    html += '</body>'
    return {html: html}
  }catch(e){
    console.error(e)
  }
}
