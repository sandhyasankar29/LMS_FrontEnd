import { React, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Grommet,
    TextInput,
    Image,
    Anchor,
    Header,
    Nav,
    Text,
    Heading,
    Layer,
    Form,
    FormField,
    MaskedInput,

} from 'grommet';
import { Hide, View, User } from 'grommet-icons';
import passImage from '../assets/teacherpass.svg'
import LogOut from './LogOut';
import { grommet } from 'grommet/themes';
import Swal from 'sweetalert2'
import './GlobalVariables'
const TeacherPasswordChange = () => {
    const urlChange = 'http://'+{global,ip}.ip+':3001/changepassword';
    const urlVerify = 'http://'+{global,ip}.ip+':3001/verifyteacherotp';
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
    const [password, setPassword] = useState("")
    const [newpass, setPass] = useState('')
    const [email, setEmail] = useState("")
    const [reveal, setReveal] = useState(false);
    const [open, setOpen] = useState(false);
    const [otp, setOtp] = useState();
    const items = [
        { label: 'Dashboard', href: '/teacherdashboard', value: 0 },
        { label: 'Password Change', href: '/teacherchangepassword', value: 1 },
        { label: 'Button', href: '#', value: 2 },
    ];
    const onSubmitPass = () => {
        if (email && password) {
            axios.post(urlChange, {
                tuserid: localStorage.getItem('tuserid'),
                password: password,
                email: email,
            }).then(res => {
                setOpen(true)
                setEmail('')
                setPassword('')
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Verify the Credentials',
                })
            })
        }
    }
    const onOTPSubmit = () => {
        setOpen(false)
        if (newpass && otp) {
            axios.post(urlVerify, {
                tuserid: localStorage.getItem('tuserid'),
                password: newpass,
                otp: otp
            }).then(res => {
                Toast.fire({
                    icon: 'success',
                    title: 'Password changed'
                })
            }).catch(error => {
                Toast.fire({
                    icon: 'error',
                    title: 'OTP Wrong'
                })
            })
        }
    }
    return (
        <Grommet theme={grommet}>
            <Header background="dark-1" pad="small">
                <Box direction="row" align="center" gap="small">
                    <User />
                    <Anchor color="white" href="#">
                        Welcome {localStorage.getItem('tuserid')}
                    </Anchor>
                </Box>
                <Nav direction="row">
                    {items.map(item => (
                        item.value !== 2 ? <Anchor href={item.href} label={item.label} key={item.label} /> : <LogOut route={'/teachersignin'} />
                    ))}
                </Nav>
            </Header>
            <Box style={{ marginTop: "7%" }} fill align="center" justify="center">
                <Box height="small" width="large" style={{
                    marginBottom: "3%",
                }}>
                    <Image src={passImage} fit="contain" />
                </Box>
                <Form>
                    <Box width="medium" justify="center" >
                        <FormField label="Email" name="email">
                            <MaskedInput
                                name="email"
                                placeholder='example@gmail.com'
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </FormField>
                        <FormField label="Old Password" name="passsword">
                            <Box direction="row" justify="between" margin={{ top: 'xxsmall' }}>
                                <TextInput
                                    plain
                                    type={reveal ? 'text' : 'password'}
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                                <Button
                                    icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
                                    onClick={() => setReveal(!reveal)}
                                />
                            </Box>
                        </FormField>
                        <Box direction="row" justify="center" margin={{ top: 'medium' }}>
                            <Button data-testid="button" active={true} type="submit" label="Request Password Change" onClick={onSubmitPass} primary />
                        </Box>
                    </Box>
                </Form>
                {open ? (
                    <Layer position="center">
                        <Box pad="medium" gap="small" width="medium">
                            <Heading level={3} margin="none">
                                MOBILE OTP VERIFICATION
                            </Heading>
                            <Text>Enter the OTP</Text>
                            <TextInput
                                name="otp"
                                value={otp}
                                onChange={event => setOtp(event.target.value)}
                                placeholder='One Time Pass'
                            />
                            <TextInput
                                name="newpass"
                                value={newpass}
                                onChange={event => setPass(event.target.value)}
                                placeholder='Enter Preferred Password'
                            />
                            <Box
                                as="footer"
                                gap="small"
                                direction="row"
                                align="center"
                                justify="end"
                                pad={{ top: 'medium', bottom: 'small' }}
                            >
                                <Button label="Submit" onClick={onOTPSubmit} color="dark-3" />
                                <Button
                                    label={
                                        <Text color="white">
                                            <strong>Cancel</strong>
                                        </Text>
                                    }
                                    onClick={() => { setOpen(false) }}
                                    primary
                                    color="status-critical"
                                />
                            </Box>
                        </Box>
                    </Layer>
                ) : null}
            </Box>
        </Grommet>
    );
};

export default TeacherPasswordChange;