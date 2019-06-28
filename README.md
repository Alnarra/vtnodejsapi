# Virustotal Node.JS API 
This covers a few features that virustotal has made public including the ability to search based on 
  - hashes
  - urls
  - domains

This requires the request node module as well as the https module
useage is fairly simple 

``` Javascript
var apikey = "YOUR API KEY HERE" 
var searchItem = "HASH / URL / ETC" 
var vt = new virustotal({
  apikey: apikey,
  proxy: "YOUR CA FILE", //Optional Setting for those sitting behind a proxy with a cert signed by your company
  userAgent: "USER AGENT STRING HERE" //Optional setting if you want to make your user agent string unique 
  version: "v2" 
)}
vt.hash("A hash").catch( err => {
  console.warn(err) 
 }) 
vt.domain("some.domain.com").catch( err => { 
  console.warn(err) 
}) 
vt.url("https://some.domain.com/?urlstring").catch( err => {
  console.warn(err) 
})
vt.ip("1.1.1.1").catch(err => { 
  console.warn(err) 
}) 
vt.comment(searchItem) => { 
  console.warn(err) 
}) 
```
