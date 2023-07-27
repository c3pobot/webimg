'use strict'
module.exports = (ults = [], uInfo ={})=>{
  try{
    let html
    if(ults.length > 0){
      for(let i in ults){
        if(uInfo.ultimate[ults[i]]?.nameKey){
          if(!html) html = ''
           html += '<tr><td colspan="3" class="unit-zeta"><img src="/asset/ultimate.png"> Ult : '+uInfo.ultimate[ults[i]].nameKey+'</td></tr>'
        }
      }
    }
    return html
  }catch(e){
    console.error(e)
  }
}
