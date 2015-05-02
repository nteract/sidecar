/* global process */
var packageJSON = require('./package.json');

var path = require('path');

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-download-electron')
	grunt.loadNpmTasks('grunt-electron-installer')
	
	var home = process.platform === 'win32' ? process.env.USERPROFILE : process.env.HOME;
	var electronDownloadDir = path.join(home, '.atom', 'electron');
	
	grunt.initConfig({
		'download-electron': {
      		version: packageJSON.electronVersion,
      		outputDir: 'electron',
      		downloadDir: electronDownloadDir,
      		rebuild: true  // rebuild native modules after electron is updated
		}
	});
	
	grunt.registerTask('default', ['download-electron']);
	
};