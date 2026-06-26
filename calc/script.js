let cur = "0";
let exp = "";
let r = document.getElementById("res");
function f(v) {
    if (v === "C") {
        cur = "0";
        exp = "";
    } else if (v === "CE") {
        cur = "0";
    } else if (v === "⌫") {
        if (cur.length > 1)
            cur = cur.slice(0, -1);
        else 
            cur = "0";
    } else if (v === "=") {
        if (exp != "") {
            try {
                cur = String(eval(exp+cur));
                exp = "";
            } catch (e) {
                cur = "Error";
            }
        } 
    } else if (["+", "-", "*", "/", "×"].includes(v)) {
        let op = v === "×" ? "*" : v;
        exp += cur + op;
        cur = "0";
    } else {
        if (cur === "0")
            cur = v;
        else
            cur += v;
    }
    r.value = cur;
}