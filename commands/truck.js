const request = require('request');
const cheerio = require('cheerio');
module.exports = {
    name: 'truck',
    description : "fuck the environment",
    execute(message){
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=truck+diesel+drift+gif"+ String(Math.floor(Math.random()*4)),
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
            var links = $('.image a.link');
            //var links = $('.o-fitted-media');
            //console.log(links)
            //console.log(responsebody)
            var urls = new Array(links.length).fill(0).map((v,i) => links.eq(i).attr('href'));
            //console.log(urls);
            if (!urls.length){
                return;
            }
            message.channel.send(urls[Math.floor(Math.random()*urls.length)])
        })
        
    }
}