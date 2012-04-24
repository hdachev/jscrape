var jscrape = require ( './index' );
jscrape ( 'http://www.google.com', function ( error, $, response, body ) {
    if ( !error && $ ) {
        // Print the innerHTML of the I'm Feeling Lucky button.
        console.log( $( 'button[onclick^=if]' ).html () )
    }
})
