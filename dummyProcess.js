const delay = 3000
const start = new Date().getTime()
var curr = new Date().getTime()
while (curr - start < delay) {
    curr = new Date().getTime()
}
console.log("hello")
