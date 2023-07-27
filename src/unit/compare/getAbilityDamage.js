'use strict'
const HP = require('../helper')
module.exports = async(unit1 = {}, unit2 = {}, uInfo = {}, extraRowCount = 0, oddCount = 0)=>{

  try{

    let html

    const dmgs1 = await HP.FormatAbilityDamage(unit1, uInfo)

    const dmgs2 = await HP.FormatAbilityDamage(unit2, uInfo)

    const specStats1 = await HP.specStats(unit1)

    const specStats2 = await HP.specStats(unit2)

    //let bkImg = 'stat-even'

    if(dmgs1?.length > 0 && dmgs2?.length && dmgs1.length === dmgs2.length){

      if(!html) html = ''

      extraRowCount += +dmgs1.length

      html += '<tbody id="abDamage">'

      html += '<tr class="stat-title"><td colspan="3">Ability Damage</td></tr>'

      for(let i in dmgs1){

        const bkImg = HP.getBkImg(oddCount)

        oddCount++;

        html += '<tr class="'+bkImg+'">'

          html += '<td class="unit-stat">'+dmgs1[i].nameKey+' ('+dmgs1[i].type+') : </td>'

          html += '<td class="unit-stat">'

          for(let d in dmgs1[i].damage) html += dmgs1[i].damage[d]+'<br>'

          html += '</td>'

          html += '<td class="unit-stat">'

          for(let d in dmgs1[i].damage) html += dmgs2[i].damage[d]+'<br>'

          html += '</td>'

        html += '</tr>'

      }

      html += '</tbody>'

    }

    if(specStats1?.stats?.length > 0 && specStats2?.stats?.length > 0 && specStats1.stats.length === specStats2.stats.length){

      extraRowCount += +specStats1.stats.length

      if(!html) html = ''

      html += '<tbody id="specStat">'

      if(specStats1.nameKey) html += '<tr><td colspan="3" class="stat-title">'+specStats1.nameKey+'</td></tr>'

      for(let i in specStats1.stats){

        const bkImg = HP.getBkImg(oddCount)

        oddCount++;

        html += '<tr class="'+bkImg+'">'

          html += '<td class="unit-stat">'+specStats1.stats[i].nameKey+' : </td>'

          html += '<td class="unit-stat">'+specStats1.stats[i].value+'</td>'

          html += '<td class="unit-stat">'+specStats2.stats[i].value+'</td>'

        html += '</tr>'

      }

      html += '</tbody>'

    }

    return({html: html, extraRowCount: extraRowCount, oddCount: oddCount})

  }catch(e){

    console.error(e)

  }

}
