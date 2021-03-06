const { Cask } = require('@lib/models')
const { GenericEmbed, WarningEmbed } = require('@lib/embeds')
const categories = { 'general': 0, 'moderation': 1, 'utility': 2, 'fun': 3, 'social': 4 }
const categoryNames = { 0: 'General', 1: 'Moderation', 2: 'Utility', 3: 'Fun', 4: 'Social' }

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'top'
  }

  async trigger (msg) {
    let category = categories[(msg.content.split(' ')[1] || '').toLowerCase()]
    let results = await Cask.find(category !== undefined ? { category } : {}).sort({ score: -1 }).limit(5)
    if (results.length === 0) return msg.channel.send(WarningEmbed('No Results.', `Couldn't find any casks for that search. Try something else.`))
    return msg.channel.send(GenericEmbed('Top Casks', '', {
      fields: results.map(cask => ({ name: `>${cask.key}`, value: `${cask.description}\n[${categoryNames[cask.category]}] [${cask.score} Votes]` }))
    }))
  }
}
