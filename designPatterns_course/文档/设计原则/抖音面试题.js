class Park {
  constructor (floorList) {
    this.floorList = floorList
    this.screen = new Screen
    this.carame = new Carame
    this.carList = {}
  }

  in (car) {
    const info = this.carame.shoot(car)
    const i = parseInt(Math.random() * 100 % 100)
    const place = this.floorList[0].placeList[i]
    place.in(car)
    info.place = place
    this.carList[num] = info
  }

  out (car) {
    const info = this.carList[car.number]
    const place = info.place
    place.out()
    this.screen.show(car, info.inTime)
    delete this.carList[car.number]
  }

  getEmptyNum () {
    return this.floorList.map(item => {
      return `${item.index} 层还有 ${item.getEmptyNum()} 个车位`
    }).jon('\n')
  }
}

class Floor {
  constructor (index, placeList) {
    this.index = index
    this.placeList = placeList
  }

  getEmptyNum () {
    num = 0
    this.placeList.forEach(item => {
      item.hasCar() && num++
    })
    return num
  }
}

class Place {
  constructor (car = null) {
    this.car = null
  }

  in (car) {
    this.car = car
  }

  out (car) {
    this.car = null
  }

  hasCar () {
    return this.car !== null
  }
}

class Car {
  constructor (number, name) {
    this.number = number
    this.name = name
  }
}

class Carame {
  shoot (car) {
    return {
      number: car.number,
      name: car.name,
      inTime: Date.now()
    }
  }
}

class Screen {
  show (car) {
    console.log(`车牌号${car.number}, 车名字${car.name}, 停车时常：${Date.now() - car.inTime}`)
  }
}
