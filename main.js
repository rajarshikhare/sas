const { app, BrowserWindow, Menu } = require('electron')


// Starting our node server created to connect android phone
var server = require('./server');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  // and load the index.html of the app.
  win.loadFile('page/new_bill/index.html')

  // Open the DevTools.
  
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  var menu = Menu.buildFromTemplate([
    {
      label: 'Billing',
      submenu: [
        {
          label: 'New Bill',
          click() {
            win.loadFile('page/new_bill/index.html')
          }

        },
        { label: 'Print Bill',
          click() {
            win.webContents.print({silent: true, printBackground:true});
          }
        }
        
      ]
    },
    {
      label: 'Statistics',
      submenu: [
        {
          label: 'Sales Graph',
          click() {
            win.loadFile('page/Statistics/statistic.html')
          }
        },
        {
          label: 'Prediction',
          click() {
            win.loadFile('page/Prediction/prediction.html')
          }
        }
      ]
    },
    {
      label: 'Inventory',
      submenu: [
        {
          label: 'Stock',
          click() {
            win.loadFile('page/Stock/stock.html')
          }
        },
        {
          label: 'Manage',
          click() {
            win.loadFile('page/Manage/manage.html')
          }
        }
      ]
    }
  ])

  Menu.setApplicationMenu(menu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
