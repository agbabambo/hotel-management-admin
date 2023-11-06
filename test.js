const str = "/hotels/shitshit/roomTypes/shit"

const regex = /^\/hotels\/[^/]+\/roomTypes(?:\/.*)?$/

console.log(regex.test(str))

console.log(str.match(regex))