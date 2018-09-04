import React, { Component } from 'react'
import "./iyirc.css"
import {parseLyric} from './format'

export default class Lyrcc extends Component {
  //想从playbottom中传过一个回掉函数  在这个执行改变playbottom中this.state.isShowPlayer 
  constructor(props){
    super(props)
    this.state={
      currentIndex:0,
      n:'',
      m:0,
      rcArr : parseLyric(this.props.playgc),
      p:0
    }
  }
 
  componentDidMount(){
   this.setState({
    m : Math.round(this.box.clientHeight/this.p.clientHeight/2) - 2,
    p:this.p.clientHeight
   })
  
  }
   //上下首更新歌词
  componentWillReceiveProps(){
    this.setState(
      {
        rcArr : parseLyric(this.props.playgc),
      }
    )
    for( var i = 0; i < this.state.rcArr.length; i++ ){
      if(this.props.currentTime >this.state.rcArr[i][0]){
        this.setState({
          currentIndex :i
        })
        //`-${i}rem`
      }

    }
    if(this.state.currentIndex >this.state.m){
      this.setState({
        n:`-${(this.state.currentIndex-this.state.m)*this.state.p}px`
      })
    }
    
  }
  render() {
    
    
    return (
      <div className="m-lyric-area" 
       
        ref={(box) => this.box = box }  
      >
      <div id="goback" onClick={this.props.goback}><img src={require('../../img/goback.png')}/></div>
        <div className="m-lyric"
           style={{top:this.state.n}}
        >
          {
            this.state.rcArr.map((item,index)=>{
              return <p key={index}
                        ref={(p) => this.p = p}
                        style={{color:(index===this.state.currentIndex) ? "#d1c90e" : ""}}
                    >{item[1]}</p>
            })
          }
        </div>
        
      </div>
    )
  }
}
