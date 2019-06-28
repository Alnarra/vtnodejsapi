'use strict'
var request = require('request')
var agent = require('https').Agent

class virustotal{
    constructor(config){ 
        this.vtURL = `https://www.virustotal.com/vtapi/${config.version}/`
        this.agent = new agent({
            ca: config.proxy || null
        }) 
        this.reqOptions = { 
            apikey: config.apikey, //This can't JUST be the word key, it causes all KINDS of trouble 
            uri: String,
            method: String, 
            agent: this.agent,
            gzip: true,  
            headers: { 
                'User-Agent': config.userAgent || null 
            }
        }
    }
    _req(path, data){
        this.reqOptions.uri = `${this.vtURL}${path}?apikey=${this.reqOptions.apikey}`
        data.url ? this.reqOptions.uri += `&${data.url}` : "" 
        this.reqOptions.method = data.method
        var options = this.reqOptions
        console.log(options)
        return new Promise( (resolve, reject) => { 
            request(options, (err, res, body) => { 
                err ? reject(err) : ""
                res.statusCode == 200 ? resolve(body) : reject(`Server response was ${res.statusCode}`)
            })
        })
    }
    async url(searchTerm){
        return this._req("url/report",{
            method: "GET",
            url: `resource=${searchTerm}&allinfo=true`
        })
    }
    async domain(searchTerm){ 
        return this._req("domain/report", {
            method: "GET",
            url: `domain=${searchTerm}`
        })
    } 
    async ip(searchTerm){
        return this._req("ip-address/report",{ 
            method: "GET",
            url: `ip=${searchTerm}`
        })
    }
    async hash(searchTerm){
        return this._req("file/report",{
            method: "GET",
            url: `resource=${searchTerm}&allinfo=true`
        })
    } 
    async comment(searchTerm){
        return this._req("comments/get",{
            method: "GET", 
            url: `resource=${searchTerm}`
        })
    }
}
module.exports = virustotal 
