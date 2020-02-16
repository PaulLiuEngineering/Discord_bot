const request = require('request');
const Discord = require('discord.js');
module.exports = {
    name: 'weather',
    description : "Gives weather info",
    execute(message,args){
        let apiKey = "cad3aa768f150dfbce6ce2dcf6208863";
        let city = args
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
        
        request(url, function (err, response, body) {
            if(err){
              console.log('error:', error);
            } 
            else {
            let weather = JSON.parse(body)
            //console.log(weather, weather.cod)
            if (weather.cod === '404'){
                //console.log('s')
                message.channel.send('City not found')
                return;
            }
            //console.log(`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`) 
            const w_msg = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            //console.log(weather);
            const w_embed = {
                color: 0x0099ff,
                title: 'Weather',
                url: 'https://discord.js.org',
                author: {
                    name: 'Butler_bot',
                    //icon_url: 'https://i.imgur.com/wSTFkRM.png',
                    //url: 'https://discord.js.org',
                },
                //description: 'Some description here',
                thumbnail: {
                    url: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                },
                fields: [
                    {
                        name: 'weather info',
                        value: w_msg,
                    },
                ],
                // image: {
                //     url: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                // },
                timestamp: new Date(),
            };
            
            message.channel.send({ embed: w_embed });
            }
          });
    }
}