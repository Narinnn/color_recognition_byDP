const express = require("express");
const upload = require("express-fileupload");
const cors = require("cors");
const format = require("cli-color");
const getPixels = require("get-pixels");

const Analyzer = require("./Analyzer");

const error = format.red.bold;
const warning = format.yellow;
const notice = format.green;

const server = express();
const analyzer = new Analyzer();

const BASE_ASSETS_URL = "http://localhost:9000/";

server.use(cors());
server.use(upload());
server.use(express.static("storage"));

server.get("/", (request, response) => {
    console.log(notice("Server is working"));

    response.json({ type: "notice", message: "Server is working" });
});

server.get("/upload", (request, response) => {
    console.log(error("Any items was not getting"));
    console.log(error("GET method does not work for this path"));

    response.json({ type: "error", message: "GET method does not work for this path" });
});
server.post("/upload", (request, response) => {
    console.log(notice("Got some file"));

    const res = { type: "notice" };

    if(request.files && request.files.picture) {
        const image = request.files.picture;
        const [name, extension] = image.name.split(".");


        if(extension === "jpg" || extension === "png") {
            image.mv("./storage/" + image.name, error => {
                if(error) {
                    return;
                }

                const imageUrl = new URL(image.name, BASE_ASSETS_URL);

                res.url = imageUrl;

                getPixels(imageUrl.href, (err, data) => {
                    if(err) {
                        return;
                    }
            
                    analyzer.run(data);
                });

                response.json(res);
            });
        } else {
            res.type = "error";
            res.message = "Was getting not an image";

            response.json(res);
        }
    }
});

server.listen(9000);