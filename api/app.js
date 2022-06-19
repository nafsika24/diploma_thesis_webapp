const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require('body-parser');
const visual_1 = require('./json_to_yaml/convert')
const visual_2 = require('./json_to_yaml/convert2')
const yaml_to_postman = require('./yaml_to_postman/yaml_to_postman.js')

const app = express();

app.use(cors());
app.use(fileupload()); 
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let input_file = ''

 
app.post("/upload", (req, res) => {
  const newpath = __dirname + "/files/";
  const file = req.files.file;
  const filename = file.name;
  console.log("uploading file") 
  input_file = filename
  //console.log(input_file)
 
  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
     return res.status(500).send({ message: "File upload failed", code: 200 });
    }
  
    return res.status(200).send({ message: "File Uploaded", code: 200 });
  });  
});  

// Postman -> OpenApi
app.post("/convert", async (req,res) => {
  console.log("converting file")
  //const output_file = req.body.Inpt;
  const descr = req.body.Descr
  const example = req.body.Example
  const jsonFile = req.body.jsonFile
  console.log("JSON: " + jsonFile)
  const output_file = String(jsonFile).split(".json")[0] + "_forVisual.yaml"

  try {
    if(example === "Yes"){
      
      async function demoPromise2() {
        try {
          let message =  visual_1.visual_1( jsonFile, "../client/public/files/" + output_file, descr)
          //console.log(message);
        } catch (error) {
          console.log("Error: " + error);
        }
      }
     
      demoPromise2();

      //const tovisual1 =  visual_1.visual_1( jsonFile, "../client/public/files/" + output_file, descr)
    }
    else{
      const tovisual2 = await visual_2.visual_2("./files/" + jsonFile, "../client/public/files/" + output_file, descr)

    }
    console.log("")
    console.log('\x1b[31mConvertion Completed Successfully!')
    console.log("") 

} catch (ex) {
    console.log(ex); 
}

})


// OpenApi -> Postman
app.post("/reverseconvert", async (req,res) => {
  console.log("converting file")
  const jsonFile = req.body.jsonFile
  const output_file = String(jsonFile).split(".yaml")[0] + "_forPostman.yaml"

  try {
      
    const final_convert = await yaml_to_postman.yaml_to_postman("./files/" + jsonFile,"../client/public/files/" + output_file)
    console.log("")
    console.log('\x1b[31mConvertion Completed Successfully!')
    console.log("")    

    console.log("")
    console.log('\x1b[31mConvertion Completed Successfully!')
    console.log("")

} catch (ex) {
    console.log(ex);
} 

})
 
app.listen(3001, () => {
  console.log("Server running successfully on 3001");
}); 