/*
 * arte7-download
 * https://github.com/jameslafa/arte7-download
 *
 * Copyright (c) 2014 James Lafa
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('underscore');
var request = require('request');
var cheerio = require('cheerio');

var requestDefaultOptions = {
  // Let's pretend we are not a scrapper ;-)
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/537.36'
  }
};

// Scrap the arte website to extract the json url containing the details
// of the video, including different video streams
exports.getArteVpUrl = function(webUrl, callback){
  var requestOptions = _.defaults({url: webUrl}, requestDefaultOptions);

  // Get HTML code from the arte web page
  request(requestOptions, function(error, response, body) {
    if (error){
      callback(error, null);
    }

    var htmlDom = body;
    var $ = cheerio.load(htmlDom);

    // Parse DOM to find .video-container
    var videoContainers = $('div.video-container');

    var attribs;
    var arteVpUrl = null;

    // Find the video container with the attribute 'arte_vp_url'
    // contaiing 'PLUS7'
    for (var i = 0, l = videoContainers.length; i < l; i++){
      attribs = videoContainers[i].attribs;
      if (attribs && attribs['arte_vp_url'] && attribs['arte_vp_url'].indexOf('PLUS7') > -1){
        // We need to remove /player from the url to get the right json url
        arteVpUrl = attribs['arte_vp_url'].replace('/player/', '/');
        break;
      }
    }

    if (arteVpUrl === null){
      callback("No json arte_vp_url found");
    }
    else{
      callback(null, arteVpUrl);
    }
  });
};

// Get the stream details of the requested video
exports.getVideoDetails = function(webUrl, callback) {

  // Get the arteVpUrl from the webUrl
  this.getArteVpUrl(webUrl, function(error, arteVpUrl){
    if (error){
      callback(error, null);
    }

    // Get the JSON file to get video stream details
    var requestOptions = _.defaults({url: arteVpUrl, json: true}, requestDefaultOptions);
    request(requestOptions, function(error, response, body) {
      if (error){
        callback(error, null);
      }

      var videoInfos = body['video'];

      // Initialize first video details
      var videoDetails = {
        title: videoInfos['VTI'],
        description: videoInfos['VDE']
      };

      // Loop on every streams to extract the right one
      for (var i = 0, l = videoInfos['VSR'].length; i < l; i++){
        var videoFlow = videoInfos['VSR'][i];
        // Right now we extract the High Quality MP4 stream, but this shoubd be
        // configurable with options
        if (videoFlow['VFO'] === 'HBBTV' && videoFlow['VMT'] === 'mp4' && videoFlow['VQU'] === "HQ"){
          videoDetails.url = videoFlow['VUR'];
        }
      }

      callback(null, videoDetails);
    });
  });
};
