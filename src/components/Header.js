import './Header.css'
import {Row} from "antd";
import GithubButton from "./GithubButton";
import Axios from 'axios';
import React from 'react'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLatestConf: false,
            showStr: ''
        };
    }
    componentDidMount() {
        const _this=this;
        Axios.get('https://api.github.com/repos/PaperReviews/blockchain-paper-reviews/commits?page=1&per_page=10').then(response => {
            let len = response.data.length

            for(let i = 0; i < len; i++) {
                let str = response.data[i].commit.message
                let strArr = str.split(' ')
                let idx=str.indexOf('(');
                if(strArr[0] === 'Update'){
                    if(idx !== -1){
                        str = str.substr(0, idx)
                    }
                    _this.setState({
                        showLatestConf: true,
                        showStr: str,
                    })
                    break;
                }
            }
        })
    }
    render() {
        const renderText = ()=>{
            if(this.state.showLatestConf){
                return <span style={{color: '#fd3c95', fontWeight: 'bold', fontSize: '16px', paddingTop: '10px'}}>
                        Latest: {this.state.showStr} !!!
                    </span>
            } else{
                return <span></span>
            }
        }

        return (
            <section>
                <Row>
                    <a href="/" className="title">Blockchain Paper Reviews</a>
                    {/*<github-button style="padding-left: 5px"></github-button>*/}
                    <GithubButton/>
                    {renderText()}
                </Row>
                <Row className="subtitle">
                    Collections and comments of Blockchain paper. To add/edit a paper,&nbsp;
                    <a style={{color: '#666666', textDecoration: 'underline'}} href="https://github.com/PaperReviews/blockchain-paper-reviews/pulls">send
                    a pull request.</a>
                </Row>
            </section>
        );
    }
}

export default Header;
