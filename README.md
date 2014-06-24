# arte7-download [![Build Status](https://secure.travis-ci.org/jameslafa/arte7-download.png?branch=master)](http://travis-ci.org/jameslafa/arte7-download)

Get video stream details from Arte+7 to download it and watch them later.

## Getting Started

```bash
./arte-downloader-cli.js http://www.arte.tv/guide/fr/048858-000/master-of-the-universe?autoplay=1

Title:		Master of the Universe

Description:
Après une vie au service de banques d’investissement allemandes, Rainer Voss, la cinquantaine, a décidé de parler. Il décortique sans fard les mécanismes du monde bancaire, qui s'est peu à peu déconnecté du monde réel. Un huis clos documentaire stupéfiant.

Duration:	5223

Url:		http://artestras.vo.llnwxd.net/o35/nogeo/HBBTV/048858-000-A_HQ_2_VF-STF_01334266_MP4-800_AMM-HBBTV.mp4
```

## Documentation
####What is it?
Small nodejs module parsing arte+7 web page to extract video informations including the url of the video stream.

####Why?
Because Arte is simply the best channel I know, offering the best documentaries.

They implemented Arte+7 allowing you to watch every documentary during the 7 following days of the first diffusion in case you missed it.

However, sometimes, I can't watch it online because I travel or I'm somewhere with a limited connection and I would like to download it. This module gives you the url of the video stream that you can then download easily.

####But... maybe...\*
it's not completely legal... The reason Arte does not offer watching the video more than 7 days is not because they don't want to, but because they have legal engagement.

It means, you should use this tool only for a personal use, like you would record your TV with your VHS recorder. But you shouldn't make a platform allowing people to download the video streams and you should really avoid to burn it on DVDs and sell it on the market :-)

####What is the status?
Well, I don't know if we can even call this a prototype. :-)

As this stage, we can get the video title, description and url of the requested quality stream. Then you still have to download it with the tool you desire.
I will spend a bit of time to make it more usable and customisable.

Every help is welcome!

\* reference to https://www.youtube.com/watch?v=bkjmzEEQUlE

## Release History
####Version 0.0.2
 - A small client has been written to allow you to get the stream url easily.
 - Stream quality is now an option, but stays HQ by default.
 - The duration and film image is now returned.

####Version 0.0.1
 Few lines of code to extract the url. It really needs more work to call this a library :-)

## License
Copyright (c) 2014 James Lafa. Licensed under the MIT license.
