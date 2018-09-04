import React, { Component } from 'react'
import { getPlist } from '../../server'
import { List } from 'antd-mobile';
import './plist.css'
import {withRouter} from 'react-router-dom'
import { getDataComponent } from '../../components/getDataComponent'

const Item = List.Item;
const Brief = Item.Brief;

 class Plist extends Component {
   constructor(props) {
     super(props);
     this.state = {
       data:{
         data:[]
       }
     };
   }
  componentDidMount(){
    getPlist().then(({data}) => {
     this.setState({
       data
     })
    })
  }
  render() {
    let { data } = this.state.data
    console.log(this.state.data.data)
    return (
      
          
          <div className="plist-list">
            <List  className="my-list">
            {
              data.map(item=>{
                return(
                  <div className="plistlist-img">
                    <Item
                      key={Number(item.specialid)+Math.round(Math.random()*10)
                      }
                      arrow="horizontal"
                      thumb={item.imgurl.replace('{size}',240)}
                      multipleLine
                      onClick={() => {
                        this.props.history.push(`plist/list/${item.specialid
                        }`)
                      }}
                    >
                      {item.intro} <Brief>{item.playcount}</Brief>
                    </Item>
                  </div>
                )
              })
            }
              
              
            </List>
          </div>
        

    )
  }
}

export default withRouter(getDataComponent('getPlist')(Plist)); 