const { app, Menu, BrowserWindow, screen } = require('electron');
let path = require('path');
require('electron-reload')(__dirname);

const createWindow = () => {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;

	window = new BrowserWindow({
		width: width / 1.25,
		height: height / 1.25,
		webPreferences: {
			nodeIntegration: true
		},
		icon: path.join(__dirname, 'pa.ico')
	});

	//window.removeMenu();
	window.setAutoHideMenuBar(true);
	window.setMenuBarVisibility(false);

	const template = [
		{
			label: 'Menu',
			submenu: [
				{ role: 'reload' },
				{ role: 'forcereload' },
				{ role: 'toggledevtools' },
				{
					label: 'Toggle Test Mode',
					click() {
						window.webContents.send('toggletestmode', '1');
					}
				},
				{ role: 'quit' }
			]
		}
	];
	
	const menu = Menu.buildFromTemplate(template);
	window.setMenu(menu);

	window.loadFile('public/index.html');
};

let window = null;

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit());