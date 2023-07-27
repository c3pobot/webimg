'use strict'
const enumAlignment = {
  'alignment_neutral': 1,
  'alignment_light': 2,
  'alignment_dark': 3
}

module.exports = async(unit = {}, uInfo = {})=>{
  try{
    let unitAlignment = enumAlignment[uInfo.alignment]
    let html = '<div class="gac-unit'+(unit.healthPercent == 0 ? ' gac-unit--dead':'')+'">'
          //startbars
          html += '<div class="gac-unit__bars">'
            html += '<div class="gac-unit__bar gac-unit__bar--prot">'
              html += '<div class="gac-unit__bar-inner gac-unit__bar-inner--prot" style="width: '+unit.shieldPercent+'%"></div>'
            html += '</div>'
            html += '<div class="gac-unit__bar gac-unit__bar--hp">'
              html += '<div class="gac-unit__bar-inner gac-unit__bar-inner--hp '+(unit.healthPercent < 50 && unit.healthPercent >= 25 ? 'gac-unit__bar-inner--hp-low':'')+(unit.healthPercent < 25 ? 'gac-unit__bar-inner--hp-critical':'')+'" style="width: '+unit.healthPercent+'%"></div>'
            html += '</div>'
          html += '</div>'
          //endbard
          //start unit
          html += '<div class="gac-unit__portrait">'
            html += '<div class="gac-unit-portrait gac-unit-portrait--type-1">'
              //start thumbnail
              html += '<div class="character-portrait character-portrait--size-small">'
                html += '<div class="character-portrait__primary character-portrait__primary--size-small">'
                  html += '<div class="character-portrait__image-frame character-portrait__image-frame--size-small">'
                    html += '<img class="character-portrait__img character-portrait__img--size-small" src="/thumbnail/'+uInfo.thumbnailName+'.png">'
                  html += '</div>'
                  if(unit?.relicTier >= 0 && unit.tier >= 13){
                    if(unit.relicTier){
                      html += '<div class="character-portrait__relic character-portrait__relic--size-small character-portrait__relic--alignment-'+unitAlignment+'">'+(+unit.relicTier - 2)+'</div>'
                    }else{
                      html += '<div class="character-portrait__level character-portrait__level--size-small">'+unit.level+'</div>'
                    }
                    html += '<div class="character-portrait__rframe character-portrait__rframe--size-small character-portrait__rframe--alignment-'+unitAlignment+'"></div>'
                    html += '<div class="character-portrait__rframe  character-portrait__rframe--right character-portrait__rframe--size-small character-portrait__rframe--alignment-'+unitAlignment+'"></div>'
                  }else{
                    html += '<div class="character-portrait__gframe character-portrait__gframe--size-small character-portrait__gframe--tier-'+unit.tier+'"></div>'
                    html += '<div class="character-portrait__level character-portrait__level--size-small">'+unit.level+'</div>'
                  }
                html += '</div>'
              html += '</div>'
              //end thumbnail
              //start stars
              html += '<div class="character-portrait__footer character-portrait__footer--size-small">'
                html += '<div class="character-portrait__stars">'
                  html += '<div class="'+(unit.rarity < 1 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-small"></div>'
                  html += '<div class="'+(unit.rarity < 2 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-small"></div>'
                  html += '<div class="'+(unit.rarity < 3 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-small"></div>'
                  html += '<div class="'+(unit.rarity < 4 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-small"></div>'
                  html += '<div class="'+(unit.rarity < 5 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-small"></div>'
                  html += '<div class="'+(unit.rarity < 6 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-small"></div>'
                  html += '<div class="'+(unit.rarity < 7 ? 'character-portrait__star--inactive':'character-portrait__star')+' character-portrait__star--size-small"></div>'
                html += '</div>'
              html += '</div>'
              //end stars
            html += '</div>'
          html += '</div>'
          //end unit
        html += '</div>'
    return html
  }catch(e){
    console.error(e);
  }
}
