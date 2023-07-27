'use strict'
const isOdd = (num)=>{
  return num % 2
}
const getDiscImage = (obj)=>{
  let html = '<div class="disc-img">'
  html += '<div class="disc-tier"><img class="disc-src" src="/asset/'+obj.tierId+'.png"></div>'
  html += '<div class="disc-emblem"><img class="disc-src" src="/asset/'+obj.texture+'.png"></div>'
  html += '<div class="disc-power"><img class="disc-src" src="/asset/artifact-power-'+obj.powerLevel+'.png"></div>'
  html += '</div>'
  return html
}

module.exports = async(data = {})=>{
  try{
    let colCount = 0, colLimit = 2, bkImg = 'unit-even', oddCount = 0
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/conquest.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table width=100%>'
    //
    html += '<tr class="title"><td colspan="4">'+data.name+'\'s Galactic Conquest</td></tr>'
    //html += '<tr class="status"><td align="right"><img class="currency" src="/asset/conquest-currency.png"></td><td class="status-td">  '+data.credits+'/3500</td><td align="right"><img class="currency" src="/asset/conquest-keys.png"></td><td class="status-td">'+data.keys+'/'+data.totalKeys+'</td></tr>'

    if(data.equippedDisc){
      html += '<tr class="title"><td colspan="4">Equipped</td></tr>'
      for(let i in data.equippedDisc){
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
        html += '<td class="pic-td">'
        html += await getDiscImage(data.equippedDisc[i])
        html += '</td>'
        html += '<td class="desc-td"><table><tr><td class="disc-name">'+data.equippedDisc[i].nameKey+'</td></tr>'
        html += '<tr><td class="disc-desc">'+data.equippedDisc[i].descriptionKey+'</td></tr></table></td>'
        if(colCount == colLimit){
          colCount = 0;
          html += "</tr>"
        }
        if(colCount != 0 && colCount != colLimit && data.equippedDisc.length == (+i + 1) ){
          colCount = 0
          html += "<td colspan='2'></td></tr>"
        }
      }
    }
    if(data.unequppedDisc){
      html += '<tr class="title"><td colspan="4">Unequipped</td></tr>'
      for(let i in data.unequppedDisc){
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
        html += '<td>'
        html += getDiscImage(data.unequppedDisc[i])
        html += '</td>'
        html += '<td><table><tr><td class="disc-name">'+data.unequppedDisc[i].nameKey+' ('+data.unequppedDisc[i].count+')</td></tr>'
        html += '<tr><td class="disc-desc">'+data.unequppedDisc[i].descriptionKey+'</td></tr></table></td>'
        if(colCount == colLimit){
          colCount = 0;
          html += "</tr>"
        }
        if(colCount != 0 && colCount != colLimit && data.unequppedDisc.length == (+i + 1) ){
          html += "<td colspan='2'></td></tr>"
        }
      }
    }
    html += '<tr><td colspan="4">Data Updated : '+(new Date(data.updated)).toLocaleString('en-US', {timeZone: 'America/New_York'})+'</td></tr>'
    //
    html += '</table>'
    html += '</body>'
    html += '</html>'
    if(data.unequppedDisc || data.equippedDisc) return html
  }catch(e){
    console.error(e);
  }
}
