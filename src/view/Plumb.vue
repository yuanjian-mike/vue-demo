<template>
  <div id="container">
    <div v-for="item in nodeList" :key="item.id" :id="item.id" style="margin-right: 200px; margin-bottom: 20px; text-align: center; float: left; width: 160px; height: 60px">
      <el-card>
        {{item.name}}
      </el-card>
    </div>
  </div>
</template>

<script>
  import jsPlumb from 'jsplumb'
  window.jsplumb = jsPlumb.jsPlumb;
  export default {
    name: 'stageList',
    data() {
      return {
        plumb: null,
        nodeList: [{
          "id": 1,
          "name": "节点1"
        }, {
          "id": 2,
          "name": "节点2"
        }, {
          "id": 3,
          "name": "节点3"
        }, {
          "id": 4,
          "name": "节点4"
        }, {
          "id": 5,
          "name": "节点5"
        }, {
          "id": 6,
          "name": "节点6"
        }],
        linkList: [{
          startId: '1',
          endId: '2'
        }, {
          startId: '3',
          endId: '2'
        }, {
          startId: '4',
          endId: '5'
        }, {
          startId: '5',
          endId: '6'
        }, {
          startId: '6',
          endId: '2'
        }]
      }
    },
    created() {
      this.plumb = jsplumb.getInstance({
        Container: 'container', // 选择器
        EndpointStyle: { radius: 0.11, fill: '#fff' }, // 端点样式
        // PaintStyle: { stroke: '#00ff00', strokeWidth: 2 }, // 绘画样式，默认8px线宽  #456
        // HoverPaintStyle: { stroke: '#1E90FF' }, // 默认悬停样式  默认为null
        // EndpointHoverStyle: { fill: '#F00', radius: 6 }, // 端点悬停样式
        // ConnectionOverlays: [ // 此处可以设置所有箭头的样式，因为我们要改变连接线的样式，故单独配置
        //   ['Arrow', { // 设置参数可以参考中文文档
        //     location: 1,
        //     length: 10,
        //     paintStyle: {
        //       stroke: '#496def',
        //       fill: '#496def'
        //     }
        //   }]
        // ],
        Connector: ['Straight', { gap: 1 }], // 要使用的默认连接器的类型：直线，折线，曲线等
        DragOptions: { cursor: 'crosshair', zIndex: 2000 }
      })
    },
    mounted() {
      this.$nextTick(function () {
        // 页面渲染完成后绘制连接线
        this.initData()
      })
    },
    methods: {
      initData() {
        const ins = this.plumb
        ins.getAllConnections();
        ins.batch(() => {
          this.connectionAll()
        })
        this.switchContainer(true, true, false)
      },
      connectionAll() { // 创建连接线
        const ins = this.plumb
        ins.ready(() => {
          for (let i = 0; i < this.linkList.length; i++) {
            const conn = this.linkList[i]
            const connection = ins.connect({
              source: conn.startId,
              target: conn.endId,
              anchor: ["RightMiddle", "Left"],
              overlays: [['Arrow', {
                width: 12,
                length: 10,
                location: 1,
                paintStyle: {
                  stroke: '#496def',
                  fill: '#496def'
                }
              }]]
            })
            connection.setPaintStyle({ stroke: '#496def', strokeWidth: 2 })
          }
        })
      },
      switchContainer(target, source, draggable) {
        const elem = document.getElementsByName('cell')
        const ins = this.plumb
        ins.setSourceEnabled(elem, source)
        ins.setTargetEnabled(elem, target)
        ins.setDraggable(elem, draggable) // 是否支持拖拽
      }
    }
  }
</script>
