$_$wp(1);
function fetchX() {
    $_$wf(1);
    return $_$w(1, 0), 1;
}
function fetchY() {
    $_$wf(1);
    return $_$w(1, 1), 2;
}
async function add(getX, getY, cb) {
    $_$wf(1);
    var x = x || $_$w(1, 2), y;
    $_$w(1, 3), getX(function (xVal) {
        $_$wf(1);
        $_$w(1, 4), x = xVal;
        if ($_$w(1, 5), y != undefined) {
            $_$w(1, 6), cb(x + y);
        }
    });
    $_$w(1, 7), getY(function (yVal) {
        $_$wf(1);
        $_$w(1, 8), y = yVal;
        if ($_$w(1, 9), x != undefined) {
            $_$w(1, 10), cb(x + y);
        }
    });
}
const test = ($_$w(1, 11), await add(fetchX, fetchY, function (sum) {
    $_$wf(1);
    $_$w(1, 12), $_$tracer.log('test', '', 1, 12);
    $_$w(1, 13), $_$tracer.log(sum, 'sum', 1, 13);
    return $_$w(1, 14), 'sum';
}));
async function bleh() {
    $_$wf(1);
    $_$w(1, 15), console.time('concatenation');
    const res = ($_$w(1, 16), 'async test!');
    const $_$wvd18 = $_$w(1, 17), delay = ms => {
            $_$wf(1);
            return $_$w(1, 18), new Promise(res => {
                $_$wf(1);
                return $_$w(1, 19), setTimeout(res, ms);
            });
        };
    $_$w(1, 20), await delay(500);
    $_$w(1, 21), console.timeEnd('concatenation');
    return $_$w(1, 22), res;
}
let test2 = ($_$w(1, 23), await bleh());
if ($_$w(1, 24), test2) {
    $_$w(1, 25), $_$tracer.log(test2, 'test2', 1, 25);
} else {
    $_$w(1, 26), $_$tracer.log('not ready', '', 1, 26);
}
function timeoutPromise(delay) {
    $_$wf(1);
    return $_$w(1, 27), new Promise(function (resolve, reject) {
        $_$wf(1);
        $_$w(1, 28), setTimeout(function () {
            $_$wf(1);
            $_$w(1, 29), reject('Timeout!');
        }, delay);
    });
}
$_$w(1, 30), Promise.race([
    bleh(),
    timeoutPromise(100)
]).then(function () {
    $_$wf(1);
    $_$w(1, 31), $_$tracer.log('bleh', '', 1, 31);
}, function (err) {
    $_$wf(1);
    $_$w(1, 32), $_$tracer.log('too long', '', 1, 32);
});
$_$wpe(1);