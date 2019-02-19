// 手工设置每个属性的[[Configurable]]、[[Writable]]、 [[Enumerable]]、[[Value]]、[[Get]]以及[[Set]]特性，以改变属性的行为。
// 类似地，ECMAScript 5也增加了几个方法，通过它们可以指定对象的行为。
// 不过请注意：一旦把对象定义为防篡改，就无法撤销了。

// 1. 不可拓展对象(一级防护)

var person = { name: 'Nicholas' }
Object.preventExtensions(person)
person.age = 29 // 非严格模式下静默失败
alert(Object.isExtensible(person)); // false

// 2. 密封的对象（二级防护）

var person = { name: "Nicholas" };
Object.seal(person);
person.age = 29
Object.isSealed(person) // true

// 3. 冻结的对象（三级防护）

var person = { name: "Nicholas" };
Object.freeze(person);
person.age = 29;
Object.isFrozen(person);