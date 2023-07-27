'use strict'
const isOdd = (num)=>{
  return num % 2
}
module.exports = async(unit={})=>{
  try{
    let extraRowCount = 0, oddCount = 0, stats
    if(unit.stats) stats = unit.stats
    if(!stats) stats = {}
    let html = "<tr class='stat-title'><td class='stat-left'>GP :</td><td class='stat-right'>"+unit.gp+"</td></tr>"
    html += "<tr class='stat-even'><td class='stat-left'>Health :<br>Protection :<br>Speed :<br>Critical Damage :</td><td class='stat-right' >"+(stats[1] || 0)+'<br>'+(stats[28] || 0)+'<br>'+(stats[5] || 0)+'<br>'+(stats[16] || 0)+"</td></tr>"
    html += "<tr class='stat-odd'><td class='stat-left'>Potency :<br>Tenacity :<br>Health Steal :</td><td class='stat-right'>"+(stats[17] || 0)+'<br>'+(stats[18] || 0)+'<br>'+(stats[27] || 0)+"</td></tr>"
    html += "<tr class='stat-even'><td class='stat-left'>Physical Damage :<br>Critical Chance :<br>Armor Pen :<br>Armor :</td><td class='stat-right'>"+(stats[6] || 0)+'<br>'+(stats[14] || 0)+'<br>'+(stats[10] || 0)+'<br>'+(stats[8] || 0)+"</td></tr>"
    html += "<tr class='stat-odd'><td class='stat-left'>Special Damage :<br>Critical Chance :<br>Resistance Pen :<br>Resistance :</td><td class='stat-right'>"+(stats[7] || 0)+'<br>'+(stats[15] || 0)+'<br>'+(stats[11] || 0)+'<br>'+(stats[9] || 0)+"</td></tr>"
    if(unit.addStats?.length > 0){
      extraRowCount += +unit.addStats.length
      for(let i in unit.addStats){
        let bkImg = 'stat-even'
        if(isOdd(oddCount)) bkImg = 'stat-odd'
        oddCount++;
        html += '<tr class="'+bkImg+'"><td class="stat-left">'+unit.addStats[i].nameKey+' : </td><td class="stat-right">'+unit.addStats[i].value+'</td></tr>'
      }
    }
    if(unit?.damage?.length > 0){
      extraRowCount += +unit.damage.length
      html += '<tr class="stat-title"><td colspan="2">Ability Damage</td></tr>'
      for(let i in unit.damage){
        let bkImg = 'stat-even'
        if(isOdd(oddCount)) bkImg = 'stat-odd'
        oddCount++;
        html += '<tr class="'+bkImg+'"><td class="stat-left">'+unit.damage[i].nameKey+' ('+unit.damage[i].type+') : </td><td class="stat-right">'
        for(let d in unit.damage[i].damage) html += unit.damage[i].damage[d]+'<br>'
        html += '</td></tr>'
      }
    }
    if(unit?.specStat?.info?.length > 0){
      extraRowCount += +unit.specStat.info.length
      html += '<tr><td colspan="2" class="stat-title">'+(unit.specStat.nameKey ? unit.specStat.nameKey:'')+'</td></tr>'
      for(let i in unit.specStat.info){
        let bkImg = 'stat-even'
        if(isOdd(oddCount)) bkImg = 'stat-odd'
        oddCount++;
        html += '<tr class="'+bkImg+'"><td class="stat-left">'+unit.specStat.info[i].nameKey+' : </td><td class="stat-right">'+unit.specStat.info[i].value+'</td></tr>'
      }
    }
    if(unit.combatType == 1 && unit.unitMods?.length > 0){
      if(extraRowCount < 2){
        let bkImg = 'stat-even'
        if(isOdd(oddCount)) bkImg = 'stat-odd'
        oddCount++;
        html += '<tbody>'
        html += '<tr class="'+bkImg+'"><td colspan="2"></td></tr>'
        if(extraRowCount < 1){
          let bkImg = 'stat-even'
          if(isOdd(oddCount)) bkImg = 'stat-odd'
          oddCount++;
          html += '<tr class="'+bkImg+'"><td colspan="2"></td></tr>'
        }
        html += '</tbody>'
      }
    }
    return html
  }catch(e){
    console.error(e);
  }
}
