'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


var defaultMenu = require('electron-default-menu');
var Menu = require('menu');
var dialog = require('dialog');


let mainWindow;

function createWindow(){
	mainWindow = new BrowserWindow({width: 1000, height: 625});
	mainWindow.loadURL('file://' + __dirname + '/app/index.html');
	mainWindow.webContents.openDevTools();
	mainWindow.on('closed', function(){
		mainWindow = null;
	})
}
function allClosed(){
	if(process.platform !== 'darwin'){
		app.quit();
	}
}
function activate(){
	if(mainWindow === null){
		createWindow();
	}
}
app.on('ready', createWindow);
app.on('window-all-closed', allClosed);
app.on('activate', activate);