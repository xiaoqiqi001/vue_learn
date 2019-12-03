class Circle {
  draw () {
    console.log('画一个圆形')
  }
}

class Decorator {
  constructor (circle) {
    this.circle = circle
  }

  draw() {
    this.circle.draw()
    this.setBorderColor()
  }

  setBorderColor () {
    console.log('设置一个边框颜色')
  }
}

let circle = new Circle()
circle.draw()

let decorator = new Decorator(circle)
decorator.draw()