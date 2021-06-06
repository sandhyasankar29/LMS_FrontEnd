import { React, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import {
    Box,
    Button,
    Grommet,
    TextInput,
    Image,
    Text,
    Tabs,
    Tab
} from 'grommet';
import { Hide, View, Home } from 'grommet-icons';
import signImage from '../assets/teacher.svg'
import { grommet } from 'grommet/themes';
import './GlobalVariables'
const TeacherSignIn = () => {
    const urlSignIn = 'http://'+{global,ip}.ip+':3001/signinteacher';
    const urlGetOtp = 'http://'+{global,ip}.ip+':3001/getotpsignin';
    const urlVerifyOtp = 'http://'+{global,ip}.ip+':3001/verifysigninotp'
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [reveal, setReveal] = useState(false);
    const [get, setGet] = useState(true)
    const [otp, setOTP] = useState()
    const [roll, setRoll] = useState()
    const onSubmitSignIn = () => {
        if (username && password) {
            axios.post(urlSignIn, { tuserid: username, password: password })
                .then(res => {
                    if ((res.data.status).length > 0) {
                        localStorage.setItem("tuserid", res.data.tuserid)
                        localStorage.setItem("chairperson", res.data.chairperson)
                        localStorage.setItem('firstname', res.data.firstname)
                        localStorage.setItem('lastname', res.data.lastname)
                        history.replace('/teacherdashboard')
                    }
                }).catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Check your Credentials',
                        footer: 'Forgot Password? Try logging in with OTP!</a>'
                    })
                })
        }
    }
    const onSendOTP = () => {
        if (roll) {
            axios.post(urlGetOtp, { userid: roll })
                .then(res => {
                    if ((res.data)) {
                        setGet(false)
                        localStorage.setItem("tuserid", roll)
                        localStorage.setItem("chairperson", res.data.chair)
                        localStorage.setItem('firstname', res.data.firstname)
                        localStorage.setItem('lastname', res.data.lastname)
                    }
                }).catch(error => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Invalid ID'
                    })
                })
        }
    }

    const onSubmitOTP = () => {
        if (otp) {
            axios.post(urlVerifyOtp, { otp: otp })
                .then(res => {
                    if ((res.data)) {
                        history.replace('/teacherdashboard')
                    }
                }).catch(error => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Wrong OTP'
                    })
                })
        }
    }
    document.body.style.overflow = "hidden"
    return (
        <Grommet full theme={grommet}>
            <Box pad="small" justify="start" align="start" >
                <Button primary icon={<Home />} id="HomeBtn" label="Go to Home" hoverIndicator="light-1" onClick={() => { history.replace('/') }} />
            </Box>
            <Box fill align="center" justify="center">
                <Box height="small" width="large" style={{
                    marginBottom: "3%",
                }}>
                    <Image src={signImage} fit="contain" />
                </Box>
                <Tabs>
                    <Tab title="Credentials">
                        <Box width="medium" pad="small">
                            <Box
                                width="medium"
                                direction="row"
                                align="center"
                                round="small"
                                border
                                style={{
                                    marginBottom: "10%",
                                }}>
                                <TextInput
                                    plain
                                    placeholder="Username"
                                    name="username" type="name"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}

                                />
                            </Box>

                            <Box
                                width="medium"
                                direction="row"
                                align="center"
                                round="small"
                                border
                            >
                                <TextInput
                                    plain
                                    placeholder="Password"
                                    name="password" type="password"
                                    // eslint-disable-next-line react/jsx-no-duplicate-props
                                    type={reveal ? 'text' : 'password'}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <Button
                                    icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
                                    onClick={() => setReveal(!reveal)}
                                />
                            </Box>

                            <Box direction="row" justify="between" margin={{ top: 'medium' }}>
                                <Text id="newAcc" color="purple" onClick={() => { history.push('/teacherregister') }} >Not Signed Up?</Text>
                                <Button data-testid="button" active={true} onClick={onSubmitSignIn} id="submitBtn" type="submit" label="Log In" primary />
                            </Box>
                            <Box data-testid="button2" pad="medium" justify="center" align="center" gap="medium">
                                <Button hoverIndicator="light-1">
                                    <Text color="purple" onClick={() => { history.push('/forgotpassword') }} >Forgot Password</Text>
                                </Button>
                            </Box>
                        </Box>
                    </Tab>
                    <Tab title="OTP" id="otpLogin">
                        {get ?
                            <div>
                                <TextInput

                                    style={{ marginTop: "10%" }}
                                    placeholder="Enter Roll No"
                                    name="roll"
                                    // eslint-disable-next-line react/jsx-no-duplicate-props
                                    type={'text'}
                                    value={roll}
                                    onChange={(event) => setRoll(event.target.value)}
                                />
                                <Button style={{ marginTop: "7%" }} active={true} onClick={onSendOTP} id="submitBtn" type="submit" label="Get OTP" primary /></div> : <Box pad="small" width="medium">
                                <Box
                                    width="medium"
                                    direction="row"
                                    align="center"
                                    round="small"
                                    border
                                >
                                    <TextInput
                                        plain
                                        placeholder="Enter OTP"
                                        name="otp" type="password"
                                        // eslint-disable-next-line react/jsx-no-duplicate-props
                                        type={reveal ? 'text' : 'password'}
                                        value={otp}
                                        onChange={(event) => setOTP(event.target.value)}
                                    />
                                    <Button
                                        icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
                                        onClick={() => setReveal(!reveal)}
                                    />
                                </Box>

                                <Box direction="row" justify="between" margin={{ top: 'medium' }}>
                                    <Button hoverIndicator="light-1">
                                        <Box data-testid="button3" pad="small" direction="row" align="center" gap="small">
                                            <Text color="purple" onClick={() => { setGet(true) }} >Cancel</Text>
                                        </Box>
                                    </Button>
                                    <Button data-testid="button" id="submitOTP" active={true} onClick={onSubmitOTP} type="submit" label="Submit OTP" primary />
                                </Box>
                            </Box>}
                    </Tab>
                </Tabs>
            </Box>
        </Grommet>
    );
};

export default (TeacherSignIn);