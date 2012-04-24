

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
        if ( !err && response.statusCode == 200 )
            callback ( null, jquery.create ( jsdom.jsdom ( body ).createWindow () ), response, body );
        else
            callback ( err || response.statusCode, null, response, body );
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

