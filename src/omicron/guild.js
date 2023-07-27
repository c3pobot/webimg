'use strict'
const isOdd = (num)=>{
  return num % 2
}
module.exports = async(data = {})=>{
  try{
    if(!data.guild && !data.skillInfo && !data.uInfo && !data.have && !data.haveNot) return
    let oddCount = 0
    const getBkg = ()=>{
      let bkImg = 'unit-even'
      if(isOdd(oddCount)){
        bkImg = 'unit-odd'
      }else{
        bkImg = 'unit-even'
      }
      oddCount++;
      return bkImg
    }
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/conquest.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table width="100%">'
      html += '<tr>'
      html += '<td colspan="3">'+data?.guild.name+' '+data.skillInfo.type?.toUpperCase()+' omicron for '+data.uInfo.nameKey+' '+data.skillInfo.label+':'+data.skillInfo.nameKey+'</td>'
      html += '<tr class="title" align="left">'
      html += '<td >Name</td><td>GP</td><td>Gear/Relic</td>'
      html += '</tr>'
      html += '</tr>'
      if(data.have.length > 0){
        html += '<tr>'
        html += '<td class="title" colspan="3"  align="left">Has Omicron ('+data.have.length+'/'+(data.have.length + data.haveNot.length)+')</td>'
        html += '</tr>'

        for(let i in data.have){
          html += '<tr class="'+(getBkg())+'"  align="left">'
          html += '<td>'+data.have[i].member+'</td>'
          html += '<td>'+data.have[i].gp+'</td>'
          if(data.have[i].gear >= 13 && data.have[i].relic > 0){
            html += '<td>R'+data.have[i].relic?.toString()?.padStart(2,0)+'</td>'
          }else{
            html += '<td>G'+data.have[i].gear?.toString()?.padStart(2,0)+'</td>'
          }
          html += '</tr>'
        }
      }
      if(data.haveNot.length > 0){
        html += '<tr>'
        html += '<td class="title" colspan="3" align="left">Does Not Have Omicron ('+data.haveNot.length+'/'+(data.have.length + data.haveNot.length)+')</td>'
        html += '</tr>'
        for(let i in data.haveNot){
          html += '<tr class="'+(getBkg())+'" align="left">'
          html += '<td>'+data.haveNot[i].member+'</td>'
          html += '<td>'+data.haveNot[i].gp+'</td>'
          if(data.haveNot[i].gear >= 13 && data.haveNot[i].relic > 0){
            html += '<td>R'+data.haveNot[i].relic?.toString()?.padStart(2,0)+'</td>'
          }else{
            html += '<td>G'+data.haveNot[i].gear?.toString()?.padStart(2,0)+'</td>'
          }
          html += '</tr>'
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
