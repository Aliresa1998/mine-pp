import { Row, Select, Divider } from "antd";
import React, { useEffect, useState } from "react";

const digits = Array.from({ length: 10 }, (_, i) => ({ value: i.toString(), label: i.toString() }));
const persianChars = [
  { value: "A", label: "الف" },
  { value: "B", label: "ب" },
  { value: "P", label: "پ" },
  { value: "T", label: "ت" },
  { value: "TH", label: "ث" },
  { value: "J", label: "ج" },
  { value: "CH", label: "چ" },
  { value: "H", label: "ح" },
  { value: "KH", label: "خ" },
  { value: "D", label: "د" },
  { value: "ZAL", label: "ذ" },
  { value: "R", label: "ر" },
  { value: "Z", label: "ز" },
  { value: "ZH", label: "ژ" },
  { value: "SIN", label: "س" },
  { value: "SHIN", label: "ش" },
  { value: "SAD", label: "ص" },
  { value: "ZAD", label: "ض" },
  { value: "TA", label: "ط" },
  { value: "ZA", label: "ظ" },
  { value: "EIN", label: "ع" },
  { value: "GHEIN", label: "غ" },
  { value: "F", label: "ف" },
  { value: "GHAF", label: "ق" },
  { value: "K", label: "ک" },
  { value: "G", label: "گ" },
  { value: "L", label: "ل" },
  { value: "M", label: "م" },
  { value: "N", label: "ن" },
  { value: "H", label: "ه" },
  { value: "V", label: "و" },
  { value: "Y", label: "ی" },
];

const EditablePlate = ({ plate, handleUpdateCurrentPlate }) => {
  const [parts, setParts] = useState(plate.split("-"));

  useEffect(() => {
    // Update parts only if the plate prop changes and it's different from the current parts
    const newParts = plate.split("-");
    if (newParts.join("-") !== parts.join("-")) {
      setParts(newParts);
    }

    handleUpdateCurrentPlate(newParts.join('-'))
  }, [plate]);

  const handleSelectChange = (value, partIndex, charIndex = null) => {
    const newParts = [...parts];

    if (charIndex !== null) {
      // Update specific character in a part
      const updatedPart =
        newParts[partIndex].substring(0, charIndex) +
        value +
        newParts[partIndex].substring(charIndex + 1);
      newParts[partIndex] = updatedPart;
    } else {
      // Update the entire part (e.g., Persian character)
      newParts[partIndex] = value;
    }

    console.log(newParts.join('-'))
    handleUpdateCurrentPlate(newParts.join('-'))
    setParts(newParts);
  };

  return (
    <Row
      className="editablePlate"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "5px",
        direction: "rtl",
      }}
    >
      {/* Last 2 digits */}
      <Select
        value={parts[3][1]}
        onChange={(value) => handleSelectChange(value, 3, 1)}
        options={digits}
        style={{ width: 60 }}
      />
      <Select
        value={parts[3][0]}
        onChange={(value) => handleSelectChange(value, 3, 0)}
        options={digits}
        style={{ width: 60 }}
      />

      {/* Divider */}
      <Divider type="vertical" style={{ height: "30px", margin: "0 10px" }} />

      {/* 3 digits */}
      <Select
        value={parts[2][2]}
        onChange={(value) => handleSelectChange(value, 2, 2)}
        options={digits}
        style={{ width: 60 }}
      />
      <Select
        value={parts[2][1]}
        onChange={(value) => handleSelectChange(value, 2, 1)}
        options={digits}
        style={{ width: 60 }}
      />
      <Select
        value={parts[2][0]}
        onChange={(value) => handleSelectChange(value, 2, 0)}
        options={digits}
        style={{ width: 60 }}
      />

      {/* Persian Character */}
      <Select
        value={parts[1]}
        onChange={(value) => handleSelectChange(value, 1)}
        options={persianChars}
        style={{ width: 80 }}
      />

      {/* First 2 digits */}
      <Select
        value={parts[0][1]}
        onChange={(value) => handleSelectChange(value, 0, 1)}
        options={digits}
        style={{ width: 60 }}
      />
      <Select
        value={parts[0][0]}
        onChange={(value) => handleSelectChange(value, 0, 0)}
        options={digits}
        style={{ width: 60 }}
      />
    </Row>
  );
};

export default EditablePlate;