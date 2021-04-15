// console.log(process.argv)
let answer = 0
for(i = 2; i < process.argv.length; i++) {
    answer += +process.argv[i]
}
console.log(answer)