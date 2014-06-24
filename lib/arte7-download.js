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

    // Find the video container with the attribute 'arte_vp_url'
    // contaiing 'PLUS7'
    var container = _.find(videoContainers, function(container){
      return  container.attribs &&
              container.attribs['arte_vp_url'] &&
              container.attribs['arte_vp_url'].indexOf('PLUS7') > -1;
    });

    if (!container) {
      callback("No video container were found while scrapping the page", null);
    }

    // We need to remove /player from the url to get the right JSON file
    var arteVpUrl = container.attribs['arte_vp_url'].replace('/player/', '/');

    // We return result
    callback(null, arteVpUrl);
  });
};

// Get the stream details of the requested video
exports.getVideoDetails = function(options, callback) {

  if (!options.url){
    callback("options.url is required", null);
  }

  // Default quality is HQ (in case it is not defined or no correct)
  if (!options.quality || !_.contains(['HQ', 'SQ', 'EQ'], options.quality)){
    options.quality = 'HQ';
  }

  // Get the arteVpUrl from the webUrl
  this.getArteVpUrl(options.url, function(error, arteVpUrl){
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
        description: videoInfos['VDE'],
        duration: videoInfos['videoDurationSeconds'],
        picture: videoInfos['programImage']
      };

      // Find the corresponding source to extract the url
      var source = _.find(videoInfos['VSR'], function(source){
        return  source['VFO'] === 'HBBTV' &&
                source['VMT'] === 'mp4' &&
                source['VQU'] === options.quality;
      });

      if (!source){
        callback("No video source found for this options");
      }

      videoDetails.url = source['VUR'];

      callback(null, videoDetails);
    });
  });
};
