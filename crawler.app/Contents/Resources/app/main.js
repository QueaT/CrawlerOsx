
const fs = require('fs');
const rootPath = require('electron-root-path').rootPath;
var request = require('request');
var cheerio  = require('cheerio');
const { app, BrowserWindow, ipcMain } = require('electron')
let elm = '';
const sendEmail = require('./mail');
app.setLoginItemSettings({
  openAtLogin: true,
  path: rootPath,
  });

  let kontArr = fs.readFileSync(__dirname + '/nowyKontakt.json','utf8');
   kontArr = JSON.parse(kontArr);

 request('https://github.com/prebid/Prebid.js/releases',function(err,res,body){

if(!err && res.statusCode === 200) {
    const $ = cheerio.load(body);
    const select = $('.release-header a').text().replace(/[^0-9]/g,'').replace(/(?!^)(?=(?:\d{4})+(?:\.|$))/gm, ' ').substr(0,3);
    let value = fs.readFileSync(__dirname + '/nowyPrebid.json','utf8');
    value = JSON.parse(value);
    if(value.currentValue < select){
        electronHandler('index2.html',true);
        elm = select;
        if(kontArr.kontakty.length){
          kontArr.kontakty.forEach(kont =>{
            sendEmail.sendEmail(kont,'kuba-test-prebid','prebid',true); 
          })
        }
     }
    else{
      sendEmail.sendEmail('kgm004a@gmail.com','multiMail','prebid2',false); 
    }
   
}

})
ipcMain.on('newEmail',function(e,item) {
  kontArr.kontakty.push(item);
  fs.writeFile(__dirname + '/nowyKontakt.json',JSON.stringify(kontArr),function(err){
  })  
})


ipcMain.on('email',function(e,item) {

  win = new BrowserWindow({ width: 500, height: 300 })
  win.loadFile(__dirname + '/mail.html')
})
 

ipcMain.on('closeiT',function(e,item) {
  app.quit()
    elm = {'currentValue':elm};
  fs.writeFile( __dirname + '/nowyPrebid.json',JSON.stringify(elm),function(err){
  })  
})


ipcMain.on('new',function(e,item) {
  
 goTO();
})


function goTO(){
  require("electron").shell.openExternal("http://prebid.org/download.html");
}

const electronHandler=(src)=> {
     function createWindow () {
       win = new BrowserWindow({ width: 500, height: 300 })
    
       win.loadFile(src)
    
     // Otwórz Narzędzia Deweloperskie.
   //  win.webContents.openDevTools()
    
     // Emitowane, gdy okno jest zamknięte.
     win.on('closed', () => {
       win = null
     });
      }
    
    
      // i ładowanie index.html aplikacji.
      
    
      app.on('ready', createWindow)
  
    
    // Zamknij, gdy wszystkie okna są zamknięte.
    app.on('window-all-closed', () => {
      // On macOS it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })  
     
      createWindow();
}



