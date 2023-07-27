'use strict'
const GetSkillType = (id)=>{
  if(id.startsWith('basic')) return 'B'
  if(id.startsWith('leader')) return 'L'
  if(id.startsWith('special')) return 'S'
  if(id.startsWith('unique')) return 'U'
}
const CleanDesc = (string)=>{
  try{
    let retString = '', array = []
    string = string.replace(/\[c\]/g, '**')
    string = string.replace(/\[\/c]/g, '**')
    string = string.replace(/\[-\]/g, '')
    string = string.replace(/\[\w{1,6}\]/g, '')
    /*
    string = string.replace(/\[ffff33\]/g, '')
    string = string.replace(/\[f0ff23\]/g, '')
    string = string.replace(/\[FFCC33\]/g, '')
    */
    string = string.replace(/\\n\\n/g, '<br>')
    //array = string.split('\\n')
    //for(let i in array) retString += array[i].replace('\\n', '<br>')
    return string
  }catch(e){
    console.log(e)
  }
}
module.exports = async(skills = [], title)=>{
  try{
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/ability.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table width="1000">'
      html += '<tr><td>'+title+'</td></tr>'
      for(let i in skills){
        html += '<tr><td align="left">'+skills[i].unitNameKey+' : '+skills[i].nameKey+'('+GetSkillType(skills[i].id)+')'+'</td></tr>'
        html += '<tr><td align="left">'+CleanDesc(skills[i].descKey)+'</td></tr>'
      }
    html += '</table>'
    html += '</body>'
    html += '</html>'
    return html
  }catch(e){
    console.error(e)
  }
}
