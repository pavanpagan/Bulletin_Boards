import React, { Component } from "react";
import HCBody from "../Body/HCBody.jsx";
import { Grid, Row, Col,Modal,FormGroup,FormControl,Form,Button } from "react-bootstrap";
import { TextArea } from "semantic-ui-react";
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import api from '../apis/api';

 class HomeContents extends Component {
     constructor(props)
     {
         super(props);
         this.api = new api();
         this.state={
            show:false,
            title:{
                value:"",
                valid:false
            },
            content:{
                value:"",
                valid:false
            },
            tables:[],
            alert_message:"",
            alert_state_warning:false,
            alert_state_success:false,
            newImage:""
         }
     }

     async componentWillMount()
     {
       await this.getItems();
     }

     async getItems()
     {
        let items=  await this.api.retrieveItems();
        await this.setState({
           tables:items
        })
     }

   handleClose() 
   {
        this.setState({ show: false });
   }
    handleShow()
    {
        this.setState({
            show:true
        })
    }
   async valueChange(e)
    {
        let id=e.target.id;
        let value=e.target.value;
        let valid=false;
        switch(id)
        {
            case "title": if(value.length>0)
                            {
                                valid=true;
                            }
                            else
                            {
                                valid=false;
                            }
                            break;
            case "content": if(value.length>0)
                            {
                                valid=true;
                            }
                            else
                            {
                                valid=false;
                            }
                            break;
        }
        await this.setState({
            [id]:{
                value:value,
                valid:valid
            }
        })
    }
   async addBoard()
    {
        if(this.state.title.valid && this.state.content.valid && this.state.newImage)
        {
            let data = new FormData();
            data.append('imagefile',this.state.newImage);
            data.append('title',this.state.title.value);
            data.append('content',this.state.content.value);
            
            let value=await this.api.createBoard(data);

             await this.setState({
                    tables:[...this.state.tables, 
                    ({  "comments": [],
                    "content": value.content,
                    "createdAt": value.createdAt,
                    "id": value.id,
                    "image": value.image,
                    "title": value.title,
                    "updatedAt": value.updatedAt})],
                    alert_message:"Successfully Added.!",
                    alert_state_success:true,
                    title:{
                        value:"",
                        valid:false
                    },
                    content:{
                        value:"",
                        valid:false
                    },
                    newImage:""
                })
        }
        else
        {
                this.setState({
                    alert_message:"Fields Should Not Be Empty.!",
                    alert_state_warning:true
                })
        }
    }
    render() {
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
                <SweetAlert
                    success title={this.state.alert_message}
                    show={this.state.alert_state_success}
                    onConfirm={() => {
                        this.setState({
                            alert_state_success: false,
                            show:false
                        })
                    }}
                />
                <Modal show={this.state.show} 
                    onHide={this.handleClose.bind(this)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add To Board</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal >
                            <FormGroup controlId="formHorizontalPassword">
                                <Col sm={2}>
                                </Col>
                                <Col sm={7}>
                                    <FormGroup validationState={this.state.title.valid ? "success" : "error" } >
                                        <FormControl type="text" 
                                            id="title" 
                                            name="title" 
                                            placeholder="Enter Title "
                                            maxLength={30}
                                            value={this.state.title.value} 
                                            onChange={this.valueChange.bind(this)}
                                        />
                                    </FormGroup>
                                    <FormGroup  validationState={this.state.content.valid ? "success" : "error" } >
                                        <TextArea 
                                            className="textarea" type="text" 
                                            id="content" 
                                            name="content" 
                                            placeholder="Content"
                                            value={this.state.content.value} 
                                            maxLength={200}
                                            onChange={this.valueChange.bind(this)}
                                        />
                                    </FormGroup>
                                    <input  
                                        type="file" onChange={(event)=>{
                                            if(event.target.files[0].size < 5263360 && (event.target.files[0].type === 'image/jpg' || event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg')){
                                                this.setState({
                                                newImage: event.target.files[0],
                                                },()=>{
                                                })
                                            }
                                            else{
                                                this.setState({
                                                    img_new_error:"Image should be jpg,jpeg and png and maximum size 5MB"
                                                })
                                            }
                                    }}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={4} sm={5}>
                                    <Button className="add" onClick={this.addBoard.bind(this)}>Add</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Grid fluid>
                    <Row className="headerRow">
                        <button className="AddCards" onClick={this.handleShow.bind(this)}>Add Board</button>
                    </Row>
                    <Row>
                        <div>
                            <HCBody tables={this.state.tables}/>
                        </div>
                    </Row>
                </Grid>
            </div>
        );
    }
}


export default HomeContents;