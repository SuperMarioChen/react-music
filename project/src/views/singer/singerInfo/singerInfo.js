import React, { Component } from 'react'
import { getDataComponent } from '../../../components/getDataComponent'
import SongList from '../../comm/songList'
import './singerinfo.css'
class SingerInfo extends Component {
  render() {
    console.log('info',this.props)
    let {info,data} = this.props.data;

    return (
      <div className="singerinfo">
        <img 
          style={{marginTop:'-2rem'}}
          alt={info.singername} 
          src={info.imgurl.replace('{size}',400)} />
        <div style={{ marginTop: '-2rem' }}>
        {/* 新歌还有和歌手信息都把data 传给SongList*/}
          <SongList songList={data} ></SongList>
        </div>
      </div>
    )
  }
}

export default getDataComponent('getSingerInfo',function(props){
  return {
    singerid: props.match.params.id
  }
})(SingerInfo);