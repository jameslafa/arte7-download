'use strict';

var arte7Download = require('../lib/arte7-download.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.arte7Download = {
  setUp: function(done) {
    // setup here
    done();
  },
  'return video details': function(test) {
    test.expect(5);

    var options = {
      url : 'http://www.arte.tv/guide/fr/048858-000/master-of-the-universe?autoplay=1',
      quality: 'HQ'
    };

    arte7Download.getVideoDetails(options, function(error, response){
      test.equal(response.title, 'Master of the Universe');
      test.equal(response.description, 'Après une vie au service de banques d’investissement allemandes, Rainer Voss, la cinquantaine, a décidé de parler. Il décortique sans fard les mécanismes du monde bancaire, qui s\'est peu à peu déconnecté du monde réel. Un huis clos documentaire stupéfiant.');
      test.equal(response.url, 'http://artestras.vo.llnwxd.net/o35/nogeo/HBBTV/048858-000-A_HQ_2_VF-STF_01334266_MP4-800_AMM-HBBTV.mp4');
      test.equal(response.duration, 5223);
      test.equal(response.picture, 'http://www.arte.tv/papi/tvguide/images/1205155/W940H530/048858-000_masteruniverse_02-1401165914243.jpg');
      test.done();
    });

  }
};
