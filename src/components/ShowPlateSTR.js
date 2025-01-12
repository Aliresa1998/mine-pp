import { Col, Row } from "antd";
import React from "react";
import flag from "../assets/images/iran-flag.png";


const mapping = {
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  'A': 'الف', 'B': 'ب', 'P': 'پ', 'T': 'ت', 'TH': 'ث', 'J': 'ج', 'CH': 'چ', 'h': 'ح', 'KH': 'خ',
  'D': 'د', 'ZAL': 'ذ', 'R': 'ر', 'Z': 'ز', 'ZH': 'ژ', 'SIN': 'س', 'SHIN': 'ش', 'SAD': 'ص', 'ZAD': 'ض',
  'TA': 'ط', 'ZA': 'ظ', 'EIN': 'ع', 'GHEIN': 'غ', 'F': 'ف', 'GHAF': 'ق', 'K': 'ک', 'G': 'گ',
  'L': 'ل', 'M': 'م', 'N': 'ن', 'H': 'ه', 'V': 'و', 'Y': 'ی', 'MALUL': 'معلول'
};

function mapString(input) {
  let result = '';
  let i = 0;

  while (i < input.length) {
    let found = false;
    for (let key in mapping) {
      if (input.substr(i, key.length) === key) {
        result += mapping[key];
        i += key.length;
        found = true;
        break;
      }
    }
    if (!found) {
      result += input[i];
      i++;
    }
  }

  return result;
}

const ShowPlateSTR = (props) => {
  return (
    props.plate &&
    <>
      <Row
        style={{
          border: "4px solid black",
          backgroundColor:
            (props.plate.includes('EIN')
              || (props.plate.includes('T') && !props.plate.includes('TA'))
            ) ? 'yellow'
              :
              (props.plate.includes('P')
                || props.plate.includes('TH')) ? 'green'
                :
                'white'
          ,
          minHeight: "30px",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <Col
          sm={4}
          style={{
            borderLeft: "4px solid black",
            height: "35px",
            display: "flex",
            fontSize: "18px",
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.plate.split("-")[3]}
        </Col>
        <Col
          sm={16}
          style={{
            borderLeft: "4px solid black",
            height: "35px",
            display: "flex",

            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {" "}
          {props.plate &&
            props.plate.split("-")[2] +
            " " +

            (props.plate.split("-")[1] == "TA" ? 'ط' : mapString(props.plate.split("-")[1]))



            +
            " " +
            props.plate.split("-")[0]}
        </Col>
        <Col
          sm={4}
          style={{
            backgroundColor: "rgb(86,115,185)",

            height: "35px",
            display: "flex",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={flag} width={"15"} height={"20"} />
        </Col>
      </Row>
    </>
  );
};

export default ShowPlateSTR;
