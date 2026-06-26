// đề: số nguyên tố
function prime(a) {
    if (a == 1 || a == 0) return false;
    if (a == 2) return true;
    if (a % 2 == 0) return false;
    let m = Math.sqrt(a)
    for (let i = 3; i < m; i += 2) {
        if (a % i == 0 )
            return false;
    }
    return true;
}
let a = [2, 1, 3, 6, 7, 8, 0, 10];
a = a.filter(num => prime(num))
console.log(a)