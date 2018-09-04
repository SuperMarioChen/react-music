import React, { Component } from 'react'
import './search.css'
class searchlist extends Component {
    componentDidMount(){
        
    }
    render() {
        console.log(this.props.item.keyword)
        return (
            this.props.item?
            <div className="searchitem"
                onClick={()=>{
                    this.props.hotitem(this.props.item.keyword)
                }}>
                
               {this.props.item.keyword}
            </div>:null
            //每列添加点击事件 jsonp请求数据  替换页面

        )
    }
}
export default searchlist