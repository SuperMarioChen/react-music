import React, { Component } from 'react'
import servers from '../server'
import {Icon} from 'antd-mobile'
export let getDataComponent = function (serverName,params={}) {
  return function (Component) {
    return class componentName extends Component {
      constructor(props) {
        super(props);
        this.state = {
          data:{},
          loading: true
        };
      }
      componentDidMount() {
        console.log('123',this.props)
        // 找到请求的方法
        let method = servers[serverName];
        if (!method){
          throw new Error('请求的方法不存在，请检测传入的参数')
        }
        // 声明变量存一下参数params
        let p = params;
        // 如果params是函数，给函数传入props，上面有match history location
        // 函数要返回一个对象，对象就是发送给后端的参数
        if (typeof params === 'function'){
          p = params(this.props)//传到请求数据传函数的组件中 获取到id 并传到对应的获取数据函数中
          console.log(p)//{rankid: "6666"}
        }
        servers[serverName](p).then(({data}) => {
          console.log()
          this.setState({
            
            data,
            loading: false
          })
        })
      }
      render() {
        return (
          
          this.state.loading 
            ? <Icon type="loading"></Icon> 
            : <Component data={this.state.data} {...this.props}/>
        )
      }
    }
  }
}

/* export default getDataComponent('getNewSongs')(NewSong)
export default getDataComponent('getRanklist')(Rank) */




