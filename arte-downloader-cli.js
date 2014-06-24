#!/usr/bin/env node
/*
 * arte7-download
 * https://github.com/jameslafa/arte7-download
 *
 * Copyright (c) 2014 James Lafa
 * Licensed under the MIT license.
 */

'use strict';

var args = require('minimist')(process.argv.slice(2));
var arte7Download = require('./lib/arte7-download.js');

function showHelp(){
  console.log("\nUsage: ./arte-downloader-cli.js <weburl> [options]");
  console.log("\nExample: ./arte-downloader-cli.js http://www.arte.tv/guide/fr/048858-000/master-of-the-universe?autoplay=1");
  console.log("\nOptions:");
  console.log("  -q\t \t Stream quality [HQ, SQ, EQ] (default HQ)");
}

if (args['h']){
  showHelp();
  process.exit(0);
}

if (!args['_'] || args['_'].length < 1){
  console.log("An url from Arte+7 webpage must be given as parameter");
  showHelp();
  process.exit(1);
}

var webUrl = args['_'][0];

if (webUrl.indexOf('http://www.arte.tv/guide/') < 0){
  console.log(webUrl + " is not a valid url. Example: http://www.arte.tv/guide/...");
  showHelp();
  process.exit(1);
}

var options = {
  url : webUrl,
  quality : args['q'] || 'HQ'
};

arte7Download.getVideoDetails(options, function(error, response){
  console.log('\nTitle:\t\t' + response.title);
  console.log('\nDescription:\n' + response.description);
  console.log('\nDuration:\t' + response.duration);
  console.log('\nUrl:\t\t' + response.url);
  console.log('');
});
