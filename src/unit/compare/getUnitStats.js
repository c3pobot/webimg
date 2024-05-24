'use strict'
const isOdd = (num)=>{
  return num % 2
}
module.exports = async(unit1 = {}, unit2 = {}, uInfo = {})=>{
  let extraRowCount = 0, oddCount = 0, stats1 = unit1.stats, stats2 = unit2.stats
  let html = '<tr class="stat-even">'
    html += '<td class="unit-stat">Health<br>Protection<br>Speed<br>Critical Damage</td>'
    html += '<td class="unit-stat" id="unit1-stat-1">'+(stats1[1] || 0)+'<br>'+(stats1[28] || 0)+'<br>'+(stats1[5] || 0)+'<br>'+(stats1[16] || 0)+'</td>'
    html += '<td class="unit-stat" id="unit2-stat-1">'+(stats2[1] || 0)+'<br>'+(stats2[28] || 0)+'<br>'+(stats2[5] || 0)+'<br>'+(stats2[16] || 0)+'</td>'
  html += '</tr>'
  html += '<tr class="stat-odd">'
    html += '<td class="unit-stat">Potency<br>Tenacity<br>Health Steal</td>'
    html += '<td class="unit-stat" id="unit1-stat-2">'+(stats1[17] || 0)+'<br>'+(stats1[18] || 0)+'<br>'+(stats1[27] || 0)+'</td>'
    html += '<td class="unit-stat" id="unit2-stat-2">'+(stats2[17] || 0)+'<br>'+(stats2[18] || 0)+'<br>'+(stats2[27] || 0)+'</td>'
  html += '</tr>'
  html += '<tr class="stat-even">'
    html += '<td class="unit-stat">Physical Damage<br>Critical Chance<br>Armor Pen<br>Armor</td>'
    html += '<td class="unit-stat" id="unit1-stat-3">'+(stats1[6] || 0)+'<br>'+(stats1[14] || 0)+'<br>'+(stats1[10] || 0)+'<br>'+(stats1[8] || 0)+'</td>'
    html += '<td class="unit-stat" id="unit2-stat-3">'+(stats2[6] || 0)+'<br>'+(stats2[14] || 0)+'<br>'+(stats2[10] || 0)+'<br>'+(stats2[8] || 0)+'</td>'
  html += '</tr>'
  html += '<tr class="stat-odd">'
    html += '<td class="unit-stat">Special Damage<br>Critical Chance<br>Resistance Pen<br>Resistance</td>'
    html += '<td class="unit-stat" id="unit1-stat-4">'+(stats1[7] || 0)+'<br>'+(stats1[15] || 0)+'<br>'+(stats1[11] || 0)+'<br>'+(stats1[9] || 0)+'</td>'
    html += '<td class="unit-stat" id="unit2-stat-4">'+(stats2[7] || 0)+'<br>'+(stats2[15] || 0)+'<br>'+(stats2[11] || 0)+'<br>'+(stats2[9] || 0)+'</td>'
  html += '</tr>'
  if(unit1.addStats?.length > 0){
    extraRowCount += +unit1.addStats.length
    for(let i in unit1.addStats){
      let bkImg = 'stat-even'
      if(isOdd(oddCount)) bkImg = 'stat-odd'
      oddCount++;
      html += '<tr class="'+bkImg+'"><td class="unit-stat">'+unit1.addStats[i].nameKey+' : </td>'
        html += '<td class="unit-stat">'+unit1.addStats[i]?.value+'</td>'
        html += '<td class="unit-stat">'+unit2.addStats[i]?.value+'</td>'
      html += '</tr>'
    }
  }
  if(unit1?.damage?.length > 0){
    extraRowCount += +unit1.damage.length
    html += '<tr class="stat-title"><td colspan="3" class="unit-stat">Ability Damage</td></tr>'
    for(let i in unit1.damage){
      let bkImg = 'stat-even'
      if(isOdd(oddCount)) bkImg = 'stat-odd'
      oddCount++;
      html += '<tr class="'+bkImg+'"><td class="unit-stat">'+unit1.damage[i].nameKey+' ('+unit1.damage[i].type+') : </td>'
        html += '<td class="unit-stat">'
        for(let d in unit1.damage[i].damage) html += unit1.damage[i].damage[d]+'<br>'
        html += '</td>'
        html += '<td class="unit-stat">'
        for(let d in unit2.damage[i].damage) html += unit2.damage[i].damage[d]+'<br>'
        html += '</td>'
      html += '</tr>'
    }
  }
  return html
}
