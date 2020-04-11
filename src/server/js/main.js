const express = require("express");
const upload = require("express-fileupload");
const format = require("cli-color");

const error = format.red.bold;
const warning = format.yellow;
const notice = format.green;

const app = express();

app.use(upload());

app.get("/", (request, response) => {
    console.log(notice("Server is working"));

    response.json({ type: "notice", message: "Server is working" });
});

app.get("/upload", (request, response) => {
    console.log(error("Any items was not getting"));
    console.log(error("GET method does not work for this path"));

    response.json({ type: "error", message: "GET method does not work for this path" });
});
app.post("/upload", (request, response) => {
    console.log(notice("Got some file"));

    if(request.files && request.files.picture) {
        const [name, extension] = request.files.picture.name.split(".");

        console.log("file name:         " + warning(name));
        console.log("file extension:    " + warning(extension));
        console.log("file size:         " + warning(request.files.picture.size));
    }

    response.json({ type: "notice", message: "File was getting" });
});

app.listen(9000);