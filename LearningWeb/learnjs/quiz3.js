var fun1 = (new Function("x","y=2","return x*y;"))(4); // 这个时候fun1是一个值9
var fun2 = (function(x){
    if(typeof x != "function")
        return function(){return x+1;}
    else
        return 2;
}) (fun1);

var y = fun2(3);
console.log(y)
// document.write(y + "<br>");

var i = 1;
let j = 2;
k = 3;
function f1(){
    i = 4;
    j = 5;
    var k = 6;
    {
        var i = 7;
        let j = 8;
        k = 9;
    }
}
f1();
s = i * j * k;

console.log("2:"+s)