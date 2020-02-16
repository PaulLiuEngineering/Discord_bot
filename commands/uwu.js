const request = require('request');
const cheerio = require('cheerio');
module.exports = {
    name: 'uwu',
    description : "uwu",
    execute(message){
        var options = {
            url: "https://www.luscious.net/hentai/?page="+ String(Math.floor(Math.random()*199)),
            method : "GET",
            headers:{
                "Accept": "text/html",
                "User-Agent":"Chrome"
            }
        };
    
        request(options,function(error, response, responsebody){
            if(error){
                return;
            }
            $ = cheerio.load(responsebody)
            //var links = $('.image a.link');
            var links = $('.o-fitted-media');
            //console.log(links)
            var urls = new Array(links.length).fill(0).map((v,i) => links.eq(i).attr('data-src'));
            //console.log(urls);
            if (!urls.length){
                return;
            }
            message.channel.send(urls[Math.floor(Math.random()*urls.length)])
        })
        
    }
}