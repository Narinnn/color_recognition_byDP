const express = require("express");
const upload = require("express-fileupload");
const cors = require("cors");
const format = require("cli-color");
const getPixels = require("get-pixels");

const Analyzer = require("./Analyzer");
const SessionStorage = require("./services/SessionStorage");
const Session = require("./models/Session");
const Utils = require("./services/Utils");

const error = format.red.bold;
const warning = format.yellow;
const notice = format.green;

const server = express();
const analyzer = new Analyzer();
const sessionStorage = new SessionStorage();

analyzer.init();

const BASE_ASSETS_URL = "http://localhost:9000/";

server.use(cors());
server.use(upload());
server.use(express.static("storage"));

server.get("/", (request, response) => {
    console.log(notice("Server is working"));

    response.json({ type: "ok", status: analyzer.ready() });
});

server.get("/train", (request, response) => {
    // response.json({ type: "error", message: "GET method does not work for this path" });
    const data = [{"input":[0.396761134,0.502024292,0.101214575],"output":[1,0,0,0,0,0,0,0,0,0,0,0],"color":"0,128,0"},{"input":[0.333333333,0.333333333,0.333333333],"output":[0,1,0,0,0,0,0,0,0,0,0,0],"color":"255,255,255"},{"input":[0.936170213,0.012765957,0.05106383],"output":[0,0,1,0,0,0,0,0,0,0,0,0],"color":"255,0,0"},{"input":[0.685131195,0.137026239,0.177842566],"output":[0,0,1,0,0,0,0,0,0,0,0,0],"color":"255,0,0"},{"input":[0.076923077,0.846153846,0.076923077],"output":[1,0,0,0,0,0,0,0,0,0,0,0],"color":"0,128,0"},{"input":[0.230769231,0.335664336,0.433566434],"output":[0,0,0,1,0,0,0,0,0,0,0,0],"color":"0,255,255"},{"input":[0.045454545,0.356060606,0.598484849],"output":[0,0,0,0,1,0,0,0,0,0,0,0],"color":"0,0,128"},{"input":[0.333333333,0.333333333,0.333333333],"output":[0,0,0,0,0,1,0,0,0,0,0,0],"color":"0,0,0"},{"input":[0.571428571,0.325396825,0.103174603],"output":[0,0,0,0,0,0,1,0,0,0,0,0],"color":"64,0,0"},{"input":[0.039370079,0.05511811,0.905511811],"output":[0,0,0,0,0,0,0,1,0,0,0,0],"color":"0,0,255"},{"input":[0.056910569,0.894308943,0.048780488],"output":[1,0,0,0,0,0,0,0,0,0,0,0],"color":"0,128,0"},{"input":[0.078431373,0.823529412,0.098039216],"output":[1,0,0,0,0,0,0,0,0,0,0,0],"color":"0,128,0"},{"input":[0.336411609,0.329815303,0.333773087],"output":[0,1,0,0,0,0,0,0,0,0,0,0],"color":"255,255,255"},{"input":[0.458333333,0.447916667,0.09375],"output":[0,0,0,0,0,0,0,0,1,0,0,0],"color":"255,255,0"},{"input":[0.833333333,0.096899225,0.069767442],"output":[0,0,1,0,0,0,0,0,0,0,0,0],"color":"255,0,0"},{"input":[0.082191781,0.143835616,0.773972603],"output":[0,0,0,0,0,0,0,1,0,0,0,0],"color":"0,0,255"},{"input":[0.329301075,0.336021505,0.334677419],"output":[0,1,0,0,0,0,0,0,0,0,0,0],"color":"255,255,255"},{"input":[0.52631579,0.434782609,0.038901602],"output":[0,0,0,0,0,0,0,0,1,0,0,0],"color":"255,255,0"},{"input":[0.68683274,0.160142349,0.153024911],"output":[0,0,1,0,0,0,0,0,0,0,0,0],"color":"255,0,0"},{"input":[0.292682927,0.47696477,0.230352303],"output":[1,0,0,0,0,0,0,0,0,0,0,0],"color":"0,128,0"},{"input":[0.39139785,0.43655914,0.172043011],"output":[0,0,0,0,0,0,0,0,1,0,0,0],"color":"255,255,0"},{"input":[0.328616352,0.344339623,0.327044025],"output":[0,0,0,0,0,0,0,0,0,1,0,0],"color":"192,192,192"},{"input":[1,0,0],"output":[0,0,0,0,0,0,1,0,0,0,0,0],"color":"64,0,0"},{"input":[0.32357473,0.343605547,0.332819723],"output":[0,0,0,0,0,0,0,0,0,1,0,0],"color":"192,192,192"},{"input":[0.333928571,0.339285714,0.326785714],"output":[0,0,0,0,0,0,0,0,0,1,0,0],"color":"192,192,192"},{"input":[0.501333333,0.368,0.130666667],"output":[0,0,0,0,0,0,0,0,1,0,0,0],"color":"255,255,0"},{"input":[0.429577465,0.354460094,0.215962441],"output":[0,0,0,0,0,0,0,0,1,0,0,0],"color":"255,255,0"},{"input":[0.761061947,0.212389381,0.026548673],"output":[0,0,0,0,0,0,1,0,0,0,0,0],"color":"64,0,0"},{"input":[0.306010929,0.355191257,0.338797814],"output":[0,0,0,0,0,0,0,0,0,0,1,0],"color":"128,128,128"},{"input":[0.323651452,0.340248963,0.336099585],"output":[0,0,0,0,0,0,0,0,0,0,1,0],"color":"128,128,128"},{"input":[0.460416667,0.33125,0.208333333],"output":[0,0,0,0,0,0,0,0,1,0,0,0],"color":"255,255,0"},{"input":[0.525423729,0.288135593,0.186440678],"output":[0,0,1,0,0,0,0,0,0,0,0,0],"color":"255,0,0"},{"input":[0.379613357,0.323374341,0.297012302],"output":[0,0,0,0,0,0,0,0,0,1,0,0],"color":"192,192,192"},{"input":[0.321637427,0.339181287,0.339181287],"output":[0,1,0,0,0,0,0,0,0,0,0,0],"color":"255,255,255"},{"input":[0.265446224,0.28832952,0.446224256],"output":[0,0,0,1,0,0,0,0,0,0,0,0],"color":"0,255,255"},{"input":[0.126126126,0.189189189,0.684684685],"output":[0,0,0,0,1,0,0,0,0,0,0,0],"color":"0,0,128"},{"input":[0.326287979,0.336856011,0.336856011],"output":[0,1,0,0,0,0,0,0,0,0,0,0],"color":"255,255,255"},{"input":[0.367534456,0.324655436,0.307810107],"output":[0,0,0,0,0,0,0,0,0,1,0,0],"color":"192,192,192"},{"input":[0.452830189,0.264150943,0.283018868],"output":[0,0,0,0,0,1,0,0,0,0,0,0],"color":"0,0,0"},{"input":[0.364583333,0.276041667,0.359375],"output":[0,0,0,0,0,0,0,0,0,0,1,0],"color":"128,128,128"},{"input":[0.471910112,0.24906367,0.279026217],"output":[0,0,0,0,0,0,0,0,0,0,0,1],"color":"128,0,128"},{"input":[0.549723757,0.23480663,0.215469613],"output":[0,0,0,0,0,0,1,0,0,0,0,0],"color":"64,0,0"},{"input":[0.692098093,0.144414169,0.163487738],"output":[0,0,1,0,0,0,0,0,0,0,0,0],"color":"255,0,0"},{"input":[0.378283713,0.388791594,0.232924694],"output":[0,0,0,0,0,0,0,0,1,0,0,0],"color":"255,255,0"},{"input":[0.438311688,0.211038961,0.350649351],"output":[0,0,0,0,0,0,0,0,0,0,0,1],"color":"128,0,128"},{"input":[0.334302326,0.359011628,0.306686046],"output":[0,1,0,0,0,0,0,0,0,0,0,0],"color":"255,255,255"},{"input":[0.042402827,0.254416961,0.703180212],"output":[0,0,0,0,0,0,0,1,0,0,0,0],"color":"0,0,255"},{"input":[0.322222222,0.442222222,0.235555556],"output":[1,0,0,0,0,0,0,0,0,0,0,0],"color":"0,128,0"},{"input":[0.393004115,0.261316872,0.345679012],"output":[0,0,0,0,0,0,0,0,0,0,0,1],"color":"128,0,128"}];

    analyzer.train(data);

    response.json({ type: "ok", message: "NN was trained" });
});

