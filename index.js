

var request     = require ( 'request' ),
    jsdom       = require ( 'jsdom' ),
    jquery      = require ( './jquery' ),
    jscrape;

module.exports = jscrape = function ( options, callback )
{
    if ( typeof options === 'string' )
        options =
            { url       : options
            , pool      : jscrape.pool
            , headers   : jscrape.headers
            };

    request ( options, function ( err, response, body )
    {
        var t0, t1, t2,
            window, $;

        if ( !err )
            try
            {
                t0     = Date.now ();
                window = jsdom.jsdom
                    ( body, null, options.eval
                        ? null : { features: { 'FetchExternalResources' : false, 'ProcessExternalResources' : false } }
                    ).createWindow ();

                t1     = Date.now ();
                $      = jquery.create ( window );

                t2     = Date.now ();
            }
            catch ( e )
            {
                err = e;
                return;
            }

        if ( !err )
        {
            if ( jscrape.debug_mode )
                console.log ( options.url || options.uri, body.length, 'jsdom:', t1 - t0, 'jquery:', t2 - t1 );

            callback ( null, $, response, body );
        }

        else
            callback ( err, null, response, body );
    });
};

jscrape.pool =
    { maxSockets        : 64 };

jscrape.headers =
    { "Accept"          : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    , "Accept-Charset"  : "ISO-8859-1,utf-8;q=0.7,*;q=0.3"
    , "Accept-Language" : "en-US,en;q=0.8"
    , "Cache-Control"   : "no-cache"
    , "Connection"      : "keep-alive"
    , "Pragma"          : "no-cache"
    , "User-Agent"      : "Mozilla/5.0 (Windows NT 6.0; WOW64) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.162 Safari/535.19"
    };

