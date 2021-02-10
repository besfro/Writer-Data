<!--
 * @Name 
 * @Description 
 * @Author clc
 * @Date 2020-08-04 11:02:17
 * @LastEditTime 2020-08-06 13:34:49
 * @Email Lengchars@gmail.com
--> 
<template>
  <div class="content">
    <div class="tool">
      <div class="label"> 
        <span>障碍物 </span> 
        <a-select :default-value="0" :options="blockOptions" @change="changeBlocks">
        </a-select>
      </div>
      <!-- <div class="label"> 
        <span>地图尺寸 </span> 
        <a-select :default-value="mapSize" :options="mapSizeOptions" @change="changeMapSize">
        </a-select>
      </div> -->
      <!-- <div class="label"> 
        <span>画笔 </span> 
        <a-radio-group default-value="start" button-style="solid">
          <a-radio-button value="start">
            起点
          </a-radio-button>
          <a-radio-button value="end">
            终点
          </a-radio-button>
          <a-radio-button value="block">
            障碍物
          </a-radio-button>
        </a-radio-group>
      </div> -->
      <div class="label">
        <a-button type="primary" @click="findPath">找路</a-button>
      </div>
    </div>
    <transition-group tag="div" class="map" @enter="enter" :css="false"
      :style="`grid-template-columns: repeat(${mapSize[0]},1fr); grid-template-rows: repeat(${mapSize[1]},1fr);`">
      <template v-for="[y, row] of grids.entries()">
        <div v-for="[x, grid] of row.entries()" :data-value="grid" :data-grid="`${y}-${x}-${grid}`"
          :key="`${y}-${x}-${grid}`" class="grid">
        </div>
      </template>
    </transition-group>
  </div>
</template>

<script>
import findjs from '../assets/js/findPath.js'

const blocksMap = {
  1: [
    { x: 22, y: 15},
    { x: 22, y: 16 },
    { x: 22, y: 17 },
    { x: 22, y: 18 },
    { x: 22, y: 19 },
    { x: 22, y: 20 },
    { x: 22, y: 21 },
    { x: 22, y: 22 },
    { x: 22, y: 23 },
    { x: 22, y: 24 },
    { x: 22, y: 25 },
    { x: 22, y: 26 },
    { x: 22, y: 27 },
    { x: 22, y: 28 },
    { x: 22, y: 29 },
    { x: 22, y: 30 },
    { x: 22, y: 31 },
    { x: 22, y: 32 },
    { x: 22, y: 33 }
  ],
  2: [
    { x: 25, y: 19},
    { x: 25, y: 18},
    { x: 25, y: 17},
    { x: 25, y: 16},
    { x: 25, y: 15},
    { x: 25, y: 14 },
    { x: 25, y: 13 },
    { x: 25, y: 12 },
    { x: 25, y: 11 },
    { x: 25, y: 10 },
    { x: 25, y: 9 },
    { x: 25, y: 8 },
    { x: 25, y: 7 },
  ],
  3: [
    { x: 45, y: 19},
    { x: 45, y: 18},
    { x: 45, y: 17},
    { x: 45, y: 16},
    { x: 45, y: 20},
    { x: 45, y: 21},
    { x: 45, y: 22},
    
    { x: 46, y: 16},
    { x: 47, y: 16},
    { x: 48, y: 16},
    { x: 49, y: 16},
    { x: 50, y: 16},

    { x: 46, y: 22},
    { x: 47, y: 22},
    { x: 48, y: 22},
    { x: 49, y: 22},
    { x: 50, y: 22}
  ],
  4: [
    { x: 21, y: 14 },
    { x: 22, y: 14 }
  ]
}

export default {
  data () {
    return {
      mapSize: [80, 60],
      start: { x: 20, y: 18 },
      end: { x: 49, y: 18 },
      animationDelay: {},
      blockArr: [
        blocksMap[1],
        [].concat(blocksMap[1], blocksMap[2]),
        [].concat(blocksMap[1], blocksMap[2], blocksMap[3]),
        [].concat(blocksMap[1], blocksMap[2], blocksMap[3], blocksMap[4])
      ],
      blocks: [],
      finder: null,
      grids: [],

      // block options
      blockOptions: [
        { label: '障碍物1', value: 0 },
        { label: '障碍物2', value: 1 },
        { label: '障碍物3', value: 2 },
        { label: '障碍物4', value: 3 }
      ]

      // options
      // mapSizeOptions: [
      //   { label: '100 * 100', value: 100 },
      //   { label: '200 * 200', value: 200 },
      //   { label: '500 * 500', value: 500 },
      //   { label: '1000 * 1000', value: 1000 },
      //   { label: '2000 * 2000', value: 2000 },
      //   { label: '5000 * 5000', value: 5000 }
      // ]
    }
  },
  mounted () {
    this.initial()
  },
  methods: {
    
    initial () {
      this.blocks = this.blockArr[0]
      this.initMap()
    },

    initMap () {
      const finder = this.finder = new findjs({
        mapSize: this.mapSize,
        blocks: this.blocks,
        start: this.start,
        end: this.end,
        onFind: this.onFind,
        onPath: this.onPath
      })
      this.grids = finder.getGrids()
    },

    changeBlocks (index) {
      this.blocks = this.blockArr[index]
      this.finder.setBlocks(this.blocks)
      this.grids = this.finder.getGrids()
    },

    setPoint (point, value) {
      if (this.finder.isStartPoint(point) || this.finder.isEndPoint(point)) {
        return
      }
      const { x, y } = point
      this.grids[y].splice(x, 1, value)
      this.animationDelay[`${y}-${x}-${value}`] = Object.keys(this.animationDelay).length
    },

    onFind (point) {
      this.setPoint(point, 4)
    },

    onPath (point) {
      setTimeout(() => {
        !this.finder.isStartPoint(point) && !this.finder.isEndPoint(point) && this.setPoint(point, 5)
      }, Object.keys(this.animationDelay).length * 15 + 100)
    },

    changeMapSize (val) {
      this.mapSize = [val, val]
    },

    enter (el, done) {
      const value = +el.dataset.value
      const grid = el.dataset.grid
      const step = 15
      if (value === 4 || value === 5) {
        let delay = this.animationDelay[grid] * step
        value === 5 && el.setAttribute('class', `grid grid-4`)
        setTimeout(() => {
          delete this.animationDelay[grid]
          el.setAttribute('class', `grid grid-enter grid-${value}`)
          done()
        }, delay)
      } else {
        el.setAttribute('class', `grid grid-${value}`)
        done()
      }
    },
    
    findPath () {
      this.grids = this.finder.getGrids()
      this.animationDelay = {}
      this.finder.calculate()
    },
    
  }
}
</script>

<style>
.content {
  width: 100%;
}
.tool {
  padding: 10px;
}
.tool .label {
  display: inline-block;
  padding: 0 10px 0 0;
  margin-right: 50px;
}
.tool .label span {
  margin-right: 10px;
}
.map {
  width: 1000px;
  display: grid;
  grid-gap: 2px;
}
.map .grid {
  background: #f5f5f5;
  padding-top: 100%;
}
.map .grid-1 {
  background: blue;
}
.map .grid-5 {
  background: #44d244;
  transform-origin: center center;
}
.map .grid-2 {
  background: red;
}
.map .grid-4 {
  background: yellow;
  transform-origin: center center;
}
.map .grid-3 {
  background: #666;
}

.grid-enter {
  transition: background .3s ease-in-out;
}


</style>
