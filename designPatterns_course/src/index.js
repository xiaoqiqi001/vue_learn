 class Subject {
   constructor () {
     this.observers = []
     this.state = 0
   }

   // 类似于状态模式，只是状态模式中当状态变化的时候只执行固定的操作，并且要状态切换，但是这里不需要状态切换
   setState (state) {
     this.state = state
     this.notifyAllObserver()
   }

   getState () {
     return this.state
   }

   notifyAllObserver () {
     this.observers.forEach(observer => {
       observer.update()
     })
   }

   addObserver (observer) {
     this.observers.push(observer)
   }
 }

 class Observer {
  constructor (name, subject) {
    this.name = name
    this.subject = subject
    this.subject.addObserver(this)
  }

  update () {
    console.log(`${this.name} update, state: ${this.subject.getState()}`)
  }
 }

let subject = new Subject()
let o1 = new Observer('o1', subject)
let o2 = new Observer('o2', subject)
let o3 = new Observer('o3', subject)
subject.setState(1)
