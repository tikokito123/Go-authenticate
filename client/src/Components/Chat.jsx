import React from 'react'
import {Row, Col, Badge} from 'react-bootstrap'

class Chat extends React.Component {

    handleNavColor = () => {
        document.getElementById("mainnavbar").className = "navbar navbar-expand-lg navbar-light bg-light p-4 rounded";
        document.body.className = "bg-dark"

    }

    componentDidMount() {
        this.handleNavColor();
    }
render() { 
        return (
        <div className="text-dark bg-dark">
            <Row>
                <Col className=" mx-5 col-16 col-md-6 bg-info display-6">
                    <Badge bg="danger" className="me-3 text-white font-weight-bold">Ido: </Badge>
                    I never thought I would ever say this but for the first time
                    Good we are doing good right
                    I dont know let me guess you are still into her?
                    Ido: I never thought I would ever say this but for the first time
                    Good we are doing good right
                    I dont know let me guess you are still into her?
                    Ido: I never thought I would ever say this but for the first time
                    Good we are doing good right
                    I dont know let me guess you are still into her?
                    Ido: I never thought I would ever say this but for the first time
                    Good we are doing good right
                    I dont know let me guess you are still into her?
                    Ido: I never thought I would ever say this but for the first time
                    Good we are doing good right
                    I dont know let me guess you are still into her?
                    Ido: I never thought I would ever say this but for the first time
                    Good we are doing good right
                    I dont know let me guess you are still into her?
                    
                </Col>
            </Row>
        </div>);
    }
}
 
export default Chat;