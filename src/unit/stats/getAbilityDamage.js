'use strict'
const HP = require('../helper')
module.exports = async(unit = {}, uInfo = {}, extraRowCount = 0, oddCount = 0)=>{
  try{
    let html
    const dmgs = await HP.FormatAbilityDamage(unit, uInfo)
    const specStats = await HP.specStats(unit)
    //let bkImg = 'stat-even'
    if(dmgs?.length > 0){
      if(!html) html = ''
      extraRowCount += +dmgs.length
      html += '<tbody id="abDamage">'
      html += '<tr class="stat-title"><td colspan="2">Ability Damage</td></tr>'
      for(let i in dmgs){
        const bkImg = HP.getBkImg(oddCount)
        oddCount++;
        html += '<tr class="'+bkImg+'"><td class="stat-left">'+dmgs[i].nameKey+' ('+dmgs[i].type+') : </td><td class="stat-right">'
        for(let d in dmgs[i].damage) html += dmgs[i].damage[d]+'<br>'
        html += '</td></tr>'
      }
      html += '</tbody>'
    }
    if(specStats?.stats?.length > 0){
      extraRowCount += +specStats.stats.length
      if(!html) html = ''
      html += '<tbody id="specStat">'
      if(specStats.nameKey) html += '<tr><td colspan="2" class="stat-title">'+specStats.nameKey+'</td></tr>'
      for(let i in specStats.stats){
        const bkImg = HP.getBkImg(oddCount)
        oddCount++;
        html += '<tr class="'+bkImg+'"><td class="stat-left">'+specStats.stats[i].nameKey+' : </td><td class="stat-right">'+specStats.stats[i].value+'</td></tr>'
      }
      html += '</tbody>'
    }
    return({html: html, extraRowCount: extraRowCount, oddCount: oddCount})
  }catch(e){
    console.error(e)
  }
}
