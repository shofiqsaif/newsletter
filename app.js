const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
var https = require("https");
var fs = require("fs");

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(express.static("public"));

const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
    apiKey: "797f0ed80d157deed5d52bc25f0462c3-us9",
    server: "us9",
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.get("/failure" , (req,res) => {
    res.redirect("/");
});

app.post("/", urlencodedParser, (req, res) => {
    console.log(req.body);
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        email_address: email,
        status: "subscribed",
        merge_fields:{
            FNAME : firstName,
            LNAME : lastName,
        }
    };
    // POST
    var options = {
        method: "POST",
        hostname: "us9.api.mailchimp.com",
        path: "/3.0/lists/a933c15de4/members?skip_merge_validation=false",
        headers: {
            Authorization: "us9 797f0ed80d157deed5d52bc25f0462c3-us9",
            "Content-Type": "application/json",
        },
        maxRedirects: 20,
    };

    var REQ = https.request(options, function (RES) {
        var chunks = [];

        RES.on("data", function (chunk) {
            chunks.push(chunk);
            console.log(JSON.parse(chunk));
            console.log("Status Code : " + RES.statusCode);

            if(RES.statusCode == 200){
                res.sendFile(__dirname + "/success.html");
            }
            else{
                res.sendFile(__dirname + "/failure.html");
            }
        });
        RES.on("error", function (error) {
            console.error(error);
        });
    });

    var postData = JSON.stringify(data);
    console.log("THIS is postdata: " + postData);

    REQ.write(postData);
    REQ.end();

    // MAILCHIMP API KEY
    // 62a1591c0e61861a0ec4e8ce598aeb38-us9

    // List Audiance Id
    // a933c15de4
});

app.listen(process.env.PORT || port, () => {
    console.log("Server is running on port " + port);
});

