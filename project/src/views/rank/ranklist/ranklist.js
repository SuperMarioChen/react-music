import React, { Component } from 'react'
import { getDataComponent } from '../../../components/getDataComponent'

import SongList from '../../comm/songList'
import './ranklist.css'

class Ranklist extends Component {
    render() {
        //拿到数据渲染本页面，然后把数据再传给songlist  在songlist把hash还有songList传到redux中
        //playerBottom.js中利用hash获取歌播放
        console.log(this.props.data)
        let {info,data} = this.props.data;
        return (
            <div className="ranklist">
                <img className="ranklistimg" src={info.bannerurl.replace('{size}',400)}/>
                <SongList songList={data} ></SongList>
            </div>
        )
    }
}
export default  getDataComponent('getrankInfo',function(props){
         return { rankid: props.match.params.id } //把当前地址栏后面的id传到获取数据函数
       })(Ranklist);


