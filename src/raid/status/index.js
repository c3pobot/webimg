'use strict'
const isOdd = (num)=>{
  return num % 2
}
module.exports = async(data = {})=>{
  try{
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">', oddCount = 0
    const getBkg = (score)=>{
      try{
        let res = 'bk-even'
        if(isOdd(oddCount)) res = 'bk-odd'
        if(score === 0) res = 'bk-low'
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
    html += '<table width="1000px" border="0" class="review">'
      html += '<tr class="title"><td colspan="3">'+data.profile?.name+' '+data.nameKey+'</td></tr>'
      html += '<tr class="'+getBkg(99999)+'"><td>Player</td><td>Current</td><td>Last</td>'
      for(let i in data.leaderBoard){
        html += '<tr class="'+getBkg(+data.leaderBoard[i].memberProgress)+'">'
          html += '<td>'+data.leaderBoard[i].name+'</td>'
          html += '<td>'+(+data.leaderBoard[i].memberProgress || 0).toLocaleString()+'</td>'
          html += '<td>'+(+data.leaderBoard[i].previous?.high || 0).toLocaleString()+'</td>'
        html += '</tr>'
      }
    html += '<tr>'
      html += '<td colspan="3">'
        html += '<table border="0" width="100%">'
          html += '<tr>'
            html += '<td align="center">'
              if(data.reward?.current){
                html += '<img src="/thumbnail/'+data.reward.current.texture+'.png" class="reward-chest"/>'
              }else{
                html += 'nbsp;'
              }
            html += '</td>'
            html += '<td align="center">'
              if(data.reward?.next){
                html += '<div class="progess-bar">'
                    html += '<div class="progess-bar-fill" style="width: '+Math.floor(((data.score - data.reward.current.rankStart) / (data.reward.current.rankEnd - data.reward.current.rankStart)) * 100)+'%;"/>'
                html += '</div>'
              }else{
                html += 'nbsp;'
              }
            html += '</td>'
            html += '<td align="center">'
            if(data.reward?.next){
              html += '<img src="/thumbnail/'+data.reward.next.texture+'.png" class="reward-chest"/>'
            }else{
              html += 'nbsp;'
            }
            html += '</td>'
          html += '</tr>'
          html += '<tr>'
            html += '<td align="center">'
              if(data.reward?.current){
                html += data.reward.current.rankStart?.toLocaleString()
              }else{
                html += 'nbsp;'
              }
            html += '</td>'
            html += '<td align="center">'+data.score.toLocaleString()+'</td>'
            html += '<td align="center">'
              if(data.reward?.next){
                html += data.reward.next.rankStart?.toLocaleString()
              }else{
                html += 'nbsp;'
              }
            html += '</td>'
          html += '</tr>'
        html += '</table>'
      html += '</td>'
    html += '</tr>'
    if(data.footer){
      html += '<tr>'
        html += '<td colspan="3" align="center">'+data.footer+'</td>'
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
