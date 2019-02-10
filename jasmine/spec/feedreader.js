/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Testing RSS Feeds (allFeeds array) */
    describe('RSS Feeds', function() {
        /* Make sure allFeeds array is defined and not empty */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


         /* Make sure that feed has a URL */
         it('have a URL attached to each feed', function() {
             allFeeds.forEach(function(feed) {
                 expect(feed.url).toBeDefined();
                 expect(feed.url).not.toBe('');
             });
         });

         /* Make sure that feed has a name */
         it('have a name', function() {
           allFeeds.forEach(function(feed) {
               expect(feed.name).toBeDefined();
               expect(feed.name).not.toBe('');
           });
         });
    });

    /* Testing the menu */
    describe('The menu', function() {

      /* The side menu is hidden by default */
      it('is hidden by default', function() {
          var selecting_body = document.querySelector('body');
          expect(selecting_body).toHaveClass('menu-hidden');
      });

      /* test that toggle for menu is working properly */
      it('is getting toggled properly', function() {
          var selecting_body = document.querySelector('body');
          expect(selecting_body).toHaveClass('menu-hidden');

          document.querySelector('.menu-icon-link').click();
          expect(selecting_body).not.toHaveClass('menu-hidden');

          document.querySelector('.menu-icon-link').click();
          expect(selecting_body).toHaveClass('menu-hidden');
       });
    });

    /* Testing out that feed is loaded with something to begin with */
    describe('Initial Entries', function() {
         beforeEach(function(done) {
           loadFeed(0, done);
         });

         it('are loaded properly', function() {
           var select_feed = document.querySelector('.feed');
           expect(select_feed.children.length).toBeGreaterThan(0);
           expect(select_feed.querySelector('.entry').innerText.length).toBeGreaterThan(0);
         });
     });

    /* Test to see that feed is updating properly */
    describe('New Feed Selection', function() {
        var initial_feed, final_feed;

        /* Checking that the feed changed after loading first and second feed */
        beforeEach(function(done) {
            loadFeed(0, function(){
              initial_feed = document.querySelector('.feed').children[0].href;
              loadFeed(1, done);
            });
        });

        it('is updating properly', function() {
            final_feed = document.querySelector('.feed').children[0].href;
            expect(initial_feed).not.toBe(final_feed);
        });
    });
}());
