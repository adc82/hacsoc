/**
 * OBJECTS
 *
 * Objects in JavaScript are key value pairs
 */
let obj = {
  hello: "hello",
  world: 42,
  func: function() {
    return "hello world";
  }
};

console.log(obj);
console.log(obj.hello);
console.log(obj["world"]);
console.log(obj.func());

