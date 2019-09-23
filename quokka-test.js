$_$wp(1);
const axios = ($_$w(1, 0), require('axios'));
const fetch = ($_$w(1, 1), require('node-fetch'));
function fetchX() {
    $_$wf(1);
    return $_$w(1, 2), 1;
}
function fetchY() {
    $_$wf(1);
    return $_$w(1, 3), 2;
}
async function add(getX, getY, cb) {
    $_$wf(1);
    var x = x || $_$w(1, 4), y;
    $_$w(1, 5), getX(function (xVal) {
        $_$wf(1);
        $_$w(1, 6), x = xVal;
        if ($_$w(1, 7), y != undefined) {
            $_$w(1, 8), cb(x + y);
        }
    });
    $_$w(1, 9), getY(function (yVal) {
        $_$wf(1);
        $_$w(1, 10), y = yVal;
        if ($_$w(1, 11), x != undefined) {
            $_$w(1, 12), cb(x + y);
        }
    });
}
const test = ($_$w(1, 13), await add(fetchX, fetchY, function (sum) {
    $_$wf(1);
    $_$w(1, 14), $_$tracer.log('test', '', 1, 14);
    $_$w(1, 15), $_$tracer.log(sum, 'sum', 1, 15);
    return $_$w(1, 16), 'sum';
}));
async function bleh() {
    $_$wf(1);
    $_$w(1, 17), console.time('concatenation');
    const res = ($_$w(1, 18), 'async test!');
    const $_$wvd20 = $_$w(1, 19), delay = ms => {
            $_$wf(1);
            return $_$w(1, 20), new Promise(res => {
                $_$wf(1);
                return $_$w(1, 21), setTimeout(res, ms);
            });
        };
    $_$w(1, 22), await delay(500);
    $_$w(1, 23), console.timeEnd('concatenation');
    return $_$w(1, 24), res;
}
let test2 = ($_$w(1, 25), await bleh());
if ($_$w(1, 26), test2) {
    $_$w(1, 27), $_$tracer.log(test2, 'test2', 1, 27);
} else {
    $_$w(1, 28), $_$tracer.log('not ready', '', 1, 28);
}
function timeoutPromise(delay) {
    $_$wf(1);
    return $_$w(1, 29), new Promise(function (resolve, reject) {
        $_$wf(1);
        $_$w(1, 30), setTimeout(function () {
            $_$wf(1);
            $_$w(1, 31), reject('Timeout!');
        }, delay);
    });
}
const spotifyEndpoint = ($_$w(1, 32), 'http://spotify-car-play.herokuapp.com/search');
const target = ($_$w(1, 33), `http://spotify-car-play.herokuapp.com/search/Couples%20Therapy+Tylo%20$mith/track`);
try {
    const response = ($_$w(1, 34), await axios.get(target));
    $_$w(1, 35), $_$tracer.log(response.data.tracks, 'response.data.tracks', 1, 35);
} catch (err) {
    $_$w(1, 36), $_$tracer.log(err, 'err', 1, 36);
}
try {
    const response = ($_$w(1, 37), await fetch(target).then(response => {
        $_$wf(1);
        return $_$w(1, 38), response.json();
    }).then(data => {
        $_$wf(1);
        return $_$w(1, 39), data.tracks;
    }));
    $_$w(1, 40), $_$tracer.log(response, 'response', 1, 40);
} catch (err) {
    $_$w(1, 41), $_$tracer.log(err, 'err', 1, 41);
}
$_$wpe(1);