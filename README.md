# jscrape = jsdom + request + jquery for the truly lazy


### Install

    npm install jscrape


### Be lazy

Use the same way you'd use request,
passing a url or request-options as the first param,
and a `function(err, $, response, body)` callback,
where `$` is the jQuery object for the parsed page:

```javascript
var jscrape = require ( './index' );
jscrape ( 'http://www.google.com', function ( error, $, response, body ) {
    if ( !error && $ ) {
        // print the innerHTML of the lucky button.
        console.log( $( 'button:contains("Lucky")' ).html () )
    }
})
```

Or just use a `function(err, $)`-style callback:

```javascript
var jscrape = require ( "./index" );
function getNews ( callback ) {
    jscrape ( 'http://news.ycombinator.com/', function ( err, $ ) {
        // jquery to the rescue
        callback ( err, $ && $( 'span[id^=score]' ).map ( function () {
            var link;
            // some nested tables are better than others
            return {
                id      : num ( $( this ).attr ( 'id' ) ),
                url     : ( link = $( this ).closest ( 'tr' ).prev ( 'tr' ).find ( 'td.title a' ) )
                            .attr ( 'href' ),
                title   : link.text (),
                score   : num ( $( this ).text () )
            }
        }).get () )
    })
    function num ( str ) {
        return Number ( String ( str ).replace ( /[^0-9]+/g, '' ) )
    }
}
getNews ( function ( err, news ) {
    console.log ( err, news );
})
```

When passing an object as the first param
it's passed through directly to request.
Instead, when passing in just a url string,
its wrapped in a request options object
that has some sensible defaults
for a simple scraping setup,
so you can be lazy.
Enjoy!


### Workaround for npm trouble with contextify on windows

If you can't `npm install jscrape`
because of contextify failing to build on windows,
clone the `contextify` repo under `your_project/node_modules/contextify`
and replace the contents of `lib/contextify.js`
with the following:

```javascript
module.exports = function ( obj ) {
    obj.getGlobal = function () {
        return obj;
    }
};
```

That should work just fine.
