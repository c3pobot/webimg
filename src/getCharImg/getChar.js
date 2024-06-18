'use strict'
const enumAlignment = {
  neutral: 1,
  light: 2,
  dark: 3
}
module.exports = (obj = {}, showName = true)=>{
  try{
    let html = '<div>', reqClass ='requirement-'+(obj.notMet ? 'not-met':'met')
      if(obj?.showStats){
        reqClass += '-stats-'+(obj.statsNotMet ? 'not-':'')+'met'
      }else{
        if(obj?.notMet && obj?.rarityMet) reqClass = 'requirement-met-stats-not-met'
      }
      html += '<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2"><div class="collection-char">'

      html += '<div class="character-portrait">'

        html += '<div class="character-portrait__primary character-portrait__primary--size-normal">'


          html += '<div class="character-portrait__image-frame character-portrait__image-frame--size-normal">'
            html += '<img class="character-portrait__img character-portrait__img--size-normal" src="/thumbnail/'+obj.thumbnailName+'.png"/>'
          html += '</div>'
          if(obj?.requirement) html += '<div class="'+reqClass+'"><p class="requirement-text">'+obj?.requirement+'</p></div>'

          if(obj.zeta) html += '<div class="character-portrait__zeta">'+obj.zeta+'</div>'
          if(obj.omi) html += '<div class="character-portrait__omicron">'+obj.omi+'</div>'
          if(obj?.relic >= 0 && obj.gear >= 13){
            let unitAlignment = enumAlignment[obj.alignment]
            if(obj.relic){
              html += '<div class="character-portrait__relic character-portrait__relic--size-normal character-portrait__relic--alignment-'+unitAlignment+''+(obj.ultimate > 0 ? ' character-portrait__relic--ultimate':'')+'">'+(+obj.relic - 2)+'</div>'
            }else{
              html += '<div class="character-portrait__level character-portrait__level--size-normal">'+obj.level+'</div>'
            }
            html += '<div class="character-portrait__rframe character-portrait__rframe--size-normal character-portrait__rframe--alignment-'+unitAlignment+'"></div>'
            html += '<div class="character-portrait__rframe character-portrait__rframe--right character-portrait__rframe--size-normal character-portrait__rframe--alignment-'+unitAlignment+'"></div>'
          }else{
            html += '<div class="character-portrait__gframe character-portrait__gframe--tier-'+obj.gear+'"></div>'
            html += '<div class="character-portrait__level character-portrait__level--size-normal">'+obj.level+'</div>'
          }
        html += '</div>'
        html += '<div class="character-portrait__footer character-portrait__footer--size-normal"><div class="character-portrait__stars">'
          html += '<div class="'+(obj.rarity < 1 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-normal"></div>'
          html += '<div class="'+(obj.rarity < 2 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-normal"></div>'
          html += '<div class="'+(obj.rarity < 3 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-normal"></div>'
          html += '<div class="'+(obj.rarity < 4 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-normal"></div>'
          html += '<div class="'+(obj.rarity < 5 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-normal"></div>'
          html += '<div class="'+(obj.rarity < 6 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-normal"></div>'
          html += '<div class="'+(obj.rarity < 7 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-normal"></div>'
        html += '</div></div>'
      html += '</div></div></div>'

      if(showName) html += '<div class="collection-char-name">'+obj.nameKey+'</div>'
      //if(obj?.reqGP && obj?.gp < obj?.reqGP) html += '<div class="requirement-gp">'+(obj?.gp?.toLocaleString())+'/'+(obj?.reqGP?.toLocaleString())+'</div>'
    html += '</div>'
    return html;
  }catch(e){
    console.error(e);
  }
}
