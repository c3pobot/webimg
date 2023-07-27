'use strict'
const GetGearImg = require('./getGearImg')
const isOdd = (num)=>{
  return num % 2
}
module.exports = async(gear = [], info = {})=>{
  try{
    let colLimit = 2, colCount = 0, gearHTML, bkImg = 'gear-even', oddCount = 0
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/gear.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table padding="0">'
      html += '<tr class="header-text"><td colspan="'+(+colLimit * 2)+'">'+info.header+'</td></tr>'
      if(gear.length > 0){
        for(let i in gear){
          if(colCount == 0){
            if(isOdd(oddCount)){
              bkImg = 'gear-odd'
            }else{
              bkImg = 'gear-even'
            }
            oddCount++
            html += '<tr class="'+bkImg+'">'
          }
          colCount++
          html += '<td class="gear-image">'
          html += await GetGearImg(gear[i])
          html += '</td><td class="gear-name">'+gear[i].nameKey+'<br> x '+gear[i].count+'</td>'
          if(colCount == colLimit){
            colCount = 0
            html += '</tr>'
          }
          if(colCount != 0 && colCount != colLimit && gear.length == (+i + 1)){
            for(let c=colCount;c<colLimit;c++){
              html += '<td></td><td></td>'
            }
            html += '</tr>'
          }
        }
      }
      if(info.footer) html += '<tr class="footer-text"><td colspan="'+(+colLimit * 2)+'">'+info.footer+'</td></tr>'
    html += '</table>'
    html += '</body>'
    html += '</html>'
    return {html: html, colLimit: colLimit}
  }catch(e){
    console.error(e);
  }
}
