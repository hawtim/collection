## 难以读懂的命名

1. 单词拼写错误
2. 中英文混用
3. 以 1-9， a-z 等序列来命名
4. 混用命名格式（大小驼峰，帕斯卡）
5. 纯中文命名
6. 完全看不清语意的简写
7. 单数和复数要分
8. 正反义词

```js
// 常见的
openModal, closeModal
showModal, hideModal
// 其实简单点
function toggleModal(status: Boolean) {
  this.showModal = status
}
```

## 命名建议

1. 图片 小写字母，建议使用 '-'，比如通用性质的图片，比如 logo.jpg...， 又比如我们这个图片限定在某个组件下面或者模块下面，就建议按照 类别-模块-功能，假设我们有一个星星的图标，命名为 `icon-lesson-item-star-rate.png`，这样看起来不会觉得很尬吗？ 一般在中等规模工程里，`/static/img/lesson-item/star.png` 搞定，大型规模工程，`/static/img/lesson-item/icon/star.png`

2. 类名 小写字母，建议使用 '-' 或 '\_\_' 分割
   以上面的图片为例， 使用 BEM 命名

```css
.lesson-item-star__light {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url('../../static/lesson-item-star.png');
  background-position: center;
  background-size: 100%;
}
```
3. 文件 小驼峰
   比如我们在一个组件里使用了上面的图片和 class
   那么，文件名建议是怎么样的呢？
   `lessonItem.vue`
4. 变量 小驼峰
   我们要给用这个星星来评分，那么我们就要有一个变量来保存星星的分数，那么这个变量叫什么好？
   `lessonItemStarValue`
5. 类 大驼峰
   假设有一个父类叫 Star， 我们使用的这个 star 是从父类继承来的，那么我们这个类要怎么命名
   `LessonItemStar`
```js
class LessonItemStar extends Star {
  constructor(props) {
    super(props)
  }
}
```
6. 常量 大写字母，用 '\_' 分割
   我们要把星星数值的改变同步到其他组件中，就会在 `vuex` 中定义一个 `mutation-type`
   `const UPDATE_STAR_VALUE = 'UPDATE_STAR_VALUE'`
7. 临时变量，私有变量 '\_' 开头，驼峰命名
   比如我们处理数据的时候，将一个嵌套对象变成数组
- 临时变量
```js
// 我们有这么一颗树，然后我需要实现一个方法，通过id获取对应的节点内容
let tree = {
  id: '1',
  label: 'fisrt',
  children: [
    {
      id: '2',
      label: 'second'
    },
    {
      id: '3',
      label: 'third',
      children: [
        {
          id: '4',
          label: 'fourth'
        },
        {
          id: '5',
          label: 'fifth',
          children: [
            {
              id: 6,
              label: 'sixth'
            }
          ]
        }
      ]
    }
  ]
}

let _treeObject = {} // _treeObject
function getChildrenNode(node) {
  _treeObject[node.id] = node
  if (node.children && node.children.length) {
    node.children.forEach(childNode => {
      return getChildrenNode(childNode)
    })
  }
  return _treeObject
}

function findNodeById(root, id) {
  if (root.id === id) return root
  return getChildrenNode(root)[id]
}

findNodeById(tree, 3)
```

- 私有变量
```js
let myStar = {
  value: 0,
  setValue(value) {
    // 保存当前的 this
    let _this = this
    _this.value = value
    setTimeout(function() {
      alert(_this.value)
    }, 1000)
  }
}
```
8. 函数名 小驼峰

- 获取或者设置值，建议使用 get 和 set
```js
function getStarValue() {}
function setStarValue() {}
```
- 处理动作，建议使用 handle, submit，一般来说，单个单词的话建议加个动词，避免函数名冲突
```js
function handleChange() {}
function handleRegister() {}
function submitForm() {}
```

所以结合以上内容我们能做出个什么组件来呢？

让开，我要开始装逼了
```vue


```
