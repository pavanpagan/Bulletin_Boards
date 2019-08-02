import React, { Component } from "react";
import {Col,Grid,FormControl,Row} from 'react-bootstrap'
import { CardImg,Card, Button, CardTitle, CardText } from 'reactstrap';
import "../assets/css/index.css";
import {Link} from 'react-router-dom';
import {radioChecked2} from 'react-icons-kit/icomoon/radioChecked2';
import { Icon } from "react-icons-kit";
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from "axios";
import api from '../apis/api';
function importAll(r) 
{
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
 const images = importAll(require.context('/home/vrvembassy1/work/Bulletin_Boards/boardServer/uploads', false, /\.(png|jpe?g|svg|JPG)$/));

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = 'http://127.0.0.1:8000';
 class Details extends Component {
     constructor(props)
     {
         super(props);
         this.api=new api();
         this.state={
             comment:"",
             alert_message:"",
             alert_state_warning:false,
             id:"",
             content:"",
             title:"",
             image:"",
             comments:[]
         }
     }
     
     async getDetails(id)
     {
        let values=  await this.api.detailsView(id);
        await this.setState({
            id:values.id,
            content:values.content,
            title:values.title,
            image:values.image,
            comments:values.comments
        })
     }

     async componentWillMount()
     {
        const {element} = await this.props.location.state;
        await this.setState({
            id:element.id
        })
        await this.getDetails(this.state.id);
     }
    
     valueChange(e)
     {
         let value=e.target.value;
         this.setState({
             comment:value
         })
     }

     async createComment(data)
     {
        let value=  await this.api.createComment(data);
        await this.setState({
            comments:[...this.state.comments, 
            ({
             "bid": value.bid,
             "comment": value.comment,
             "createdAt": value.createdAt,
             "id": value.id,
             "updatedAt": value.updatedAt})],
             comment:""
        })
     }
     async handleComment()
     {
            if(this.state.comment.length>0)
            {
                let data=[{
                    "comment":this.state.comment,
                    "bid":this.state.id
                }]

                await this.createComment(data);
            }
            else
            {
                this.setState({
                    alert_message:"Please Enter Your Comment.!",
                    alert_state_warning:true
                })
            }
     }
    render() 
    {
        return (
            <div className="App">
                <SweetAlert
                    warning title={this.state.alert_message}
                    show={this.state.alert_state_warning}
                    onConfirm={() => {
                        this.setState({
                            alert_state_warning: false
                        })
                    }}
                 />
                <Grid fluid>
                    <Link to={{pathname:'/'}}>
                        <button className="commentbtn home">Home</button>
                    </Link>
                    <Col sm={5}>
                        <Card className="card">
                            <Icon size={20} className="pin" icon={radioChecked2}>
                            </Icon>
                            <CardImg className="image" top width="100%" src={images[this.state.image]} />
                            <CardTitle className="title">{this.state.title}</CardTitle>
                             <CardText className="content">{this.state.content}</CardText>
                          </Card>
                    </Col>
                    <Col sm={5}>
                        <Row className="commentrow">
                            <Col sm={9}>
                                <FormControl className="commenttext" type="text" 
                                    id="comment" 
                                    name="comment" 
                                    placeholder="Comment Here"
                                    maxLength={200}
                                    value={this.state.comment} 
                                    onChange={this.valueChange.bind(this)}
                                />
                            </Col>
                            <Col sm={3}>
                                <button className="commentbtn" onClick={this.handleComment.bind(this)}>Send</button>
                            </Col>
                        </Row>
                        <div className="messages">
                            {
                                this.state.comments.map(comment=>{
                                    return(
                                        <div className="messagetr">
                                            <tr>
                                                <td className="messageInnerTr">{comment.comment}</td>
                                            </tr>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Col>
                </Grid>
            </div>
        );
    }
}

export default Details;