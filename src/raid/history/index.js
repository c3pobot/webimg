'use strict'
const isOdd = (num)=>{
  return num % 2
}
module.exports = async(data = {})=>{
  try{
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">', oddCount = 0
    const getBkg = ()=>{
      try{
        let res = 'bk-even'
        if(isOdd(oddCount)) res = 'bk-odd'
        oddCount++
        return res
      }catch(e){
        console.error(e);
      }
    }
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/raid.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table width="400px" border="0" class="review">'
      html += '<tr class="title"><td colspan="2">'+data.name+' ('+data.gp?.toLocaleString()+') '+data.nameKey+'</td></tr>'
      //html += '<tr class="'+getBkg(99999)+'"><td>Player</td><td>Count</td><td>Low</td><td>Avg</td><td>High</td></tr>'
      html += '<tr class="'+getBkg(99999)+'"><td>Player</td><td>Score</td></tr>'
      html += `<tr class="${getBkg()}"><td>Guild Total</td><td>${data.guildTotal?.toLocaleString()}</td></tr>`
      for(let i in data.leaderBoard){
        html += '<tr class="'+getBkg()+'">'
          html += '<td>'+data.leaderBoard[i].name+'</td>'
          html += '<td>'+(+data.leaderBoard[i].score || 0).toLocaleString()+'</td>'
        html += '</tr>'
      }
    if(data.date){
      html += '<tr>'
        html += '<td colspan="2" align="center">Raid last completed '+(new Date(+data.date * 1000)).toLocaleString('en-US', {timeZone: 'America/New_York'})+' Eastern</td>'
      html += '</tr>'
    }
    html += '</table>'
    html += '</body>'
    html += '</html>'
    return html
  }catch(e){
    console.error(e);
  }
}
