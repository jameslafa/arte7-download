# arte7-download [![Build Status](https://secure.travis-ci.org/jameslafa/arte7-download.png?branch=master)](http://travis-ci.org/jameslafa/arte7-download)

Get video stream details from Arte+7 to download it and watch them later.

## Getting Started

```javascript
var arte7-download = require('arte7-download');
var webUrl = 'http://www.arte.tv/guide/fr/048858-000/master-of-the-universe';
arte7-download.getVideoDetails(webUrl, function(error, videoDetails){
  console.log('\nTitle: ' + response.title);
  console.log('\nDescription: ' + response.description);
  console.log('\nUrl: ' + response.url);
});
```

## Documentation
####What is it?
Small nodejs module parsing arte+7 web page to extract video information including the url of the video stream.

####Why?
Because Arte is simply the best channel I know, offering the best documentaries.

They implemented Arte+7 allowing you to watch every documentary during the 7 following days of the first diffusion in case you missed it.

However, sometimes, I can't watch it online because I travel or I'm somewhere with a limited connection and I want to download it. This library gets you the url of the video stream to allow you to download it.

####But... maybe...\*
it's not completely legal... The reason Arte does not offer watching the video more than 7 days is not because they don't want to, but because they have legal engagement.

It means, you should use this library only for a personal use. Like you would record your TV with your VHS recorder. But you shouldn't make a platform allowing people to download the video streams and you should really avoid to burn it on DVDs and sell it on the market :-)

####What is the status?
Well, I don't know if we can even call this a prototype. :-)

As this stage, we can get the video title, description and url of the High Quality stream. Then you still have to download it with the tool you desire.
I will spend a bit of time to make it more usable and customisable.

Every help is welcome!

\* reference to https://www.youtube.com/watch?v=bkjmzEEQUlE

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
####Version 0.0.1

 Few lines of code to extract the url. It really needs more work to call this a library :-)

## License
Copyright (c) 2014 James Lafa. Licensed under the MIT license.
