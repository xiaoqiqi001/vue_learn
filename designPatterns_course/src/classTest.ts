class Person {
  name
  age
  protected weight // 受保护的属性只有自己和子类可以访问
  constructor(name, age) {
    this.name = name
    this.age = age
    this.weight = 120
  }
  eat () {
    alert(`${this.name} is eating`)
  }
  speak () {
    alert(`my name is ${this.name}, my age is ${this.age}`)
  }
}

class Student extends Person {
  number
  private girlFriend
  constructor (name, age, number) {
    super(name, age)
    this.number = number
    this.girlFriend = 'xiaoli'
  }
  study () {
    alert(`${this.name} study.`)
  }
  getWeight () {
    alert(`${this.weight} zhong`)
  }
}

let xiaoming = new Student('xiaoming', 10, 'A1')
xiaoming.getWeight()