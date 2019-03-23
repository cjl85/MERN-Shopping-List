
const request  = require("request");
const server   = require('../../server');
const base     = "http://localhost:3001/api/users";
const mongoose = require('mongoose');
// import model
const User = require('../../models/user');
const mongoURI = require('../../config/default.json').mongoURI;

describe("route : user", () => {
    // Connect to mongo database
    beforeEach((done) => {
        mongoose
            .connect(mongoURI, {
              useNewUrlParser: true
            })
            .then(() => {
                done();
            })
            .catch(err => {
                console.log(err);
                done();
            });
    });

    // Register user
    describe("POST /user", () => {
        it("should create a new user with valid values and redirect", (done) => {

            const options = {
                url: `${base}/register`,
                form: {
                    email: "user@example.com",
                    password: "botinty123"
                }
            }

            request.post(options, (err, res, body) => {
                User.findOne({where: {email: "user@example.com"}})
                .then((user) => {
                    expect(user).not.toBeNull();
                    expect(user.email).toBe("user@example.com");
                    expect(user.id).toBe(1);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
            });
        })


    it("should not create a new user with invalid attributes and redirect", (done) => {
        request.post(
          {
            url: `${base}/register`,
            form: {
              email: "no",
              password: "123456789"
            }
          },
          (err, res, body) => {
            User.findOne({where: {email: "no"}})
            .then((user) => {
              expect(user).toBeNull();
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
    });
});
});
