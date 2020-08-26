// const {
//     handleMapBan
// } = require('../helpers/helper')

// module.exports = {
//     name: 'test',
//     execute(message, args) {
//         return message.channel.send("React to be team captain (Limit 2)")
//             .then(msg => {
//                 let captains = [];
//                 msg.react('✋')

//                 const captainsFilter = (reaction, user) => {
//                     return ['✋'].includes(reaction.emoji.name) && !user.bot
//                 }

//                 let collection = msg.createReactionCollector(captainsFilter, {
//                     time: 60000,
//                     max: 2
//                 })

//                 collection.on('collect', (reaction, user) => {
//                     if(!captains.includes(user)){
//                         captains.push(user)
//                     }
//                 })

//                 collection.on('end', (a, b, c) => {
//                     console.log(a, b, c)
//                     console.log(captains)
//                     if(captains.length === 2){
//                         message.channel.send(`Captains: ${captains[0]} & ${captains[1]}`)
//                         handleMapBan(message, captains)
//                     } else {
//                         message.channel.send('Not enough captains')
//                     }
//                 })
//             })
//     }
// }