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
      :link-addable="false"
      :link-editable="false"
      :has-mark-line="false"
      :node-list="nodeList"
      :link-list="linkList"
      :origin="origin"
      :graph-menu="graphMenuList"
      :node-menu="nodeMenuList"
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
  </div>
</template>

<script>
  import {nodeList, linkList} from '../static/VueSuperFlow.js'
  export default {
    data() {
      return {
        dialogVisible: false,
        nodeList: [], // 节点列表
        linkList: [], // 连线列表
        origin: [0, 0], // graph 的二维坐标系原点
        graphMenuList: [], // 对 graph 的右键菜单列表配置
        nodeMenuList: [], // node 右键菜单配置
      }
    },
    created() {
      this.nodeList = nodeList
      this.linkList = linkList
    },
    methods: {

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
