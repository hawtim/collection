var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// what is algorithm
// define as a great calculate process which use one or one group value as input and produce one or one group value as output

// computer have the main part includes of i/o, cpu and memory

// 算法的本质是执行设计好的指令集，从输入到产生输出的过程
// 1. 确定性： 每个步骤都是明确的，可行的，结果可预期的
// 2. 有穷性： 要有一个终止条件
// 3. 输入和输出： 必须有输入输出

// 算法的领域极其广阔，不要把思维仅仅局限在计算机领域中

// 顺序执行，循环和分支
// 算法和数据结构关系紧密

// 最 nice 的解法
// 问题 从一个数组中找出N个数，其和为M的所有可能
// 如何从数组中选取N个数进行求和运算

// 标记中有几个1就是代表选取了几个数，然后再去遍历这些1所有可能存在的排列方式，最后做一个判断：
// 每一种排列方式，都代表着数组中不同位置的被选中的数的组合，所以这里就是将选中的这些数字，进行求和运算，然后判断求出的和是不是等于M

// 如何将数组和标记关联

const arr = [1, 2, 3, 4]
let len = arr.length, bit = 1 << len
// 这里忽略了 0 的情况（N=0），取值就是 1 - 15
for (let i = 1; i < bit; i++) {

}

// 如何从 1110 标记中取出 1 的个数（最简单的方式）

const n = num => num.toString(2).replace(/0/g, '').length

// 位运算为何提高性能
// 位运算直接用二进制进行表示，省去了中间过程的各种复杂转换，提高了速度

// 但是因为位运算快，所以我们使用 & 运算来解决这个问题

const n = num => {
    let count = 0
    while(num) {
        num &= num - 1
        count++
    }
    return count
}

// 计算和等于 M

// 1110 到 [1, 2, 3, 4] 的映射，就代表从右往左选取了二三四位，也就是 2 + 3 + 4, 然后判断 2 + 3 + 4 等于 M
// 如何建立这个映射关系
// [1, 2, 3, 4]
// 1000 0100 0010 0001

// 实现方式也是通过位运算--左位移来实现
// 1 << inx inx 为数组的下标

// 位掩码
// 1 << 0 // 1 => 0001 把左边的值变成二进制形式，然后左移或者右移，超出补0 0001 左移 0 位还是 0001
// 1 << 1 // 2 => 0001 左移 1 位是 0010
// 1 << 2 // 4 => 0001 左移 2 位是 0100
// 1 << 3 // 4 => 0001 左移 3 位是 1000

for(let j = 0; j < arr.length; j ++) {
    if ((i & (1 << j))!== 0) {
        // 代表这个数被选取了，我们做累加求和就行
    }
}

// 最终实现代码如下
const search = (arr, count, sum) => {
    const n = num => {
        let count = 0
        while(num) {
            num &= num - 1
            count++
        }
        return count
    }
    let len = arr.length, bit = 1 << len, res = []
    for (let i = 1; i < bit; i++) {
        if(n(i) === count) {
            let s = 0, temp = []
            // 每一种满足个数为 N 的选择情况下，继续判断是否满足和为 M
            for(let j = 0; j < len; j++) {
                if ((i & 1 << j) !== 0) {
                    s += arr[j]
                    temp.push(arr[j])
                }
            }
            if (s === sum) {
                res.push(temp)
            }
        }
    }
    return res
}

const arr = Array.from({length: 10000000}, (item, index) => index)
const mocks = sum => [3, 300, 3000, 30000, 300000, 3000000].map(item => ({count: item, sum: sum}))

let res = []
mocks(3000).forEach((count, sum) => {
    const start = window.performance.now()
    search(arr, count, sum)
    const end = window.performance.now()
    console.log(start, end)
    res.push(end - start)
})