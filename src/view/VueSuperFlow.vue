<!--
 * User: CHT
 * Date: 2020/5/27
 * Time: 9:52
-->
<template>
  <div class="super-flow-base-demo">
    <!--
      draggable 	      Boolean 	    true 	      是否开启节点拖拽
      linkAddable 	    Boolean 	    true 	      是否开启快捷创建 link
      linkEditable 	    Boolean 	    true 	      link 是否可编辑
      hasMarkLine 	    Boolean 	    true 	      是否开启拖拽辅助线
      markLineColor 	  String 	      #55abfc 	  辅助线颜色
      origin 	          Array 	      [0, 0] 	    graph 的二维坐标系原点
      nodeList 	        Array 	      [] 	        初始化节点列表
      linkList 	        Array 	      [] 	        初始化连线列表
      graphMenu 	      Array 	      [] 	        graph 的右键菜单列表配置
      nodeMenu 	        Array 	      [] 	        node 右键菜单列表配置
      linkMenu 	        Array 	      [] 	        link 右键菜单配置
      enterIntercept 	  Function 	    () => true 	创建连线进入节点限制
      outputIntercept   Function 	    () => true 	节点生成连线限制函数
      linkDesc 	        Function 	    null 	      生成 link 定制描述文字
      linkStyle 	      Function 	    null 	      根据 link 定制样式
      linkBaseStyle 	  Object 	      {} 	        连线默认样式配置
     -->
    <super-flow
      ref="superFlow"
      :draggable="true"
      :link-addable="true"
      :link-editable="true"
      :has-mark-line="true"
      mark-line-color="#55abfc"
      :node-list="nodeList"
      :link-list="linkList"
      :origin="origin"
      :graph-menu="graphMenuList"
      :node-menu="nodeMenuList"
      :link-menu="linkMenuList"
      :link-desc="linkDesc"
    >
      <template v-slot:node="{meta}">
        <el-card>
          {{meta.name}}
        </el-card>
      </template>
    </super-flow>
    <div>
      <el-button type="primary" @click="dialogVisible = true">数据展示</el-button>
    </div>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
      style="text-align: left">
      <pre>
        body {
          color:red;
        }
      </pre>
      <pre>
        {{nodeList}}
      </pre>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="drawerConf.title"
      :visible.sync="drawerConf.visible"
      :close-on-click-modal="false"
      width="500px">
      <el-form
        @keyup.native.enter="settingSubmit"
        @submit.native.prevent
        v-show="drawerConf.type === drawerType.node"
        ref="nodeSetting"
        :model="nodeSetting">
        <el-form-item
          label="节点名称"
          prop="name">
          <el-input
            v-model="nodeSetting.name"
            placeholder="请输入节点名称"
            maxlength="30">
          </el-input>
        </el-form-item>
        <el-form-item
          label="节点描述"
          prop="desc">
          <el-input
            v-model="nodeSetting.desc"
            placeholder="请输入节点描述"
            maxlength="30">
          </el-input>
        </el-form-item>
      </el-form>
      <el-form
        @keyup.native.enter="settingSubmit"
        @submit.native.prevent
        v-show="drawerConf.type === drawerType.link"
        ref="linkSetting"
        :model="linkSetting">
        <el-form-item
          label="连线描述"
          prop="desc">
          <el-input
            v-model="linkSetting.desc"
            placeholder="请输入连线描述">
          </el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          @click="drawerConf.cancel">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="settingSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {drawerType, nodeList, linkList} from '../static/VueSuperFlow.js'
  export default {
    data() {
      return {
        dialogVisible: false,
        nodeList: [], // 节点列表
        linkList: [], // 连线列表
        origin: [0, 0], // graph 的二维坐标系原点
        graphMenuList: [
          [
            {
              label: '节点',
              selected: (graph, coordinate) => {
                const id = "asdasd"
                graph.addNode({
                  'id': id,
                  'width': 160,
                  'height': 80,
                  'coordinate': coordinate,
                  'meta': {
                    'name': '节点N',
                    'desc': '111111'
                  }
                })
              }
            }
          ],
          [
            {
              label: '打印数据',
              selected: (graph, coordinate) => {
                console.log(JSON.stringify(graph.toJSON(), null, 2))
                this.$message('已在控制台打印')
              }
            },
            {
              label: '全选',
              selected: (graph, coordinate) => {
                graph.selectAll()
              }
            }
          ]
        ], // 对 graph 的右键菜单列表配置
        nodeMenuList: [ // node 右键菜单配置
          [
            {
              label: '删除',
              disable: false,
              hidden(node) {
                return node.meta.prop === 'start'
              },
              selected(node, coordinate) {
                node.remove()
              }
            }
          ],
          [
            {
              label: '编辑',
              selected: (node, coordinate) => {
                this.drawerConf.open(drawerType.node, node)
              }
            }
          ]
        ],
        linkMenuList: [
          [
            {
              label: '删除',
              disable: false,
              selected: (link, coordinate) => {
                link.remove()
              }
            }
          ],
          [
            {
              label: '编辑',
              disable: false,
              selected: (link, coordinate) => {
                this.drawerConf.open(drawerType.link, link)
              }
            }
          ]
        ],
        linkSetting: {
          desc: ''
        },
        nodeSetting: {
          name: '',
          desc: ''
        },
        drawerType: drawerType,
        drawerConf: {
          title: '',
          visible: false,
          type: null,
          info: null,
          open: (type, info) => {
            const conf = this.drawerConf
            conf.visible = true
            conf.type = type
            conf.info = info
            if (conf.type === drawerType.node) {
              conf.title = '节点'
              if (this.$refs.nodeSetting) this.$refs.nodeSetting.resetFields()
              this.$set(this.nodeSetting, 'name', info.meta.name)
              this.$set(this.nodeSetting, 'desc', info.meta.desc)
            } else {
              conf.title = '连线'
              if (this.$refs.linkSetting) this.$refs.linkSetting.resetFields()
              this.$set(this.linkSetting, 'desc', info.meta ? info.meta.desc : '')
            }
          },
          cancel: () => {
            this.drawerConf.visible = false
            if (this.drawerConf.type === drawerType.node) {
              this.$refs.nodeSetting.clearValidate()
            } else {
              this.$refs.linkSetting.clearValidate()
            }
          }
        },
      }
    },
    created() {

    },
    mounted(id) {
      this.$nextTick(function () {
        this.nodeList = nodeList
        this.linkList = linkList
      })
    },
    methods: {
      linkDesc(link) {
        return link.meta ? link.meta.desc : ''
      },
      settingSubmit() {
        const conf = this.drawerConf
        if (this.drawerConf.type === drawerType.node) {
          if (!conf.info.meta) conf.info.meta = {}
          Object.keys(this.nodeSetting).forEach(key => {
            this.$set(conf.info.meta, key, this.nodeSetting[key])
          })
          this.$refs.nodeSetting.resetFields()
        } else {
          if (!conf.info.meta) conf.info.meta = {}
          Object.keys(this.linkSetting).forEach(key => {
            this.$set(conf.info.meta, key, this.linkSetting[key])
          })
          this.$refs.linkSetting.resetFields()
        }
        conf.visible = false
      }
    }
  }
</script>

<style lang="less">
  .ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;
  }

  .super-flow-base-demo {
    width            : 100%;
    height           : 550px;
    margin           : 0 auto;
    background-color : #f5f5f5;

    .super-flow__node {
      .flow-node {
        > header {
          font-size   : 14px;
          height      : 32px;
          line-height : 32px;
          padding     : 0 12px;
          color       : #ffffff;
        }

        > section {
          text-align  : center;
          line-height : 20px;
          overflow    : hidden;
          padding     : 6px 12px;
          word-break  : break-all;
        }

        &.flow-node-start {
          > header {
            background-color : #55abfc;
          }
        }

        &.flow-node-condition {
          > header {
            background-color : #BC1D16;
          }
        }

        &.flow-node-approval {
          > header {
            background-color : rgba(188, 181, 58, 0.76);
          }
        }

        &.flow-node-cc {
          > header {
            background-color : #30b95c;
          }
        }

        &.flow-node-end {
          > header {
            height           : 50px;
            line-height      : 50px;
            background-color : rgb(0, 0, 0);
          }
        }
      }
    }
  }
</style>
