let t = 0;
let r = null;
let st = 0;
let lp = [];
function fmt(x) {
    let ms = Math.floor((x % 1000)/10);
    let s = Math.floor((x/1000)%60);
    let m = Math.floor((x / (1000*60))% 60);
    let h = Math.floor(x / (1000*60*60));
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ":" + String(s).padStart(2, '0') + '.' + String(ms).padStart(2, '0');
}
function up() {
    t = Date.now()-st;
    document.getElementById('disp').innerText = fmt(t);
}
function tkS() {
    let b = document.getElementById('btnS');
    if (!r) {
        st = Date.now()-t;
        r = setInterval(up, 10);
        b.innerText = 'Stop';
        document.getElementById('btnL').disabled = false;
    } else {
        clearInterval(r);
        r = null;
        b.innerText = 'Start';
        document.getElementById('btnL').disabled = true;
    }
}
function tkL() {
    if (r) {
        lp.push(t);
        let li = document.createElement('li');
        li.innerText = 'Lap ' + lp.length + ": " + fmt(t);
        document.getElementById('laps').appendChild(li);
    }
}
function tkR() {
    clearInterval(r);
    r = null;
    t = 0;
    lp = [];
    document.getElementById('disp').innerText = '00:00:00.00';
    document.getElementById('btnS').innerText = 'Start';
    document.getElementById('btnL').disabled  = true;
    document.getElementById('laps').innerHTML = '';
}