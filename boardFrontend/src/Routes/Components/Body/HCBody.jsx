import React, { Component,PureComponent } from "react";
import TableReturn from "../extra/TableReturn.jsx";
import 'react-toastify/dist/ReactToastify.css';
export default class HCBody extends PureComponent 
 {
    render() {
    let i=0,j=0;
        return (
            <div>
                <div className="scroll">
                    {
                        this.props.tables.map((table,index)=>{
                            i=j;
                            j=j+4;
                            if(this.props.tables.length>j-4)
                            {
                                return(
                                    <TableReturn elements={this.props.tables.slice(i, j)}/>
                                )
                            }
                        })
                    }
                </div>
            </div>
        );
    }
}


 