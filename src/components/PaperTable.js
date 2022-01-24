import './PaperTable.css'
import {Table, Tag, Checkbox, Row, Col} from "antd";
// import Axios from 'axios';
import {LinkOutlined} from '@ant-design/icons';
import React from 'react'
import Axios from "axios";
import yaml from "js-yaml";

// const plainOptions = ['Blockchain Performance', 'Blockchain Security', 'Blockchain Analysis', 'Blockchain Application'];

class PaperTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publicPath: '/',
            dataSource: [],
            showSource: [],
            columns: [
                {
                    dataIndex: 'paper',
                    key: 'paper',
                    render: (text, record) => (
                        <div>
                            <a href={record.url} style={{fontSize: '16px'}}>{record.title}<LinkOutlined/></a><br/>
                            <span>{record.authors}</span><br/>
                            <span>{record.conf} {record.year}</span><br/>
                            <TagFormat tag={record.tag}/>
                            <SubTagFormat subtag={record.subtag}/>
                        </div>
                    )
                }
            ]
        };
    }
    componentDidMount() {
        const _this=this;
        Axios.get(this.state.publicPath + 'resources/allpapers.yml').then(response => {
            const allpapers = yaml.load(response.data)
            for(let i=0;i<allpapers.length;i++){
                allpapers[i].key = i;
            }
            _this.setState(
                {
                    dataSource: allpapers,
                    showSource: allpapers
                },
            )
        })
    }
    onChange(checkedValues) {
        if(checkedValues.length>0){
            this.setState(
                {
                    showSource: this.state.dataSource.filter(function (item){
                        return checkedValues.indexOf(item.tag)>=0
                    })
                },
            )
        }else{
            this.setState(
                {
                    showSource: this.state.dataSource
                }
            )
        }
    }
    render() {
        return (
            <section>
                <Checkbox.Group style={{ width: '100%', paddingTop: '10px', paddingBottom: '10px' }} onChange={this.onChange.bind(this)}>
                    <Row>
                        <Col span={6}>
                            <Checkbox value="performance">Blockchain Performance</Checkbox>
                        </Col>
                        <Col span={6}>
                            <Checkbox value="security">Blockchain Security</Checkbox>
                        </Col>
                        <Col span={6}>
                            <Checkbox value="analysis">Blockchain Analysis</Checkbox>
                        </Col>
                        <Col span={6}>
                            <Checkbox value="application">Blockchain Application</Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
                <Table dataSource={this.state.showSource} columns={this.state.columns} showHeader={false}>
                </Table>
            </section>
        );
    }
}

function TagFormat(props) {
    if(props){
        switch (props.tag){
            case 'performance':
                return  <Tag color="magenta">{props.tag}</Tag>;
            case 'security':
                return  <Tag color="cyan">{props.tag}</Tag>;
            case 'analysis':
                return  <Tag color="blue">{props.tag}</Tag>;
            case 'application':
                return  <Tag color="purple">{props.tag}</Tag>;
            default:
                return  null;
        }
    }
    return null;
}

function SubTagFormat(props) {
    if(props){
        for(let i=0;i<props.subtag.length;i++){
            switch (props.subtag[i]){
                default:
                    return  <Tag color="default">{props.subtag[i]}</Tag>;
            }
        }

    }
    return null;
}

export default PaperTable;
