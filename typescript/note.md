### 基础类型
类型：

1. 布尔型： let isDone: boolean = false
2. 数字（所有数字都是浮点型）： let num: number = 29
3. 字符串： let str: string = '123'
4. 数组：let arr: Array<number> = [12,3]
5. 元组：let arr: [string, number] = ['1', 1] // 两个长度的元组，第一个是字符串，第二个是数字，后面可以任意设置元素的值，但是必须是string类型或者number类型，比如arr[100] = '123'就可以，arr[100] = true就不行。
6. void表示函数没有任何返回值
7. null和undefined类型的变量只能赋值成null和undefined


ts中的接口只是一个外型检测，也就是对对象的属性类型进行描述。

与其他语言一样，ts中的class也可以implements一个接口，类的接口定义包含了构造器接口和实例接口，构造器接口定义了构造函数的规则，实例接口定义了创建成功的对象的规则。

