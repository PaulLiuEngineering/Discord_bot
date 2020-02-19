const request = require('request');
const Discord = require('discord.js');
module.exports = {
    name: 'smite',
    description : "Gives weather info",
    execute(message,args){
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
        
        request(options,function(error, response, responsebody){
            if(error){
                return;
            }
            $ = cheerio.load(responsebody)
           
        });
    }
}