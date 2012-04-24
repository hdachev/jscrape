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
