/**
 * Created by Raphson on 10/21/16.
 */
import React from 'react';
import { Link, hashHistory } from 'react-router';
import NavBar from '../NavBar/index';
import Footer from '../Footer/Index';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';
import MyInput from '../forms/Input';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';

export default class ResetPaasword extends React.Component {
    constructor(){
        super();
        this.state = {
            canSubmit: false
        }
    }

    componentDidMount = () => {
        UserStore.addChangeListener(this.handleLogin, 'login');
    }

    componentWillUnmount = () => {
        UserStore.removeChangeListener(this.handleLogin, 'login');
    }

    handleReset = () => {
        let data = UserStore.getLoginResult();
        if(data.status == 401){
            Alert.error(data.data.message, { position: 'top-right',  effect: 'bouncyflip'});
        } else {
            Auth.setToken(data.data);
            Alert.success('Login Successful', { position: 'top-right',  effect: 'bouncyflip'});
            hashHistory.push('/');
        }
    }

    handleSubmit = (data) => {
        console.log(data);
        /*let loginPayload = {
            email: data.email,
            password: data.password
        };

        UserActions.login(loginPayload);*/
    }

    enableButton = () => {
        this.setState({ canSubmit: true });
    };

    disableButton = () => {
        this.setState({ canSubmit: false });
    };

    render(){
        return (
            <span>
                <NavBar />
                {/* Main container for Password Reset Page View */}
                <div style={{minHeight: 580}} className="main-container">
                    <section>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 col-md-offset-4">
                                    <Formsy.Form className="form-signin" role="form" onValidSubmit={this.handleSubmit}
                                         onValid={this.enableButton} onInvalid={this.disableButton}>
                                        <h5>Request password reset</h5>
                                        <hr className="colorgraph" />
                                        <MyInput className="form-group" name="email" title=""
                                                 placeholder="Enter your E-mail" validations="isEmail"
                                                 validationError="Email is required." required  />
                                        <p>
                                            <button type="submit" className="btn btn-lg btn-block">
                                                Request Password reset</button>
                                        </p>
                                        <p className="text-center">Remembered your password?
                                            <a href="/auth/login">Login here</a></p>
                                    </Formsy.Form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {/* End Main Container for Password Reset Page View */}
                <Footer />
            </span>
        );
    }
}