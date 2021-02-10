/*
 * @Name 
 * @Description set heat
 * @Author clc
 * @Date 2020-08-04 09:46:22
 * @LastEditTime 2020-08-04 10:58:53
 * @Email Lengchars@gmail.com
 */ 

  class PointHeat {

    constructor () {
      this.clear()
    }

    clear () {
      this.set = []
    }
    
    getPoint (point) {
      const find = this._getPointFormSet(point) || {}
      return find.point 
    }

    has (point) {
      return this._getPointFormSet(point)
    }

    add (point) {
      this.set.push(point)
      this.sort()
    }

    delete (point) {
      const { set, _getPointFormSet } = this
      const { index } = _getPointFormSet(point)
      return set.splice(index, 1)
    }

    sort () {
      this.set = this.set.sort((a, b) => b.f - a.f)
    }

    _getPointFormSet (point) {
      for(let [index, item] of this.set.entries()) {
        if (item.x === point.x && item.y === point.y) {
          return { point: item, index }
        }
      }
    }

  }

  export default PointHeat