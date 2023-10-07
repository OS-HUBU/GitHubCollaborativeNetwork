const data = {
  nodes: [
    {id: 1, type: 'web', name: '互联网技术', r: 50, color: 'rgb(255 228 120)', cover: 'https://s1.ax1x.com/2020/08/30/dqpvff.png'},
  ],
  links: []
}

const vueBaseNodes = () => {
  const response = {
    nodes: [
      {id: 46, type: 'vue', name: 'vue', r: 20, color: '#3c5c67', cover: 'https://s1.ax1x.com/2020/08/30/dqSJV1.png'},
    ],
    links: [
      {id: 47, source: 6, type: '技术框架', target: 46},
      {id: 48, source: 6, type: '技术框架1', target: 46},
      {id: 149, source: 6, type: '技术框架212', target: 46},
      {id: 249, source: 6, type: '技术框架222', target: 46},
      {id: 349, source: 6, type: '技术框架22]32', target: 46},
      {id: 417, source: 46, type: '基于', target: 6}
    ],
    menu: {
      'vue': [
        {name: 'vue-router', type: 'vue'},
        {name: 'vue-cli', type: 'vue'},
        {name: 'vuex', type: 'vue'},
        {name: 'axios', type: 'vue'},
      ]
    }
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(response)
    }, 100)
  })
}

const delPromise = function () {
  const response = {
    code: 200
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(response)
    }, 100)
  })
}

const addNodes = () => {
  const response = {
    nodes: [
      {id: 6, type: 'js', name: 'js', r: 20, color: 'white', cover: 'https://s1.ax1x.com/2020/08/31/dXyb0s.th.png'},
      {id: 7, type: 'css', name: 'css', r: 20, color: 'white', cover: 'https://s1.ax1x.com/2020/08/31/dXDcmn.th.png'},
      {id: 8, type: 'html', name: 'HTML', r: 20, color: 'white', cover: 'https://s1.ax1x.com/2020/08/31/dXDPiT.png'}
    ],
    links: [
      {id: 9, source: 1, type: '前端技术', target: 6},
      {id: 10, source: 1, type: '前端技术', target: 7},
      {id: 11, source: 1, type: '前端技术', target: 8}
    ],
    menu: {
      'js': [
        {name: '删除节点', type: 'del', event: {
          type: 'del', source: delPromise
        }},
        {name: 'nodeJS', type: 'nodejs'},
        {name: 'jquery', type: 'jquery'},
        {name: '技术框架', type: 'frame', children: [
         {name: 'vue', type: 'vue', event: {
          type: 'add', source: vueBaseNodes
         }},
         {name: 'React', type: 'react'},
         {name: 'Angular', type: 'angular'},
        ]}, 
      ]
    }
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(response)
    }, 100)
  })
}
