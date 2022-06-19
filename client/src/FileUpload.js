import React from 'react'
import axios from 'axios';
import  { useState,useRef } from 'react';
import './FileUpload.css'
import postman from "./images/postman.png"
import right_arrow from "./images/right_arrow.png"
import visual from "./images/visual.png"
import { saveAs } from "file-saver";

var popup = require('popups');
let OUTPUTFILE = "tmp";
let OUTPUTFILE2 = "tmp2";
let input_file = "ss";
let input_file2 = "ss";

function FileUpload() {

  const downloadFile = () => {
    console.log(input_file.split(".json"))
    saveAs(
      "./files/" + input_file.split(".json")[0] + "_forVisual.yaml",
      input_file.split(".json")[0] + "_forVisual.yaml"
    );
  };

  const downloadFile2 = () => {
    console.log(OUTPUTFILE2)
    saveAs(
      "./files/" + input_file.split(".yaml")[0] + "_forPostman.yaml",
      input_file.split(".json")[0] + "_forPostman.yaml"
    );
  };

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    input_file = e.target.files[0].name;
    console.log(input_file)
     
    };

    const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
        const res = await axios.post(
        "http://localhost:3001/upload",
        formData
        );
        console.log(res);

    } catch (ex) {
        console.log(ex);
    }
    };

    // description set
    const [message2, setMessage2] = useState('');

    const saveDescription = (e) => {
      setMessage2(e.target.value);
      console.log(e.target.value)
      };
      
    // fileName set
    const [message, setMessage] = useState('');

    const saveFileName = (e) => {
      setMessage(e.target.value);
      console.log(e.target.value)
      OUTPUTFILE = e.target.value
      };
        // fileName set
    const [message3, setMessage3] = useState('');

    const saveFileName2 = (e) => {
      setMessage3(e.target.value);
      console.log(e.target.value)
      OUTPUTFILE2 = e.target.value
      };

  // radio button value
  const [example,setExample] = useState('');

  const setGender = (event) =>{
    setExample(event.target.value)
    console.log(event.target.value);
  }

    const convertData = async  (e) => {
      e.preventDefault();
      // 👇️ value of input field
      console.log('handleClick 👉️', message);
      console.log("EDWWW")
      console.log(input_file)
      try {

          const res = await axios.post(
          "http://localhost:3001/convert",
          {
            Inpt: message,
            Descr: message2,
            Example: example,
            jsonFile: input_file
          }
          );
          console.log(res);
      } catch (ex) {
          console.log(ex);
      }
      };
      const reverseConvert = async  (e) => {
        e.preventDefault();
        // 👇️ value of input field
        console.log('handleClick 👉️', message);
     
        try {
  
            const res = await axios.post(
            "http://localhost:3001/reverseconvert",
            {
              Inpt: message3,
              jsonFile: input_file
            }
            );
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }
        };


        return (
          <div className="App" style={{marginTop: "100px"}}>
            <div class="header">
              <h1>Welcome to the Converter</h1>
            </div>

            <div class="header2">
              <h2>Postman to Visual Paradigm</h2>

              <div id="banner">
                <div class="inline-block">
                    <img src ={postman} style = {{width: 150}} />
                </div>

                <div class="inline-block">
                    <img src ={right_arrow} style = {{width: 150}}/>
                </div>
                <div class="inline-block">
                    <img src ={visual} style = {{width: 180}}/>
                </div>
            
              </div>

            </div>

          
          <div class = "first-op">
            <input type="file" onChange={saveFile} />
            <button class = "upload" onClick={uploadFile}>Upload</button>
          </div>

          <div>

          <div>
            <p style={{marginTop: 25, fontSize: 18}}>
              Does the .json file contain example responses?
            </p>

            <div onChange={setGender}>
              <input type="radio" value="Yes" name="gender" /> Yes
              <input type="radio" value="No" name="gender" style={{marginLeft: 20}} /> No
            </div>
          
          </div>

          </div>
          <form style={{marginTop: "10px"}}>
            <label class = "label1">
              Add Documentation:
              <input class = "inpt" type="text" value={message2} onChange={saveDescription}/>
            </label>
            </form> 
            
            <form style={{marginTop: "10px"}}>
            {/* <label class = "label1">
              Output FileName:
              <input class = "inpt" type="text" value={message} onChange={saveFileName}/>
            </label> */}
            </form> 

            <button class = "upload" onClick={convertData} >Convert</button>

            <div>
              <button class = "download_file" onClick={downloadFile}>download .yaml file</button>
            </div>


            <h2 style={{marginTop: 70}}>Visual Paradigm to Postman</h2>

          <div id="banner">
            <div class="inline-block">
                <img src ={visual} style = {{width: 180}} />
            </div>

            <div class="inline-block">
                <img src ={right_arrow} style = {{width: 150}}/>
            </div>
            <div class="inline-block">
                <img src ={postman} style = {{width: 150}}/>
            </div>

          </div>

          <div class = "first-op">
            <input type="file" onChange={saveFile} />
            <button class = "upload" onClick={uploadFile}>Upload</button>
          </div>
{/* 
          <form style={{marginTop: "10px"}}>
            <label class = "label1">
              Output FileName:
              <input class = "inpt" type="text" value={message3} onChange={saveFileName2}/>
            </label>
          </form>  */}

            <button class = "upload" onClick={reverseConvert} >Convert</button>
            <div>
              <button class = "download_file2" onClick={downloadFile2}>download .yaml file</button>
            </div>
         
          </div>

        );
      
  }
  
  export default FileUpload;
