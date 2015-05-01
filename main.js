var app = require('app');  // Electron app
var BrowserWindow = require('browser-window');  // Creating Browser Windows

//var zmq = require('zmq');

//var Snupyter = require('lib/snupyter.js');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the side car window object
// If we don't, the window will be closed automatically when the javascript
// object is GCed.
var sideCar = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done every
// initialization and is ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  sideCar = new BrowserWindow({
    width: 800,
    height: 800
    //frame: false
  });

  // and load the index.html of the app.
  sideCar.loadUrl('file://' + __dirname + '/index.html');
  
  sideCar.webContents.on('did-finish-load', function() {
    sideCar.webContents.send('display', '<div style="max-height:1000px;max-width:1500px;overflow:auto;">\n<table border="1" class="dataframe pure-table">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>Unnamed: 0</th>\n      <th>Girth</th>\n      <th>Height</th>\n      <th>Volume</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>0 </th>\n      <td>  1</td>\n      <td>  8.3</td>\n      <td> 70</td>\n      <td> 10.3</td>\n    </tr>\n    <tr>\n      <th>1 </th>\n      <td>  2</td>\n      <td>  8.6</td>\n      <td> 65</td>\n      <td> 10.3</td>\n    </tr>\n    <tr>\n      <th>2 </th>\n      <td>  3</td>\n      <td>  8.8</td>\n      <td> 63</td>\n      <td> 10.2</td>\n    </tr>\n    <tr>\n      <th>3 </th>\n      <td>  4</td>\n      <td> 10.5</td>\n      <td> 72</td>\n      <td> 16.4</td>\n    </tr>\n    <tr>\n      <th>4 </th>\n      <td>  5</td>\n      <td> 10.7</td>\n      <td> 81</td>\n      <td> 18.8</td>\n    </tr>\n    <tr>\n      <th>5 </th>\n      <td>  6</td>\n      <td> 10.8</td>\n      <td> 83</td>\n      <td> 19.7</td>\n    </tr>\n    <tr>\n      <th>6 </th>\n      <td>  7</td>\n      <td> 11.0</td>\n      <td> 66</td>\n      <td> 15.6</td>\n    </tr>\n    <tr>\n      <th>7 </th>\n      <td>  8</td>\n      <td> 11.0</td>\n      <td> 75</td>\n      <td> 18.2</td>\n    </tr>\n    <tr>\n      <th>8 </th>\n      <td>  9</td>\n      <td> 11.1</td>\n      <td> 80</td>\n      <td> 22.6</td>\n    </tr>\n    <tr>\n      <th>9 </th>\n      <td> 10</td>\n      <td> 11.2</td>\n      <td> 75</td>\n      <td> 19.9</td>\n    </tr>\n    <tr>\n      <th>10</th>\n      <td> 11</td>\n      <td> 11.3</td>\n      <td> 79</td>\n      <td> 24.2</td>\n    </tr>\n    <tr>\n      <th>11</th>\n      <td> 12</td>\n      <td> 11.4</td>\n      <td> 76</td>\n      <td> 21.0</td>\n    </tr>\n    <tr>\n      <th>12</th>\n      <td> 13</td>\n      <td> 11.4</td>\n      <td> 76</td>\n      <td> 21.4</td>\n    </tr>\n    <tr>\n      <th>13</th>\n      <td> 14</td>\n      <td> 11.7</td>\n      <td> 69</td>\n      <td> 21.3</td>\n    </tr>\n    <tr>\n      <th>14</th>\n      <td> 15</td>\n      <td> 12.0</td>\n      <td> 75</td>\n      <td> 19.1</td>\n    </tr>\n    <tr>\n      <th>15</th>\n      <td> 16</td>\n      <td> 12.9</td>\n      <td> 74</td>\n      <td> 22.2</td>\n    </tr>\n    <tr>\n      <th>16</th>\n      <td> 17</td>\n      <td> 12.9</td>\n      <td> 85</td>\n      <td> 33.8</td>\n    </tr>\n    <tr>\n      <th>17</th>\n      <td> 18</td>\n      <td> 13.3</td>\n      <td> 86</td>\n      <td> 27.4</td>\n    </tr>\n    <tr>\n      <th>18</th>\n      <td> 19</td>\n      <td> 13.7</td>\n      <td> 71</td>\n      <td> 25.7</td>\n    </tr>\n    <tr>\n      <th>19</th>\n      <td> 20</td>\n      <td> 13.8</td>\n      <td> 64</td>\n      <td> 24.9</td>\n    </tr>\n    <tr>\n      <th>20</th>\n      <td> 21</td>\n      <td> 14.0</td>\n      <td> 78</td>\n      <td> 34.5</td>\n    </tr>\n    <tr>\n      <th>21</th>\n      <td> 22</td>\n      <td> 14.2</td>\n      <td> 80</td>\n      <td> 31.7</td>\n    </tr>\n    <tr>\n      <th>22</th>\n      <td> 23</td>\n      <td> 14.5</td>\n      <td> 74</td>\n      <td> 36.3</td>\n    </tr>\n    <tr>\n      <th>23</th>\n      <td> 24</td>\n      <td> 16.0</td>\n      <td> 72</td>\n      <td> 38.3</td>\n    </tr>\n    <tr>\n      <th>24</th>\n      <td> 25</td>\n      <td> 16.3</td>\n      <td> 77</td>\n      <td> 42.6</td>\n    </tr>\n    <tr>\n      <th>25</th>\n      <td> 26</td>\n      <td> 17.3</td>\n      <td> 81</td>\n      <td> 55.4</td>\n    </tr>\n    <tr>\n      <th>26</th>\n      <td> 27</td>\n      <td> 17.5</td>\n      <td> 82</td>\n      <td> 55.7</td>\n    </tr>\n    <tr>\n      <th>27</th>\n      <td> 28</td>\n      <td> 17.9</td>\n      <td> 80</td>\n      <td> 58.3</td>\n    </tr>\n    <tr>\n      <th>28</th>\n      <td> 29</td>\n      <td> 18.0</td>\n      <td> 80</td>\n      <td> 51.5</td>\n    </tr>\n    <tr>\n      <th>29</th>\n      <td> 30</td>\n      <td> 18.0</td>\n      <td> 80</td>\n      <td> 51.0</td>\n    </tr>\n    <tr>\n      <th>30</th>\n      <td> 31</td>\n      <td> 20.6</td>\n      <td> 87</td>\n      <td> 77.0</td>\n    </tr>\n  </tbody>\n</table>\n</div>');
  });
  
  // Emitted when the window is closed.
  sideCar.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    sideCar = null;
  });
});
