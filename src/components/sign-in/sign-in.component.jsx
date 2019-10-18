import React from "react";

import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import {
  googleSignInStart,
  userSignInStart
} from "../../redux/user/user.actions";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { userSignInStart } = this.props;

    const { email, password } = this.state;

    userSignInStart(email, password);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { googleSignIn } = this.props;
    return (
      <div className="sign-in">
        <h2>I aleady have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="Email"
            required
          />
          {/* <label>Email</label> */}

          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="Password"
            required
          />
          {/* <label>Password</label> */}

          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton
              type="button"
              // onClick={signInWithGoogle}
              onClick={googleSignIn}
              isGoogleSignIn
            >
              Sign in google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignIn: () => dispatch(googleSignInStart()),
  userSignInStart: (email, password) =>
    dispatch(userSignInStart({ email, password }))
});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
