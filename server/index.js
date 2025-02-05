var express = require('express');

const db = require("./dbConnection");
const app = express();

const PORT = process.env.PORT || 3000;
const RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY;
const expirationInMinutes = 15;

app.route('/login').post(loginRoute)
app.route('/technologies')
    .get(getTechnologies)
    .post(addTechnology)
app.route('/technologies/:id')
    .put(updateTechnology)
    .delete(deleteTechnology);

app.get('/', function(req, res) {
    res.send("Hello world!")
});

async function getTechnologies(req, res) {
    console.log("getTechnologies");
    res.send("GET technologies");
    let collection = await db.collection("technologies");
    let results = await collection.find().toArray();
    res.json(results).status(200);
}
function updateTechnology(req, res) {
    console.log("updateTechnology");
}
function deleteTechnology(req, res) {
    console.log("deleteTechnology");
}
function addTechnology(req, res) {
    console.log("addTechnology");
}


function loginRoute(req, res) {
    const email = req.body.email, password = req.body.password;
    if (validateUser(email, password)) {
        // TODO change userid to db request
        const userId = 1;

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'HS256',
            expiresIn: expirationInMinutes.toString(),
            subject: userId
        })
        res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn: moment().add(expirationInMinutes.toString())
        });


        res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:true});
    } else {
        res.sendStatus(401);
    }
}
app.listen(PORT, () => {
    console.log("app is running on port " + PORT);
});