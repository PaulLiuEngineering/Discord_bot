const request = require('request');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const cheerio = require('cheerio');

module.exports = {
    name: 'music',
    description : "Gives weather info",
    execute(message,args,servers){
        function play(connection, message){
            //console.log('play')
            var server = servers[message.guild.id];
            if (server.queue[0] === ''){
                server.queue.shift();
            }
            try{
                server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25 }), {highWaterMark: 1});
                console.log(server.queue[0])
                server.queue.shift();
                server.dispatcher.on('end', function(){
                    if (server.queue[0]){
                        play(connection,message);
                    }
                    else{
                        console.log('disconnect')
                        connection.disconnect();
                    }
                });
            }
            catch(error){
                //console.log(error)
                message.reply("Song doesn't exist")
                message.guild.voiceConnection.disconnect()
                return;
            }

        }

        function getembed(link,thumbnail,title,duration,message){
            const music_embed = {
                color: 0x0099ff,
                title: 'Song Info',
                url: 'https://discord.js.org',
                author: {
                    name: 'Butler_bot',
                    //icon_url: 'https://i.imgur.com/wSTFkRM.png',
                    //url: 'https://discord.js.org',
                },
                //description: 'Some description here',
                thumbnail: {
                    url: thumbnail,
                },
                fields: [
                    {
                        name: 'YouTube Link:',
                        value: link,
                    },
                    {
                        name: 'Song title:',
                        value: title,
                    },
                    {
                        name: 'Duration:',
                        value: duration,
                    },
                ],
                // image: {
                //     url: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                // },
                timestamp: new Date(),
            };
            message.channel.send({ embed: music_embed});
        }
        if (args.length < 2){
            message.reply("Please enter a song")
            return;
        }
        if (!message.member.voiceChannel){
            message.channel.send("You must be in a voice channel");
            return;
        }
        if(!servers[message.guild.id]) servers[message.guild.id]={
            queue : []
        }
        var link = ''
        var server = servers[message.guild.id];
        if (!args.startsWith('https')){
            var options = {
                url: "https://www.youtube.com/results?search_query="+ args,
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
                const links = $('a.yt-uix-tile-link');
                const thumbnail = $('.yt-thumb-simple');
                var thumbnail_link = ''
                var title = ''
                var duration = ''
                for (i = 0; i < links.length; i++) {
                    if(links[i]['attribs']['href']){
                        console.log($('.accessible-description')[i].children.data)
                        link = 'https://www.youtube.com'+links[i]['attribs']['href']
                        thumbnail_link = thumbnail[i].children[1]['attribs']['src']
                        title = links[i]['attribs']['title']
                        duration = $('.accessible-description')[i].children[0]['data']
                        //server.queue.push(link);
                        //console.log(thumbnail_link,title,duration,message)
                        i = links.length;
                        getembed(link,thumbnail_link, title, duration,message)
                    }
                }
                //console.log('request')
                server.queue.push(link)
                playmusic(message,server);
            })
        }
        else{
            server.queue.push(args)
            playmusic(message,server);
        }
        console.log(server.queue,args,'tag1')
        function playmusic(message,server){
            //console.log('playmusic')
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                if (server.queue.length > 0){
                    try{
                        play(connection, message);
                    }
                    catch(error){
                        console.log(error)
                    }
                }
            })
        }
        
    },

    skip(message,servers){
        var server = servers[message.guild.id];
        if (server.dispatcher) server.dispatcher.end();
        message.channel.send('Skipping the song')
    },

    stop(message,servers){
        var server = servers[message.guild.id];
        if(message.guild.voiceConnection){
            for (var i = server.queue.length - 1; i >=0; i--){
                server.queue.splice(i,1);
            }
            server.dispatcher.end();
            message.channel.send('Stopping music')
        }
        if(message.guild.connection) message.guild.voiceConnection.disconnect();
    },

    clear(message,servers){
        var server = servers[message.guild.id];
        server.queue = []
        if (server.dispatcher) server.dispatcher.end();
        message.channel.send('Clear the music queue')
        if(message.guild.connection) message.guild.voiceConnection.disconnect();
    }


}