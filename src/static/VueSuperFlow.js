let nodeList = [{
  'id': '1',
  'width': 160,
  'height': 80,
  'coordinate': [0, 260],
  'meta': {
    'name': '节点1',
    'desc': '111111'
  }
},
{
  'id': '2',
  'width': 160,
  'height': 80,
  'coordinate': [360, 80],
  'meta': {
    'name': '节点2-1',
    'desc': '111111'
  }
},
{
  'id': '22',
  'width': 160,
  'height': 80,
  'coordinate': [360, 260],
  'meta': {
    'name': '节点2-2',
    'desc': '111111'
  }
},
{
  'id': '23',
  'width': 160,
  'height': 80,
  'coordinate': [360, 440],
  'meta': {
    'name': '节点2-3',
    'desc': '111111'
  }
},
{
  'id': '3',
  'width': 160,
  'height': 80,
  'coordinate': [720, 80],
  'meta': {
    'name': '节点3',
    'desc': '111111'
  }
},
{
  'id': '4',
  'width': 160,
  'height': 80,
  'coordinate': [1080, 80],
  'meta': {
    'name': '节点4',
    'desc': '111111'
  }
}]

let linkList = [
  {
    'id': '1',
    'startId': '1',
    'endId': '2',
    'startAt': [160, 40],
    'endAt': [0, 40],
    'meta': {
      desc: '描述'
    }
  },
  {
    'id': '21',
    'startId': '1',
    'endId': '22',
    'startAt': [160, 40],
    'endAt': [0, 40],
    'meta': {
      desc: '描述'
    }
  },
  {
    'id': '22',
    'startId': '1',
    'endId': '23',
    'startAt': [160, 40],
    'endAt': [0, 40],
    'meta': {
      desc: '描述'
    }
  },
  {
    'id': '2',
    'startId': '2',
    'endId': '3',
    'startAt': [160, 40],
    'endAt': [0, 40],
    'meta': {
      desc: '描述'
    }
  },
  {
    'id': '2',
    'startId': '2',
    'endId': '3',
    'startAt': [160, 40],
    'endAt': [0, 40],
    'meta': {
      desc: '描述'
    }
  },
  {
    'id': '3',
    'startId': '4',
    'endId': '3',
    'startAt': [0, 40],
    'endAt': [160, 40],
    'meta': {
      desc: '描述'
    }
  }
]

const drawerType = {
  node: 0,
  link: 1
}

export {
  drawerType,
  nodeList,
  linkList,
}
