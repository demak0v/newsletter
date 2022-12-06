const bodyParser = require("body-parser")
const request = require("request")
const express = require("express")
const https = require("https")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
      let name = req.body.name
      let surname = req.body.surname
      let email = req.body.email

      const url = "https://us13.api.mailchimp.com/3.0/lists/3aa5895e4d"
      const options = {
        method: "POST",
        auth: "sasha:Add221ca82b5f1eb8de9cbdb378f4b32a-us13"
      }

      const data = {
        members: [{
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: name,
            LNAME: surname
          }
        }]
      }

      const jsonData = JSON.stringify(data)

      const request = https.request(url, options, function(response) {

          if (response.statusCode < 200 || response.statusCode > 299) { // (I don"t know if the 3xx responses come here, if so you"ll want to handle them appropriately
            console.log("wow")
            res.sendFile(__dirname + "/sfailure.html")
          } else {
            console.log("!!!!")
            res.sendFile(__dirname + "/success.html")
          }

            console.log('statusCode:', response.statusCode);
          })

        request.write(jsonData)
        //we've created a const request which we than added info to send to server to,
        //should read about that in documentation
        request.end()
      })

      app.post("/sfailure", function(req, res) {
        res.redirect("/")
      })
    // dd221ca82b5f1eb8de9cbdb378f4b32a-us13
    // audid
    // 3aa5895e4d


    app.listen(3003, () => {
      console.log("hi 3000")
    })
