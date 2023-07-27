'use strict'
const isOdd = (num)=>{
  return num % 2
}
const GetUnits = (units = [])=>{
  try{
    let html = '<table border="0" padding="0" width="100%">', colCount = 0, oddCount = 0, tdClass = 'row-even'
      for(let i in units){
        if(colCount == 0){
          if(isOdd(oddCount)){
            tdClass = 'row-odd'
          }else{
            tdClass = 'row-even'
          }
          oddCount++
          html += '<tr class="'+tdClass+'">'
        }
        html += '<td class="'+(units[i].player ? 'player':'no-player')+'">'+units[i].nameKey+' - '+(units[i].player ? units[i].player:'NONE')
        if(units[i].count >= 0) html += ' - ('+(units[i].available || 0)+'/'+units[i].count+')'
        html += '</td>'
        colCount++
        if(+i + 1 === +units?.length && colCount < 3) colCount = 3
        if(colCount === 3){
          html += '</tr>'
          colCount = 0
        }
      }
    html += '</table>'
    return html
  }catch(e){
    console.error(e);
  }
}
module.exports = async(data = [], info = {})=>{
  try{
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/tbPlatoons.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
      html += '<table width=100% border="0">'
        html += '<tr>'
          html += '<td class="title">'+info.guild+' - '+info.nameKey+' - Platoons'
        html += '</tr>'
        for(let i in data){
          html += '<tr><td class="platoon">'+data[i].id+' '+data[i].type+' '+data[i].nameKey+' ('+data[i].points+'/'+data[i].totalPoints+')</td></tr>'
          for(let s in data[i].squads){
            html += '<tr><td class="squad">'+data[i].type+' '+data[i].nameKey+' Squad '+data[i].squads[s].num+' ('+data[i].squads[s].points+')</td></tr>'
            html += '<tr><td>'
            html += await GetUnits(data[i].squads[s].units)
            html += '</td></tr>'
          }
        }
      html += '</table>'
    html += '</body>'
    html += '</html>'
    return html
  }catch(e){
    console.error(e);
  }
}
