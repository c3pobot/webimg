const isOdd = (num)=>{
  return num % 2
}

module.exports = async( pUnit = {}, eUnit = {}, info = {})=>{
  try{
    let oddCount = 0
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/unit.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
      html += '<table class="unit-image" width="1100px">'
        html += '<tr><td colspan="3" class="unit-portrait-compare" id="unit-portrait" background="/portrait/'+pUnit.thumbnailName+'.png"><div class="unit-name" id="unit-name">'+pUnit.nameKey+'</div></td></tr>'
        html += '<tr class="stat-name"><td>Player</td><td id="player-name">'+info.player+'</td><td id="enemy-name">'+info.enemy+'</td>'
        html += '<tr class="stat-even unit-stat"><td>GP</td><td id="unit1-gp">'+pUnit.gp+'</td><td id="unit2-gp">'+eUnit.gp+'</td></tr>'
        html += '<tr class="stat-odd unit-stat"><td>Rarity Gear/Relic</td><td id="unit1-rarity">'+pUnit.gear?.value+'</td><td id="unit2-rarity">'+eUnit.gear?.value+'</td></tr>'
        html += '<tr class="stat-even unit-stat">'
          html += '<td>Health<br>Protection<br>Speed<br>Critical Damage</td>'
          html += '<td>'+(pUnit.stats[1] || 0)+'<br>'+(pUnit.stats[28] || 0)+'<br>'+(pUnit.stats[5] || 0)+'<br>'+(pUnit.stats[16] || 0)+'</td>'
          html += '<td>'+(eUnit.stats[1] || 0)+'<br>'+(eUnit.stats[28] || 0)+'<br>'+(eUnit.stats[5] || 0)+'<br>'+(eUnit.stats[16] || 0)+'</td>'
        html += '</tr>'
        html += '<tr class="stat-odd unit-stat">'
          html += '<td>Potency<br>Tenacity<br>Health Steal</td>'
          html += '<td>'+(pUnit.stats[17] || 0)+'<br>'+(pUnit.stats[18] || 0)+'<br>'+(pUnit.stats[27] || 0)+'</td>'
          html += '<td>'+(eUnit.stats[17] || 0)+'<br>'+(eUnit.stats[18] || 0)+'<br>'+(eUnit.stats[27] || 0)+'</td>'
        html += '</tr>'
        html += '<tr class="stat-even unit-stat">'
          html += '<td>Physical Damage<br>Critical Chance<br>Armor Pen<br>Armor</td>'
          html += '<td>'+(pUnit.stats[6] || 0)+'<br>'+(pUnit.stats[14] || 0)+'<br>'+(pUnit.stats[10] || 0)+'<br>'+(pUnit.stats[8] || 0)+'</td>'
          html += '<td>'+(eUnit.stats[6] || 0)+'<br>'+(eUnit.stats[14] || 0)+'<br>'+(eUnit.stats[10] || 0)+'<br>'+(eUnit.stats[8] || 0)+'</td>'
        html += '</tr>'
        html += '<tr class="stat-odd unit-stat">'
          html += '<td>Special Damage<br>Critical Chance<br>Resistance Pen<br>Resistance</td>'
          html += '<td>'+(pUnit.stats[7] || 0)+'<br>'+(pUnit.stats[15] || 0)+'<br>'+(pUnit.stats[11] || 0)+'<br>'+(pUnit.stats[9] || 0)+'</td>'
          html += '<td>'+(eUnit.stats[7] || 0)+'<br>'+(eUnit.stats[15] || 0)+'<br>'+(eUnit.stats[11] || 0)+'<br>'+(eUnit.stats[9] || 0)+'</td>'
        html += '</tr>'
        if(pUnit.combatType == 1 && ((pUnit.addStats?.length > 0) || (eUnit.addStats?.length > 0))){
          let addStats = pUnit.addStats
          if(!addStats && eUnit.addStats) addStats = eUnit.addStats
          if(addStats?.length > 0){
            for(let i in addStats){
              let bkImg = 'stat-even'
              if(isOdd(oddCount)) bkImg = 'stat-odd'
              oddCount++;
              html += '<tr class="'+bkImg+' unit-stat">'
                html += '<td>'+addStats[i].nameKey+' : </td>'
                html += '<td>'+(pUnit.addStats[i]?.value || 0)+'</td>'
                html += '<td>'+(eUnit.addStats[i]?.value || 0)+'</td>'
              html += '</tr>'
            }
          }
        }
        if(pUnit.damage?.length > 0 || eUnit.damage?.length > 0){
          let unitDamage = pUnit.damage
          if(!unitDamage && eUnit.damage) unitDamage = eUnit.damage
          if(unitDamage?.length > 0){
            html += '<tr class="stat-title"><td colspan="3">Ability Damage</td></tr>'
            for(let i in unitDamage){
              let bkImg = 'stat-even'
              if(isOdd(oddCount)) bkImg = 'stat-odd'
              oddCount++;
              html += '<tr class="'+bkImg+' unit-stat">'
                html += '<td>'+unitDamage[i].nameKey+' ('+unitDamage[i].type+') : </td>'
                html += '<td>'
                for(let d in unitDamage[i].damage) html += (pUnit.damage[i]?.damage[d] || 0)+'<br>'
                html += '</td>'
                html += '<td>'
                for(let d in unitDamage[i].damage) html += (eUnit.damage[i]?.damage[d] || 0)+'<br>'
                html += '</td>'
              html += '</tr>'
            }
          }
        }
        if(pUnit.specStat?.info?.length > 0){
          html += '<tr><td colspan="3" class="stat-title">'+(unit1.specStat.nameKey ? unit1.specStat.nameKey:'')+'</td></tr>'
          for(let i in pUnit.specStat.info){
            let bkImg = 'stat-even'
            if(isOdd(oddCount)) bkImg = 'stat-odd'
            oddCount++;
            html += '<tr class="'+bkImg+' unit-stat">'
              html += '<td>'+pUnit.specStat.info[i].nameKey+' : </td>'
              html += '<td>'+(pUnit.specStat?.info[i]?.value || 0)+'</td>'
              html += '<td>'+(eUnit.specStat?.info[i]?.value || 0)+'</td>'
            html += '</tr>'
          }
        }
        if(info.footer) html += '<tr><td colspan="3" class="footer-text">'+info.footer+'</td></tr>'
      html += '</table>'
    html += '</body>'
    return html
  }catch(e){
    console.error(e);
  }
}
