import React, { Component } from "react";
import {Col} from 'react-bootstrap'
import { CardImg,Card, Button, CardTitle, CardText } from 'reactstrap';
import "../assets/css/index.css";
import {Link} from 'react-router-dom';
import {radioChecked2} from 'react-icons-kit/icomoon/radioChecked2';
import { Icon } from "react-icons-kit";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
 const images = importAll(require.context('/home/vrvembassy1/work/s/pavan/Bulletin_Board/boardServer/uploads', false, /\.(png|jpe?g|svg|JPG)$/));

export default class TableReturn extends Component
{
    constructor(props)
    {
        super(props);
    }
    render() 
    {
        return (
            <div>
                {this.props.elements.map(element => {
                    return(
                        <Col sm={3}>
                            <Card className="card">
                                <Icon size={20} className="pin" icon={radioChecked2}>
                                </Icon>
                                    <CardImg className="image" top width="100%" src={images[element.image]} />
                                    <CardTitle className="title">{element.title}</CardTitle>
                                    <CardText className="content">{element.content}</CardText>
                                    <Link to={{pathname:'/details',state:{element:element}}}>
                                        <Button className="comment">Comments</Button>  
                                    </Link>
                             </Card>
                        </Col>
                        )
                    })}
            </div>
        );
    }
}
 