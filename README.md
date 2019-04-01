# MERN-Shopping-List

This is a shopping list built with the MERN stack - (Mongodb - database, Express - framework, React - frontend, and Node - server-side) with Redux for state management.

Reactstrap and React-Transition-Group were also used for the layout (buttons, toggling, color, etc) as well as for entering 
and exiting transititons for components.

To get started, please `git clone` the repository and be sure to `npm install` as well to account for the missing `node_modules`. Also be sure to add your `MONGO_URI` to the default.json file. Please be sure you set an env variable and the jwtSecret on deployment as well. 

Use 'npm run dev' after installing 'concurrently' to run both the client and server at the same time. 

## Register/LogIn

Register a user with name, email, and password. Only logged in users will be able to contribute to the list.


## Running the tests

Test-Driven Development(TDD) was used in building this app utilizing Jasmine (https://jasmine.github.io/). All the tests can be found in the /client/spec file. Unit and integration tests were written for the different models with CRUD operations in mind. From the command line you can use npm test {test file pathway to test.

$ npm test ./client/src/spec/integration/lists_spec.js
Example
The unit tests test that each respective model is created properly as well as proper relationships with other models if applicable.

The integration tests for all the CRUD operations for each respective model. Below is an example for the lists_spec file.

describe("route : users", () => {
    // Connect to mongo database
    beforeEach((done) => {
        mongoose
            .connect(mongoURI)
            .then((res) => { 
                List.create({
                    title: "First List",
                })
                .then((list) => {
                    this.list = list;
                    done();
                })
            })
            .catch(err => {
                console.log(err);
                done();
            })
    });

    describe("GET /lists", () => {
  
        it("should return a status code 200", (done) => {
            request.get(base, (err, res, body) => {
              expect(res.statusCode).toBe(200);
              done();
            });
          });
      
    });

    describe("POST /lists/create", () => {
        const options = {
            url: `${base}/`,
            form: {
                text: "My First List",
            }
        };

        it("should create a new list and redirect", (done) => {

            request.post(options, (err, res, body) => {
                List.findOne({where: {text: "My First List"}})
                .then((list) => {
                    // expect(res.statusCode).toBe(303);
                    expect(list.title).toBe("My First List");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
            })
        })
    });


    describe("GET /lists/:id", () => {

        it("should render a view with the selected list", (done) => {
          request.get(`${base}/${this.list.id}`, (err, res, body) => {
            expect(err).toBeNull();
            done();
          });
        });
    });


    describe("POST /lists/:id/destroy", () => {
        it("should delete the list with the associated ID", (done) => {
          List.all()
          .then((lists) => {
            const listCountBeforeDelete = lists.length;
            expect(listCountBeforeDelete).toBe(1);
            request.post(`${base}/${this.list.id}/destroy`, (err, res, body) => {
              List.all()
              .then((lists) => {
                expect(err).toBeNull();
                expect(lists.length).toBe(listCountBeforeDelete - 1);
                done();
              })
   
            });
          });
        });
     });
    }




