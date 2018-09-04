import React, { Component } from 'react'
import { List } from 'antd-mobile';
import './rank.css'
import {withRouter} from 'react-router-dom'
import { getDataComponent } from '../../components/getDataComponent'
const Item = List.Item;

 class Rank extends Component {
  
  render() {
    
    let {data}  = this.props.data;
    return (
      <div className="rank">
        <List>
          {
            data.map((item) => {
              return (
                <Item
                  key={item.id}
                  thumb={item.imgurl.replace('{size}',400)}
                  arrow="horizontal"
                  onClick={() => {
                    this.props.history.push(`rank/info/${item.rankid}`)
                   }}
                >{item.rankname}</Item>
              )
            })
          }
          
        </List>
        
        
      
      </div>
    )
  }
}
export default withRouter(getDataComponent('getRankList')(Rank))