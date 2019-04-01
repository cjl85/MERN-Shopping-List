# MERN-Shopping-List

This is a shopping list built with the MERN stack - (Mongodb - database, Express - framework, React - frontend, and Node - server-side) with Redux for state management.

Reactstrap and React-Transition-Group were also used for the layout (buttons, toggling, color, etc) as well as for entering 
and exiting transititons for components.

To get started, please `git clone` the repository and be sure to `npm install` as well to account for the missing `node_modules`. Also be sure to add your `MONGO_URI` to the default.json file. Please be sure you set an env variable and the jwtSecret on deployment as well. 

Use 'npm run dev' after installing 'concurrently' to run both the client and server at the same time. 

## Register/LogIn

Register a user with name, email, and password. Only logged in users will be able to contribute to the list.

Sample Email/PW that you can use to test the list:

Email: cjl@gmail.com
   PW: 123456


## Running the tests

Test-Driven Development(TDD) was used in building this app utilizing Jasmine (https://jasmine.github.io/). Unit and integration tests were written for the different models with CRUD operations in mind. `npm test` can be run in order to see if the specs pass.

`npm test /client/src/spec/integration/users_spec.js`

The unit tests test that each respective model is created properly as well as include the proper relationships with other models if applicable.

The integration tests are for all the CRUD operations for each respective model. Below is an example for the users_spec file.

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
                    email: "cjl@gmail.com",
                    password: "123456"
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
