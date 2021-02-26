const fs = require("fs");
const http = require("http");
const axios = require("axios");

const getFileContent = (callback) => {
  fs.readFile("index.html", (err, data) => {
    if (err) throw err;
    callback(data.toString());
  });
};

http
  .createServer((req, res) => {
    console.log("req.url", req.url);
    if (req.url == "/api/proveedores") {
      getFileContent((data) => {
        // Make a request for a user with a given ID
        axios
          .get(
            "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
          )
          .then(function (response) {
            res.end(data.replace("{{replace}}","<h2>Se remplazo</h2>"));
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      });
    }
  })
  .listen(8000);
