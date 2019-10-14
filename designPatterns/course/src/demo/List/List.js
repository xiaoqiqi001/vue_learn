import $ from 'jquery'
import {GET_LIST} from '../config'

export default class List {
  constructor (app) {
    this.app = app
    this.$el = $('<div></div>')
  }

  loadData () {
    return fetch(GET_LIST).then(result => {
      return result.json()
    })
  }

  initItemList (data) {
    data.map(itemData => {

    })
  }

  render () {
    this.app.$el.append(this.$el)
  }

  init () {
    this.loadData().then(data => {
      this.initItemList(data)
    }).then(() => {
      this.render()
    })
  }
}