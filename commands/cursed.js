const request = require('request');
const cheerio = require('cheerio');
module.exports = {
    name: 'cursed',
    description : "cursed images",
    execute(message){
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=cursed+image"+ String(Math.floor(Math.random()*4)),
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
            console.log('tag2');
            if (!urls.length){
                return;
            }
            message.channel.send(urls[Math.floor(Math.random()*urls.length)])
        })
        console.log('tag1')
        
    }
}