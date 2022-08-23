const express = require("express");
const bodyParser = require("body-parser");


const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
    apiKey: "43e358fe35294a2b27a8b688f323b64d-us18",
    server: "us18"
})

app.post("/", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const listId = "d9784a7608";
    const subscribingUser = {
        fName: firstName,
        lName: lastName,
        email: email

    };


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.fName,
                LNAME: subscribingUser.lName
            }
        });

        if (response.id){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
    }

    run();


});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const stringData = JSON.stringify(jsonData);
// const url = "https://us18.api.mailchimp.com/3.0/lists/d9784a7608";
// const options = {
//     method: "POST",
//     auth: "harry:43e358fe35294a2b27a8b688f323b64d-us18"
// }


// const myReq = https.request(url, options, function(response) {
//     response.on("data", function(data) {
//         console.log(JSON.parse(data))

// myReq.write(stringData);
// myReq.end();

// })
// })
app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(process.env.Port || 3000, function() {
    console.log("Server started on Port 3000");
})



//API Key
// 43e358fe35294a2b27a8b688f323b64d-us18

// list id
// d9784a7608