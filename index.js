const Discord = require('discord.js');
const bot = new Discord.Client();
const utf = require('utf8')

const cheerio = require('cheerio');
const request = require('request');

var servers = {};
const ytdl = require('ytdl-core');


const token = '';
const PREFIX = "!";

const fs = require('fs');
bot.commands = new Discord.Collection();

const commandfiles = fs.readdirSync('./commands/').filter(file=>file.endsWith('.js'));
for (const file of commandfiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on('ready',()=>{
    console.log('bot is ready');
});

bot.on('message',message=>{
    if(message.content === "Konichiwa"){
        message.reply("STFU U CUNT");
    }
    let args = message.content.substring(PREFIX.length).split(" ");
    switch (args[0]){
        case "ping":
            bot.commands.get('ping').execute(message,args);
        break
        case "pero":
            if(message.channel.nsfw === true){
                bot.commands.get('uwu').execute(message);
            }
        break
        case "embed":
            const Embed = new Discord.RichEmbed()
            .addField('Player Name', message.author.username)
            .setTitle('User Information')
            message.channel.send(Embed)
        break
        case "weather":
            if (args.length <2){
                message.reply("Please enter city")
                return;
            }
            bot.commands.get('weather').execute(message,args.slice(1,args.length).join(' '));
        break
        case "play":
            console.log(utf.encode(args.slice(1,args.length).join(' ')))
            bot.commands.get('music').execute(message,utf.encode(args.slice(1,args.length).join(' ')),servers);
        break
        case "stop":
            bot.commands.get('music').stop(message,servers);
        break
        case "skip":
            bot.commands.get('music').skip(message,servers);
        break
        case "clear":
            bot.commands.get('music').clear(message,servers);
        break
        case "truck":
            bot.commands.get('truck').execute(message);
        break
        case "cursed":
            bot.commands.get('cursed').execute(message);
        break
        case "smite":
            bot.commands.get('smite').execute(message,utf.encode(args.slice(1,args.length).join(' ')));
        break
    }
})
bot.login(token);


