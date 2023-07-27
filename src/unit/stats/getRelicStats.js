'use strict'
const numeral = require('numeral')
const HP = require('../helper')
const { relicStats } = require('../../enum')
module.exports = (stats = {}, extraRowCount = 0, oddCount = 0)=>{
  try{
    let html
    for(let i in relicStats){
      if(stats.final[relicStats[i].id] && stats.final[relicStats[i].id] > relicStats[i].base){
        const bkImg = HP.getBkImg(oddCount)
        extraRowCount++;
        oddCount++;
        if(!html) html = ''
        if(pct[relicStats[i].id]){
          html += '<tr class="'+bkImg+'"><td class="stat-left">'+relicStats[i].nameKey+' : </td><td class="stat-right">'+numeral(stats.final[relicStats[i].id] * 100).format("0.00")+'%</td></tr>'
        }else{
          html += '<tr class="'+bkImg+'"><td class="stat-left">'+relicStats[i].nameKey+' : </td><td class="stat-right">'+numeral(stats.final[relicStats[i].id]).format("0,0")+'</td></tr>'
        }
      }
    }
    if(html) return ({html: html, extraRowCount: extraRowCount, oddCount: oddCount})
  }catch(e){
    console.error(e)
  }
}
