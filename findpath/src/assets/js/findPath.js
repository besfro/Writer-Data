import Mapper from './mapper.js'
import PointHeat from './pointHeat.js'

class FindPath extends Mapper {
  constructor (opts) {
    const defOpts = {
      mapSize: [100, 100],
      moveCost: 10,
      diagonal: true,
      diagonalMoveCost: 14,
      onFind () {},
      onPath () {}
    }
    const options = Object.assign({}, defOpts, opts)
    console.log(options)
    super(options)
    ;({
      moveCost: this.moveCost,
      diagonal: this.diagonal,
      diagonalMoveCost: this.diagonalMoveCost,
      onFind: this.onFind,
      onPath: this.onPath
    } = options)
    this.reset()
  }

  reset () {
    this.openList = new PointHeat()
    this.closeList = new PointHeat()
  }

  g (point, parent) {
    return ( parent.g || 0 ) + ( point.diagonal ? this.diagonalMoveCost : this.moveCost )
  }

  h (point, target) {
    const { x, y } = point
    const { x: tx, y: ty } = target
    const abs = Math.abs
    return (
      abs(tx - x) * this.moveCost + abs(ty - y) * this.moveCost
    )
  }

  calculateCost (point) {
    const target = point.parent
    const g = point.g = this.g(point, target)
    const h = point.h = this.h(point, this.end)
    point.f = g + h
    return point
  }

  calculate () {
    const findPath = this.findPath()
    if (findPath) {
      return this.getRoad(findPath)
    } else {
      console.log('无法找到达到路劲')
    }
  }

  findPath () {
    this.reset()
    const start = this.start
    start.f = 0
    start.g = 0
    start.h = 0
    this.openList.add(start)

    while (this.openList.set.length > 0) {
      const curPoint = this.openList.set.pop()

      if (this.isEndPoint(curPoint)) {
        this.end.parent = curPoint
        return this.end
      }

      this.closeList.add(curPoint)
      
      const around = this.findAround(curPoint)
      if (!around.length) {
        return false
      }

      // 计算估值 设置 parent
      for (let item of around) {
        if ( this.closeList.has(item) ) {
          continue
        }

        item.parent = curPoint
        this.calculateCost(item)
        const hadPoint = this.openList.getPoint(item)
        if (hadPoint && hadPoint.f > item.f) {
          hadPoint.parent = curPoint
          this.calculateCost(hadPoint)
          //this.openList.delete(hadPoint)
        }
        if (!hadPoint) {
          this.openList.add(item)
          this.onFind(item)
        }

      }

    }

  }

  getRoad (point) {
    let path = [ [point.x, point.y] ]
    this.onPath(point)
    while (point.parent) {
      point = point.parent
      path.push( [point.x, point.y] )
      this.onPath(point)
    }
    return path.reverse()
  }

}

export default FindPath