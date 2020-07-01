import React from 'react';
import axios from 'axios';
import Table from './table';
import './home.css';
class Home extends React.Component {
constructor(){
super()  
this.state={
    tableData:[],
    searchtext:""
  }
this.inputRef = React.createRef();  
}
componentDidMount= async ()=>{
 let data = await axios.get('http://localhost:3000/shipments')
 this.setState({tableData:data.data})
 this.inputRef.current.focus();
}
searchText = (e) => {
 this.setState({searchtext:e.target.value})
 e.preventDefault();
}
render(){
    const {tableData,searchtext} = this.state;
    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Mode',
          dataIndex: 'mode',
          key: 'mode',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Origin',
          dataIndex: 'origin',
          key: 'origin',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Destination',
          dataIndex: 'destination',
          key: 'destination',
        }
      ];
    return(
        <div className="homeDiv">
          <div className="tableSearch">
         <input onChange={e => this.searchText(e)} placeholder="Search here..."  ref={this.inputRef} value={searchtext} type="search" /> 
          <i className="fa fa-search searchIcon" aria-hidden="true"></i>
          </div>
        <div className="dataTable">
        <Table dataSource={searchtext === "" ? tableData : tableData.filter(x =>  Object.values(x).map(x => ( Array.isArray(x) === false ? x.toLowerCase() : x)).includes(searchtext.toLowerCase()))} columns={columns} />
        </div> 
        
        </div>
    );
}
}

export default Home;