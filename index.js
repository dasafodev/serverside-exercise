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
        axios
          .get(
            "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
          )
          .then(function (response) {
            let body = data.replace(
              "{{thead}}",
              `
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Contacto</th>
            `
            );
            let reduced = response.data.reduce(
              (prev, curr) =>
                prev +
                ` 
            <tr>
            <th scope="row">${curr.idproveedor}</th>
            <td>${curr.nombrecompania}</td>
            <td>${curr.nombrecontacto}</td>
            </tr>
            `
            );
            // console.log("reduced", reduced);
            body = body.replace('{{title}}','Proveedores')
            body = body.replace('{{title}}','Proveedores')

            body = body.replace(
              "{{tbody}}",
              reduced.split("[object Object]")[1]
            );
            res.end(body);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      });
    } else if (req.url == "/api/clientes") {
      getFileContent((data) => {
        axios
          .get(
            "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"
          )
          .then(function (response) {
            let body = data.replace(
              "{{thead}}",
              `
                <th scope="col">Id</th>
                <th scope="col">Compañia</th>
                <th scope="col">Contacto</th>
                `
            );
            let reduced = response.data.reduce(
              (prev, curr) =>
                prev +
                `<tr>
                <th scope="row">${curr.idCliente}</th>
                <td>${curr.NombreCompania}</td>
                <td>${curr.NombreContacto}</td>
                </tr>`
            );
            body = body.replace('{{title}}','Clientes')
            body = body.replace('{{title}}','Clientes')
            // console.log("reduced", reduced);
            body = body.replace(
              "{{tbody}}",
              reduced.split("[object Object]")[1]
            );
            res.end(body);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      });
    }
  })
  .listen(8000);
