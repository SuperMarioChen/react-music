import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './player.css'

import {connect} from 'react-redux'
import { getSongMp3,getRc } from '../../server/searchMp3'

import Player from './player/player'



/* 
  拿歌曲：
    1. 在songList这个组件中点击了歌曲，点击那个歌曲就播放哪一个
      componentWillReceiveProps在这里接收props，去发送
    2. 点击上一曲下一曲
        在playBottom组件中就可以完成

*/

class PlayBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 1,
      currentTime:0,
      isShowPlayer: false,
      index: 0,  // 记录当前播放到哪一首歌曲
      isPlay: true,  // 记录歌曲是否在播放
      playInfo: {
        //imgUrl: ''
      }, // 要播放个去的信息
      playgc:''
    };

    this.audio = React.createRef();
  }
  //在下面props将要更新时候执行
  getSongInfoMethodByHash = (hash) => {
    let index = this.props.songList.findIndex(item => item.hash === hash);
    if (hash) {
      //利用songlist传到redux中的hash发送请求   用getSongMp3组建发送请求 请求到对应的歌
      //以后的上下首根据list index来进行
      //当重新点击歌重新赋值  hash和list
      //根据hash取数据
      getSongMp3({ hash }).then(({ data }) => {
       
        this.setState({
          playInfo: data,
          index: index,
          isPlay: true,
        }),
        getRc({
           hash:hash,keyword: this.state.playInfo.songName
        }).then((data)=>{
        
          this.setState(
            {
              playgc:data.data
            }
          )
        })
      })
      
    }
    
      
    

  }

  componentDidMount() {
    // 监听audio事件
    let audio = this.audio.current;
    //audio.addEventListener('')
  }

  // 只有外界出给你的props更新了，就会触发，组件内部状态变了，不触发
  componentWillReceiveProps(nextProps) { 
    // this.props 是更新之前的
    // 更新之后的是参数 nextProps
    //console.log('props更新了')
    // props更新的时候，需要向后端发送请求，拿到歌曲数据

    let { hash } = nextProps;
    this.getSongInfoMethodByHash(hash)

  }

  // 下一首
  nextSong = () => {
    let index = this.state.index;
    index++;
    if(index > this.props.songList.length - 1){
      index = 0;
    }
    // 下一首歌曲的hash
    let hash = this.props.songList[index].hash;
    this.getSongInfoMethodByHash(hash)
  }

  // 上一首
  prevSong = () => {
   
    let index = this.state.index;
    index--;
    if (index < 0) {
      index = this.props.songList.length - 1;
    }
    // 下一首歌曲的hash
    let hash = this.props.songList[index].hash;
    this.getSongInfoMethodByHash(hash)
  }

  // 播放或暂停
  playOrPause =() => {
    let audio = this.audio.current;
    console.dir(audio)
    if (audio.paused){
      audio.play();
    }else{
      audio.pause();
    }

    this.setState({
      isPlay: !this.state.isPlay
    })
  }

  // 音频加载完成
  onLoadedMetadata = () => {
    console.log('加载完成')
    this.setState({
      duration: this.audio.current.duration
    })
  }

  // 位置发生变化
  ontimeupdate = () => {
    // console.log('正在播放')
    this.setState({
      currentTime: this.audio.current.currentTime
    })
  }

  // 在子级的子级中控制currentTime
  uodateCurrentTime = (t) => {
    this.setState({
      currentTime: t
    })

    this.audio.current.currentTime = t;
  }
  //歌词播放页面返回
  goback=()=>{
    this.setState({
      isShowPlayer:false
    })
  }
 
  
  render() {
    let { playInfo} = this.state;
    // console.log(playInfo)
    /* console.log('当前播放的歌曲下表为', this.state.index)
    console.log('总时间', this.state.duration)
    console.log('当前播放时间', this.state.currentTime) */
    //这个组件靠hash有就挂载 没有就不挂   根据redux中hash值改变而改变
    return this.props.hash ? ReactDOM.createPortal(//一个可以摆脱最大div 把虚拟dom挂载在页面其他地方
      
      <div className="play-bottom" onClick={() => {
        
      }}>
      {/* 搜一波audio标签 */}
        <audio 

          onLoadedMetadata={this.onLoadedMetadata}
          onTimeUpdate={this.ontimeupdate}
          onEnded={this.nextSong}
          ref={this.audio} 
          autoPlay src={playInfo.url}
        ></audio>
        <div className="play-left" onClick={() => {
          this.setState({
            isShowPlayer: true
          })
        
        }}>
            <img className="img" src={playInfo.imgUrl && playInfo.imgUrl.replace('{size}',240)} alt="加载中" />
            <p>
            <span>{playInfo.songName}</span>
            
            <span>{playInfo.singerName}</span>
            </p>
        </div>
          <div className="play-right">
          
            <div className="iconfont  icon-audio_last_step prev-song"
            onClick={this.prevSong}
            ><img src={require('../img/pro.png')}/></div>
            <div
              onClick={this.playOrPause}
            >{this.state.isPlay?<img src={require('../img/play.png')}/>:<img src={require('../img/stop.png')}/>}</div>
            <div 
              
              className="iconfont  icon-audio_next_step next-song"
              onClick={this.nextSong}
            ><img src={require('../img/next.png')}/></div>
          </div>
          {
            this.state.isShowPlayer 
              ? <Player 
                  duration={this.state.duration}
                  currentTime={this.state.currentTime}
                  playgc={this.state.playgc}
                  goback={this.goback}
                  playOrPause={this.playOrPause} 
                  isPlay={this.state.isPlay}
                  nextSong={this.nextSong}
                  duration={this.state.duration}
                  currentTime={this.state.currentTime}
                  uodateCurrentTime={this.uodateCurrentTime}
                  prevSong={this.prevSong}
                /> 
              : null
          }
          
        </div>
    ,document.body) : null;
  }
}

function mapStateToprops(state) {
  return {
    hash: state.hash,
    songList: state.songList
  }
}

export default connect(mapStateToprops)(PlayBottom);
