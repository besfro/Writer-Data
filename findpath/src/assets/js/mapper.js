class Mapper {
  constructor (options) {
    const {
      mapSize = [100, 100],
      start = { x: 5, y: 5 },
      end = { x: 20, y: 5 },
      blocks = [],
      diagonal = false
    } = options
    this.mapperOptions = options
    this.diagonal = diagonal
    this.setMapSize(mapSize)
    this.setStart(start)
    this.setEnd(end)
    this.setBlocks(blocks)
  }

  setMapSize (mapSize) {
    const [x, y] = mapSize
    this.maxX = x - 1
    this.maxY = y - 1
    this.createMap()
  }

  setStart (point) {
    if (!this.checkPoint(point)) {
      console.error('设置开始位置, 设置的位置超出地图范围')
      return
    }
    this.map[point.y][point.x] = 1
    return this.start = point
  }

  setEnd (point) {
    if (!this.checkPoint(point)) {
      console.error('设置结束位置, 设置的位置超出地图范围')
      return
    }
    this.map[point.y][point.x] = 2
    return this.end = point
  }

  setBlocks (blocks) {
    this.blocks && this.blocks.forEach(point => this.map[point.y][point.x] = 0)
    this.blocks = blocks
    blocks.forEach(point => {
      if (this.checkPoint(point)) {
        this.map[point.y][point.x] = 3
      }
    })
  }

  // 0 - empty
  // 1 - start
  // 2 - end
  // 3 - block
  createMap () {
    const grids = () => new Array(this.maxX + 1).fill(0)
    this.map = new Array(this.maxY + 1).fill(0).map(() => grids())
  }

  getGrids () {
    return JSON.parse(
      JSON.stringify(this.map)
    )
  }

  isBlockPoint (point) {
    return this.map[point.y][point.x] === 3
  }

  findAround (point) {
    const { x, y } = point
    const { diagonal } = this
    if (!this.checkPoint(point)) {
      return []
    }

    const lx = x - 1
    const rx = x + 1
    const ty = y - 1
    const by = y + 1
    // 
    const result = [].concat(
      [
        { x, y: ty, position: 'top', diagonal: false},
        { x: lx, y: y, position: 'left', diagonal: false},
        { x: rx, y: y, position: 'right', diagonal: false},
        { x: x, y: by, position: 'bottom', diagonal: false}
      ],
      diagonal ? [
        { x: lx, y: ty, position: 'topLeft', diagonal: true},
        { x: rx, y: ty, position: 'topRight', diagonal: true},
        { x: lx, y: by, position: 'bottomLeft', diagonal: true},
        { x: rx, y: by, position: 'bottomRight', diagonal: true}
      ] : []
    )
  
    return result.filter(point => {
      return this.checkPoint(point) && !this.isBlockPoint(point)
    })
    
  }

  checkPoint (point) {
    const { x, y } = point
    const { maxX, maxY } = this
    if ( x && y && x < maxX && y < maxY && x >= 0 && y >= 0) {
      return true
    }
  }

  isStartPoint (point) {
    return this.map[point.y][point.x] === 1
  }

  isEndPoint (point) {
    return this.map[point.y][point.x] === 2
  }

}

export default Mapper