server.post("/train", (request, response) => {
    const res = { type: "ok" };

    if(request.files && request.files.model) {
        const model = request.files.model;
        const [name, extension] = model.name.split(".");

        if(extension === "json") {
            const buffer = Buffer.from(model.data);
            const data = JSON.parse(buffer.toString());

            analyzer.train(data);

            res.status = "trained";
        } else {
            res.type = "error";
            res.message = "No any model uploaded";
        }
    } else {
        res.type = "error";
        res.message = "No any model uploaded";
    }

    response.json(res);
});

server.get("/upload", (request, response) => {
    console.log(error("Any items was not getting"));
    console.log(error("GET method does not work for this path"));

    response.json({ type: "error", message: "GET method does not work for this path" });
});

server.post("/upload", (request, response) => {
    console.log(notice("Got some file"));

    const res = { type: "ok" };

    if(request.files && request.files.picture) {
        const image = request.files.picture;
        const [name, extension] = image.name.split(".");

        if(extension === "jpg" || extension === "png") {
            const tokenA = Utils.getToken();
            const tokenB = Utils.getToken();
            const session = new Session([tokenA, tokenB].join("_"), [tokenA, extension].join("."), [tokenB, "png"].join("."), BASE_ASSETS_URL);

            sessionStorage.setSession(session);

            image.mv("./storage/" + session.target, error => {
                if(error) {
                    res.type = "error";
                    res.message = "SERVER ERROR: Cannot save an image for analysis";

                    response.json(res);

                    return;
                }

                const uri = new URL(session.target, BASE_ASSETS_URL);

                res.session = session.toJson();

                getPixels(uri.href, (err, data) => {
                    if(err) {
                        res.type = "error";
                        res.message = "SERVER ERROR: Cannot get image's buffer";

                        response.json(res);

                        return;
                    }

                    setTimeout(() => {
                        analyzer.run(data, session);
                    }, 2000);
                });

                response.json(res);
            });
        } else {
            res.type = "error";
            res.message = "Was getting not an image";

            response.json(res);
        }
    } else {
        res.type = "error";
        res.message = "Was getting no any file";

        response.json(res);
    }
});

server.get("/session", (request, response) => {
    console.log(notice("Request for getting session"));

    if(request.query && request.query.key) {
        const session = sessionStorage.getSession(request.query.key);

        response.json(session.toJson());
    } else {
        response.json({ status: "rejected" });
    }
});

server.listen(9000);