import React, {useState} from "react";
import {Button, Form, Modal, Select, Space} from 'antd';
const { Option } = Select;

export default function SearchProductForm(){

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // console.log("modal closed")
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        // console.log("modal canceled");
        setIsModalVisible(false);
    };

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    return (
        <Space
        >
            <Button
                style={{
                    padding: 0,
                    float: 'left',
                    margin: 0,
                }}
                onClick={showModal}
            >
                Search
            </Button>
            <Modal
                title="Search Product"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    name="searchProduct"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    autoComplete="off"
                >
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>

                </Form>
            </Modal>

        </Space>
    );
}