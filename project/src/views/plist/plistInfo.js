import React, { Component } from 'react'
import { getPlistInfo} from '../../server/plist'
import SongList from '../comm/songList'
import './plist.css'
 class PlistInfo extends Component {
   constructor(props){
    super(props)
    this.state={
      data:""
    }
   }
   //没用方法获取数据挂载完获取的数据
  componentDidMount() {
    getPlistInfo({ id: this.props.match.params.id}).then(({data}) => {
      console.log(data)
      this.setState({
        data:data
      },function() {
        console.log(this.state.data.list.list.info)
      })
    })
  }
  render() {
    let {match} = this.props;
    
    //不是包装出来的 自己props上有match
    
    console.log(123,match.params.id)
    return (
        this.state.data?
                      <div >
                          <img className="plist-img" src={this.state.data.info.list.imgurl.replace('{size}',400)}/>
                          <SongList songList={this.state.data.list.list.info} ></SongList>
                      </div>  
                      :<div>加载中</div>
    
        
      
    )
  }
}
export default PlistInfo
