'use strict'
const GetCrew = require('./getCrew')

module.exports = (obj)=>{
  try{
    let html = '<div>', reqClass ='requirement-'+(obj.notMet ? 'not-met':'met')+'-ship'
      if(obj?.showStats) reqClass += '-stats-'+(obj.statsNotMet ? 'not-':'')+'met'
      html += '<div class="col-xs-6 col-sm-3 col-md-3 col-lg-2"><div class="collection-char">'

      html += '<div class="character-portrait">'

        html += '<div class="character-portrait__primary character-portrait__primary--size-normal">'


          html += '<div class="ship-portrait__image-group">'
            html += '<div class="ship-portrait__image-frame">'
              html += '<img class="ship-portrait__img ship-portrait__img--size-" src="/thumbnail/'+obj.thumbnailName+'.png"/>'
            html += '</div>'
            html += '<div class="ship-portrait__level ship-portrait__level--size-">'+obj.level+'</div>'
            html += '<div class="ship-portrait__frame"></div>'
          html += '</div>'
          if(obj?.requirement) html += '<div class="'+reqClass+'"><p class="requirement-text">'+obj?.requirement+'</p></div>'


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

      html += '<div class="collection-char-name">'+obj.nameKey+'</div>'
      //if(obj?.reqGP && obj?.gp < obj?.reqGP) html += '<div class="requirement-gp">'+(obj?.gp?.toLocaleString())+'/'+(obj?.reqGP?.toLocaleString())+'</div>'
    html += '</div>'
    return html;
  }catch(e){
    console.error(e)
  }
}
