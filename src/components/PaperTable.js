import './PaperTable.css'
import {Table, Tag} from "antd";
// import Axios from 'axios';
import React from 'react'
import Axios from "axios";
import yaml from "js-yaml";

class PaperTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publicPath: '/',
            dataSource: [],
            columns: [
                {
                    dataIndex: 'paper',
                    key: 'paper',
                    render: (text, record) => (
                        <div>
                            <a href={record.url} style={{fontSize: '16px'}}>{record.title}</a><br/>
                            <span>{record.authors}</span><br/>
                            <span>{record.year}</span><br/>
                            <Tag color="magenta">tag1</Tag> <Tag color="volcano">tag2</Tag>
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
                    dataSource: allpapers
                },
            )
        })
    }
    render() {
        return (
            <section>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} showHeader={false}>
                </Table>
            </section>
        );
    }
}

export default PaperTable;
