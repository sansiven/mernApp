const  mongoose = require("mongoose");
const users = require("../models/User");

let chai = require("chai");
let chaiHttp = require("chai-http");
let mocha = require("mocha");

let app = require("../server");
let should = chai.should();

const validateLoginInput = require("../validaton/login");


chai.use(chaiHttp);

/**
 * Test the login route
 */

describe('/login for the registered users', () => {
    it('it should return a success property as true and a token property with jwt', (done) => {

        let user = {
            email: "john@yopmail.com",
            password: "abcd123"
        }

        chai.request(app)
        .post('/api/users/login')
        .send(user)
        .set('Accept', 'application/json')
        .end((err, res) => {
            
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success')
            res.body.should.have.property('token')
            done();
        });
    });

    it('it should return a emailNot found property', (done) => {

        let user = {
            email: "john@yopmail.com",
            password: "abcd1234"
        }

        chai.request(app)
        .post('/api/users/login')
        .send(user)
        .set('Accept', 'application/json')
        .end((err, res) => {
            
            res.body.should.be.a('object');
            res.body.should.have.property('passwordIncorrect')
            done();
        });
    });

    it('it should return a password incorerct property', (done) => {

        let user = {
            email: "john@gmail.com",
            password: "abcd1234"
        }

        chai.request(app)
        .post('/api/users/login')
        .send(user)
        .set('Accept', 'application/json')
        .end((err, res) => {
            
            res.body.should.be.a('object');
            res.body.should.have.property('emailnotfound')
            done();
        });
    });

}); 

describe('/registering new users', () => {
    it('it should register a new user ', (done) => {

        let user = {
            name: "saugat",
            email: "saugat@gmail.com",
            password: "abcd1234",
            password2: "abcd1234"
        }

        chai.request(app)
        .post('/api/users/register')
        .send(user)
        .set('Accept', 'application/json')
        .end((err, res) => {
            
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('name');
            res.body.should.have.property('email')
            res.body.should.have.property('password')
            res.body.should.have.property('date')


            //res.body.should.have.property('token')
            console.log(res)
            done();
        });
    });

    it('it should show some errors ', (done) => {

        let user = {
            name: "saugat",
            email: "a@y.com",
            password: "abcd1234",
            password2: "abcd12345"
        }

        chai.request(app)
        .post('/api/users/register')
        .send(user)
        .set('Accept', 'application/json')
        .end((err, res) => {
            
            res.body.should.have.property('password2')
            done();
        });
    });

})