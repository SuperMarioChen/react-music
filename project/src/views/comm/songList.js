import React, { Component } from 'react'
import { List } from 'antd-mobile';
import {connect} from 'react-redux'
const Item = List.Item;


class Songlist extends Component {
  static defaultProps = {
    songList:[]
  }
  render() {
    console.log(this.props.songList)
    return (
      <div className="songlist">
        <List className="my-list">
          {
            this.props.songList.map((item) => {
              return (
                <Item
                  key={item.hash}
                  extra={<i style={{ fontSize: '1rem' }}
                    className="iconfont icon-xiazai"></i>}
                  onClick={() => { 
                    //每次到了Songlist组建葛明对应的hash和songList放到redux中
                    //是因为有的用到的Songlist离getSongMp3组件太远所以用redux
                    //每一个item都有一个hash 和本个歌曲列表
                    //点击那个把哪一个hash发送到 redux
                    this.props.dispatch({ type: 'updateHash', hash: item.hash })
                    this.props.dispatch({ type: 'updateSongList', songList: this.props.songList})
                  }}
                >{item.filename}</Item>
              )
            })
          }

        </List>
      </div>
    )
  }
}
export default connect()(Songlist)