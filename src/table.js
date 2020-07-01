import React from 'react';
import './table.css';

class Table extends React.Component {
    state = {
        asc: true,
        page:1,
        lastData:0,
        nextData:5,
        pageCount:5
    }
 
    sortData = (dataSource, dataKey) => {
        if (this.state.asc) {
            dataSource.sort(function (a, b) {
                if (a[dataKey] > b[dataKey]) {
                    return -1;
                }
                if (a[dataKey] < b[dataKey]) {
                    return 1;
                }
                return 0;
            });
            this.setState({ asc: !this.state.asc })
        }
        else {
            dataSource.sort(function (a, b) {
                if (a[dataKey] < b[dataKey]) {
                    return -1;
                }
                if (a[dataKey] > b[dataKey]) {
                    return 1;
                }
                return 0;
            });
            this.setState({ asc: !this.state.asc })
        }
    }

    changePage = (pageNo) =>{
         this.setState({page:pageNo,nextData:(pageNo * 5),lastData:(pageNo * 5) - 5})
    }
    getData = (dataSource) => {
        const {lastData,nextData} = this.state;
        const data = []
        dataSource.forEach((element,i) => {
           if( i > lastData && i <= nextData){
               data.push(element)
           }
        });
        return data
    }
    render() {
        const { dataSource, columns } = this.props;
        const { page } = this.state;
        const pages = [];
        for (let i = 0; i < (dataSource.length / 5); i++) {
               pages.push(i+1)   
        }
        return (
            <>
                <table>
                    <thead>
                      <tr>
                        {
                            columns.map((data, index) => (
                                <th key={index}>{data.title} {data.title !== "Id" && <i className="fa fa-chevron-up" onClick={() => this.sortData(dataSource, data.key)} aria-hidden="true" />}</th>
                                ))
                            }
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.getData(dataSource).map((data, index) => (
                                <tr key={index}>
                                    {columns.map((col, i) => (
                                        <td key={i}>{data[col.key]}</td>
                                    ))}
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </table>
                <div className="pagination">
                   <div className="page" onClick={()=> {if(page > 1){this.changePage(this.state.page - 1)}}}><i className="fa fa-chevron-left" aria-hidden="true"></i></div>
                   {
                       pages.map((pageNo,i)=>(
                       <div className={page === pageNo ? "page active" : "page" } onClick={()=>this.changePage(pageNo)} key={i}>{pageNo}</div>
                       ))
                   }
                   <div className="page" onClick={()=> {if(page < pages.length){this.changePage(this.state.page + 1)}}}><i className="fa fa-chevron-right" aria-hidden="true"></i></div>
                </div>
            </>
        );
    }
}

export default Table;