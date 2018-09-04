import React, { Component } from 'react'

import './search.css'
import Searchlist from './searchlist'
import SongList from '../comm/songList'
import jsonp from 'jsonp'

 class Rearch extends Component {
     constructor(props){
        super(props)
        this.state={
            hotlist:false,
            songlist:false,
            total:''
           
        }
     }
     componentDidMount(){
        this.input.focus()
        
        jsonp('http://mobilecdn.kugou.com/api/v3/search/hot',
        {
            param: `format=jsonp&plat=0&count=30&callback`
        },
        (a,data)=>{
           
            this.setState({
                hotlist:data.data.info
            })
            
        })
    }
    
    //点击热门内容跟点击搜索一样 把keyword换成对应的 item中的keyword
    //点击搜索拿到搜索数据
    sousuo=()=>{
        jsonp('http://mobilecdn.kugou.com/api/v3/search/song',
        {
            param:`format=jsonp&keyword=${this.input.value}&page=1&pagesize=30&showtype=1&callback`
        },(a,data)=>{
            console.log(data)
            this.setState({
                hotlist:false,
                total:data.data.total,
                songlist:data.data.info
            })
        }
        )
    }
    //http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword={}&page=1&pagesize=30&showtype=1&callback
    //点击hot列表获取歌单
    hotitem=(name)=>{
        console.log('a')
        jsonp('http://mobilecdn.kugou.com/api/v3/search/song',{
                param:`format=jsonp&keyword=${name}&page=1&pagesize=30&showtype=1&callback`
            },(a,data)=>{
                console.log(data.data.total)
                this.setState({
                    hotlist:false,
                    songlist:data.data.info,
                    total:data.data.total
                })
            }
        )
        
    }
    //拿到热歌数据渲染 页面   点搜索重新重新请求数据渲染页面
    render() {
        return (
            <div>
                
                <div className="searchname">
                    <input 
                        ref={(input) => this.input = input } 
                        placeholder="歌手/歌名/拼音"
                        className="search-input"
                        />
                    <button 
                        onClick={this.sousuo}
                        className="search-btn"
                        >搜索</button>
                </div>
                {this.state.hotlist?<div className="zuijinhot">最近热门</div>:null}
                {
                    
                    this.state.hotlist?
                    this.state.hotlist.map(item=>{
                        return(
                            <Searchlist 
                                key={item.sort} 
                                item={item}
                                hotitem={this.hotitem}
                                ></Searchlist>
                        )  
                    }):null
                }
                {this.state.songlist?<div className="search-result">共有{this.state.total}条结果</div>:null}
                {
                    this.state.songlist?
                            <SongList 
                                songList={this.state.songlist}
                            ></SongList>
                    :null
                }
            </div>
            
            //搜索点击出来这个页面 keyword后面的就是搜索内容
            //mobiles.service.kugou.com/api/v3/search/hot?format=jsonp&plat=0&count=30&callback=kgJSONP065356759
        )
    }
}
export default Rearch