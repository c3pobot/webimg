'use strict'
module.exports = (obj = {})=>{
  try{
    let html = '<div class="collection-ship-crew-member">'
      html += '<div class="character-portrait character-portrait--size-micro">'
        html += '<div class="character-portrait__primary character-portrait__primary--size-micro">'
          html += '<div class="character-portrait__image-frame character-portrait__image-frame--size-micro">'
            html += '<img class="character-portrait__img character-portrait__img--size-micro" src="/thumbnail/'+obj.thumbnailName+'.png"/>'
          html += '</div>'
          if(obj?.relic > 0){
            let unitAlignment = (obj.alignment == 'light' ? 2:3)
            if(obj.ultimate) unitAlignment += ' character-portrait__relic--ultimate'
            html += '<div class="character-portrait__relic character-portrait__relic--size-micro character-portrait__relic--alignment-'+unitAlignment+'">'+(+obj.relic - 2)+'</div>'
            html += '<div class="character-portrait__rframe character-portrait__rframe--size-micro character-portrait__rframe--alignment-'+unitAlignment+'"></div>'
            html += '<div class="character-portrait__rframe  character-portrait__rframe--right character-portrait__rframe--size-micro character-portrait__rframe--alignment-'+unitAlignment+'"></div>'
          }else{
            html += '<div class="character-portrait__gframe character-portrait__gframe--size-micro character-portrait__gframe--tier-'+obj.gear+'"></div>'
            html += '<div class="character-portrait__level character-portrait__level--size-micro">'+obj.level+'</div>'
          }
          if(obj.zeta) html += '<div class="character-portrait__zeta character-portrait__zeta--size-micro">'+obj.zeta+'</div>'
          if(obj.omi) html += '<div class="character-portrait__omicron character-portrait__omicron--size-micro">'+obj.omi+'</div>'
        html += '</div>'
        html += '<div class="character-portrait__footer character-portrait__footer--size-micro">'
          html += '<div class="character-portrait__stars">'
          html += '<div class="'+(obj.rarity < 1 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-micro"></div>'
          html += '<div class="'+(obj.rarity < 2 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-micro"></div>'
          html += '<div class="'+(obj.rarity < 3 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-micro"></div>'
          html += '<div class="'+(obj.rarity < 4 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-micro"></div>'
          html += '<div class="'+(obj.rarity < 5 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-micro"></div>'
          html += '<div class="'+(obj.rarity < 6 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-micro"></div>'
          html += '<div class="'+(obj.rarity < 7 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-micro"></div>'
          html += '</div>'
        html += '</div>'
      html += '</div>'
    html += '</div>'
    return html
  }catch(e){
    console.error(e);
  }
}
