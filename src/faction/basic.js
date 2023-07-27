'use strict'
const GetCharImg = require('../getCharImg')
const isOdd = (num)=>{
  return num % 2
}

module.exports = async(data = [], info = {})=>{
  try{
    let colLimit = 5, colCount = 0, unitHTML, bkImg = 'unit-even', oddCount = 0
    if(data.length < 5) colLimit = +data.length
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/faction.css" rel="stylesheet">'
    html += '<link href="/css/unitImg.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table padding="0">'

    html += '<tr><td colspan="'+colLimit+'" class="player-name">'+info.player+'\'s '+info.nameKey+' units</td></tr>'
    for(let i in data){
      if(colCount == 0){
        if(isOdd(oddCount)){
          bkImg = 'unit-odd'
        }else{
          bkImg = 'unit-even'
        }
        oddCount++
        html += '<tr class="'+bkImg+'">'
      }
      colCount++;
      html += '<td valign="top">'
      html += await GetCharImg(data[i], true)
      //html += '<div class="unit-name">'+data[i].nameKey+'</div>'
      html += '</td>'
      if(colCount == colLimit){
        colCount = 0
        html += '</tr>'
      }
      if(colCount != 0 && colCount != colLimit && data.length == (+i + 1)){
        for(let c=colCount;c<colLimit;c++){
          html += '<td></td>'
        }
        html += '</tr>'
      }
    }
    if(info.footer) html += '<tr class="footer-text"><td colspan="'+colLimit+'">'+info.footer+'</td></tr>'
    html += '</table>'
    html += '</body>'
    html += '</html>'
    return {html: html, colLimit: colLimit}
  }catch(e){
    console.error(e);
  }
}
