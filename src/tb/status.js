'use strict'
const isOdd = (num)=>{
  return num % 2
}
const CalcAverage = (score = 0, completed = 0)=>{
  try{
    let res = 0
    if(completed > 0) res = Math.floor(score / completed)
    return res.toLocaleString()
  }catch(e){
    console.error(e);
  }
}
module.exports = async(data)=>{
  try{
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/stats.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table width=100% border="0" class="review">'

    html += '<tr class="title">'
      html += '<td colspan="3">'+data.name+' '+data.nameKey+' Total Stars : '+data.totalStarCount+'</td>'
    html += '</tr>'
    html += '<tr class="title"><td>GP</td><td>Total</td><td>Undeployed</td></tr>'
    if(data.showTotalGp){
      html += '<tr class="ltbg"><td>Total</td><td>'+data.gp?.toLocaleString()+'</td><td>'+data.gpUndeployed?.toLocaleString()+'</td></tr>'
    }else{
      html += '<tr class="ltbg"><td>Char</td><td>'+data.gpChar?.toLocaleString()+'</td><td>'+data.gpCharUndepoyed?.toLocaleString()+'</td></tr>'
      html += '<tr class="ltbg"><td>Ship</td><td>'+data.gpShip?.toLocaleString()+'</td><td>'+data.gpShipUndeployed?.toLocaleString()+'</td></tr>'
    }
    for(let i in data.zoneData){
      html += '<tr class="title"><td>'+data.zoneData[i].name+' - Stars : '+data.zoneData[i].starCount+'</td><td colspan="2">'+data.zoneData[i].score?.toLocaleString()+'</td></tr>'
      html += '<tr class="dkbg"><td>Platoons</td><td colspan="2">'+data.zoneData[i].platoons?.toLocaleString()+'</td></tr>'
      if(data.zoneData[i]?.cm?.length > 0){
        html += '<tr class="ltbg"><td>Combat Missions</td><td>Avg</td><td>Total</td></tr>'
        for(let m in data.zoneData[i].cm){
          html += '<tr class="dkbg"><td>'+data.zoneData[i].cm[m].completed+'/50</td><td>'+CalcAverage(data.zoneData[i].cm[m].score, data.zoneData[i].cm[m].completed)+'</td><td>'+data.zoneData[i].cm[m].score?.toLocaleString()+'</td></tr>'
        }
        html += '<tr class="ltbg"><td>Combat Missions Combined</td><td>Average</td><td>Total</td></tr>'
        html += '<tr class="dkbg"><td>'+data.zoneData[i].cmCount+'/'+(+data.zoneData[i].cm?.length * 50)+'</td><td>'+CalcAverage(data.zoneData[i].cmTotalScore, data.zoneData[i].cmCount)+'</td><td>'+data.zoneData[i].cmTotalScore?.toLocaleString()+'</td></tr>'
      }
      if(data.zoneData[i].sm.length>0){
        html += '<tr class="ltbg"><td>Special Missions</td><td colspan="2">Successful</td></tr>'
        for(let m in data.zoneData[i].sm) html += '<tr class="dkbg"><td>'+data.zoneData[i].sm[m].completed+'/50</td><td colspan="2">'+data.zoneData[i].sm[m].success+'</td></tr>'
      }
      html += '<tr class="ltbg"><td>To Star</td><td colspan="2">Points Needed</td></tr>'
      if(data.zoneData[i]?.stars["1"] != 0) html += '<tr class="dkbg"><td>1</td><td colspan="2">'+data.zoneData[i].stars["1"]?.toLocaleString()+'</td></tr>'
      if(data.zoneData[i]?.stars["2"] != 0) html += '<tr class="dkbg"><td>2</td><td colspan="2">'+data.zoneData[i].stars["2"]?.toLocaleString()+'</td></tr>'
      if(data.zoneData[i]?.stars["3"] != 0) html += '<tr class="dkbg"><td>3</td><td colspan="2">'+data.zoneData[i].stars["3"]?.toLocaleString()+'</td></tr>'
    }
    html += '<tr class="title"><td colspan="3">Round '+data.currentRound+' Ends in: '+data.timeTillEnd.h+':'+data.timeTillEnd.m+':'+data.timeTillEnd.s+'</td></tr>'
    html += '</tr>'
    html += '</table>'
    html += '</body>'
    html += '</html>'
    return html
    //if(html && data?.zoneData) return await HP.GetImg(html, 1240, false)
  }catch(e){
    console.error(e);
  }
}
