const credentials = require(`${__dirname}/credentials.json`);
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const userData = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: { FNAME: firstName, LNAME: lastName },
      },
    ],
  };

  const userDataJson = JSON.stringify(userData);
  const APIKey = "8d43ea322139d297463a1d3dd0e0697f-us17";
  const listID = "f694b14a63";
  const url = `https://us17.api.mailchimp.com/3.0/lists/${credentials.listID}`;
  const options = {
    method: "POST",
    auth: `harmsway:${credentials.apiKey}`,
  };

  const request = https.request(url, options, (response) => {
    response.on("data", (data) => {
      const errors = JSON.parse(data).errors;

      if (response.statusCode === 200 && errors.length === 0) {
        res.sendFile(`${__dirname}/done.html`);
      } else {
        res.sendFile(`${__dirname}/error.html`);
      }
    });
  });

  request.write(userDataJson);
  request.end();
});

app.post("/home", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening On Port ${process.env.PORT || 3000}`)
);
