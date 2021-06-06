import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Welcome from './Welcome';
import StudentDashboard from './StudentDashboard';
import AdminTeacherVerify from './AdminTeacherVerify';
import AdminSignIn from './AdminSignIn';
import { history } from './history';
import ForgotPassword from './ForgotPassword';
import TeacherSignIn from './TeacherSignIn';
import TeacherRegister from './TeacherRegister';
import TeacherDashboard from './TeacherDashboard';
import TeacherPasswordChange from './TeacherPasswordChange';
import StudentPastApplication from './StudentPastApplication';
import RevokeAccess from './RevokeAccess';
function Routes() {
    document.body.style.overflow = "hidden"
    return (
        <Router history={history}>
            <div>
                <div>
                    <Switch>
                        <Route path="/" component={Welcome} exact={true} />
                        <Route path="/signin" component={SignIn} exact={true} />
                        <Route path="/studentDashboard" component={StudentDashboard} exact={true} />
                        <Route path="/signup" component={SignUp} exact={true} />
                        <Route path='/adminsignin' component={AdminSignIn} exact={true} />
                        <Route path='/adminteacherverify' component={AdminTeacherVerify} exact={true} />
                        <Route path='/adminrevoke' component={RevokeAccess} exact={true} />
                        <Route path='/forgotpassword' component={ForgotPassword} exact={true} />
                        <Route path='/teachersignin' component={TeacherSignIn} exact={true} />
                        <Route path='/teacherregister' component={TeacherRegister} exact={true} />
                        <Route path='/teacherdashboard' component={TeacherDashboard} exact={true} />
                        <Route path='/teacherchangepassword' component={TeacherPasswordChange} exact={true} />
                        <Route path='/studentpastapplication' component={StudentPastApplication} exact={true} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default Routes;