import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {


    state = {
        name: "",
        email: "",
        password: "",
        password2: "",
        errors: {}
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history); 
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i>
                            Back To Home
                        </Link>
                        <div className="col s12" style={{paddingLeft:"11px"}}>
                            <h4><b>Register</b> Below</h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log In</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="input-field col s12">
                                <input 
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={this.state.errors.name ? 'invalid' : ''}
                                />
                                <label htmlFor="name">Name</label>
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <input 
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={this.state.errors.email ? 'invalid' : ''}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">{errors.email}</span>

                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={this.state.errors.password ? 'invalid' : ''}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    className={this.state.errors.password2 ? 'invalid' : ''}
                                />
                                <label htmlFor="password2">Confirm Password</label>
                                <span className="red-text">{errors.password2}</span>
                            </div>
                            <div className="col s12" style={{paddingLeft: "11px"}}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                        Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
//allows us to get our state from redux and map it to props which we can use inside components
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    {registerUser}
)(withRouter(Register));