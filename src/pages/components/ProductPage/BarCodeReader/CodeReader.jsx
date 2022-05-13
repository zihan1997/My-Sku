import React, {useEffect, useState} from "react";
import Scanner from "./Scanner";
import {Col, message, Row, Space} from "antd";
import './styles.css'

export default function CodeReader(props){

    const [camera, setCamera] = useState(false);
    const [result, setResult] = useState({});
    const [list, setList] = useState([]);
    const [codeMap, setCodeMap] = useState({"0": 1})
    const [code, setCode] = useState("");

    useEffect(()=>{

        // append code to list
        let listCopy = list.slice();
        listCopy.push(result.code);
        setList(listCopy);
        // console.log("appending in effect " + list.length)

    }, [result]);

    useEffect(()=>{
        // mapping each code of list to codeMap
        let mapCopy = Object.assign({}, codeMap);
        for(let one of list){
            if(!mapCopy[one]){
                mapCopy[one] = 1
            }else{
                mapCopy[one]++;
            }
        }
        setCodeMap(mapCopy);
        // console.log(codeMap);
    }, [list])

    useEffect(()=>{
        // get the code with the highest freq
        // set Code
        let freq = 0, index = 0;
        // one is code
        for(let one in codeMap){
            if(codeMap[one] > freq){
                freq = codeMap[one];
                index = one;
            }
        }
        setCode(index);
    }, [codeMap])

    useEffect(()=>{
        props.onDetectCode(code);
    }, [code])

    const onDetected = result => {
        setResult(result);
    };

    const onClick = ()=> {
        setCamera(true);
        if(result) {
            message.loading("Please hold for 5 sec")
            setTimeout(() => {
                setCamera(false)
            }, 7000);
            props.onDetectCode(code);
        }
    }
    return(
        <div className="reader">
            <Row>
                <Col>
                    <div className="container">
                        {camera && <Scanner onDetected={onDetected} />}
                    </div>
                    <Space>
                        <button onClick={onClick}>
                            {!camera && "Press to Scan"}
                        </button>
                        {/*<p >{code}</p>*/}
                    </Space>

                </Col>
            </Row>
        </div>
    )
}