'use strict'
const numeral = require('numeral')
const HP = require('../helper')
const { relicStats, pct } = require('../../enum')
module.exports = (stats1 = {}, stats2 = {}, extraRowCount = 0, oddCount = 0)=>{

  try{

    let html

    for(let i in relicStats){

      if(stats1.final[relicStats[i].id] && stats1.final[relicStats[i].id] > relicStats[i].base){

        const bkImg = HP.getBkImg(oddCount)

        extraRowCount++;

        oddCount++;

        if(!html) html = ''

        html += '<tr class="'+bkImg+'">'

          html += '<td class="unit-stat">'+relicStats[i].nameKey+' : </td>'

        if(pct[relicStats[i].id]){

          html += '<td class="unit-stat">'+numeral(stats1.final[relicStats[i].id] * 100).format("0.00")+'%</td>'

          html += '<td class="unit-stat">'+numeral(stats2.final[relicStats[i].id] * 100).format("0.00")+'%</td>'

        }else{

          html += '<td class="unit-stat">'+numeral(stats1.final[relicStats[i].id]).format("0,0")+'</td>'

          html += '<td class="unit-stat">'+numeral(stats2.final[relicStats[i].id]).format("0,0")+'</td>'

        }

        html += '</tr>'

      }

    }

    if(html) return ({html: html, extraRowCount: extraRowCount, oddCount: oddCount})

  }catch(e){

    console.error(e)

  }

}
