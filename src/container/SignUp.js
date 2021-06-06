import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import './GlobalVariables'
import {
    Box,
    Button,
    Form,
    FormField,
    Grommet,
    MaskedInput,
    TextInput,
    Grid,
    Select,
    Layer,
    Heading,
    Text
} from 'grommet';
import { Hide, View } from 'grommet-icons';
import { grommet } from 'grommet/themes';
import { urlRegisterStudent, urlVerify } from './Url'
export const SignUp = () => {
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
    const daysInMonth = month => new Date(2021, month, 0).getDate();
    const [name, setName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [phNo, setPhoneNumber] = useState();
    const [rollNo, setRollNumber] = useState();
    const [dob, setDob] = useState('');
    const [yoc, setYoc] = useState();
    const [branch, setBranch] = useState();
    const [section, setSection] = useState();
    const [password, setPassword] = useState();
    const [reveal, setReveal] = useState("")
    const [open, setOpen] = React.useState(false);
    const [otp, setOtp] = useState();
    const onSubmitSignUp = () => {
        let res = checkBranch()
        if (res === false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Roll Number and Branch doesn\'t match'
            })
        }
        if (res && name && lastName && email && dob && yoc && branch && section && password) {
            axios.post(urlRegisterStudent, {
                suserid: rollNo,
                firstname: name,
                email: email,
            }).then(response => {
                console.log(response)
                if(response.status === 400)
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Check your Data'
                    })
                    setOpen(false)
                }
                else
                    setOpen(true)
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Check your Data'
                })
            })
        }
    }

    const checkBranch = () => {
        if (rollNo.substring(8, 11) === branch) {
            return true
        }
        return false
    }
    const onOTPSubmit = () => {
        setOpen(false)
        if (name && lastName && email && dob && yoc && branch && section && password && otp) {
            axios.post(urlVerify, {
                suserid: rollNo,
                lastname: lastName,
                firstname: name,
                dob: dob ? dob : null,
                roll: rollNo,
                branch: branch,
                section: section,
                batch: yoc,
                email: email,
                phnumber: parseInt(phNo),
                password: password,
                otp: otp
            }).then(res => {
                Toast.fire({
                    icon: 'success',
                    title: 'Successfully Registered'
                })
            }).catch(error => {
                Toast.fire({
                    icon: 'error',
                    title: 'OTP Wrong'
                })

            })
        }
    }
    document.body.style.overflow = "hidden"
    return (
        <Grommet full theme={grommet}>
            <Grid
                rows={['xxsmall', 'medium']}
                columns={['medium', 'medium']}
                gap="small"
                areas={[
                    { name: 'left', start: [0, 1], end: [0, 1] },
                    { name: 'right', start: [1, 1], end: [1, 1] },
                ]}
            >

                <Box fill align="center" justify="center" gridArea="left" style={{ marginLeft: "50%" }}>
                    <Box width="medium">
                        <Form
                            onSubmit={onSubmitSignUp}
                        >
                            <FormField label="First Name" name="name">
                                <TextInput
                                    name="name"
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                    placeholder='Registered First Name'
                                />
                            </FormField>
                            <FormField label="Last Name" name="lastName">
                                <TextInput
                                    name="lastName"
                                    value={lastName}
                                    onChange={event => setlastName(event.target.value)}
                                    placeholder='Registered Last Name'
                                />
                            </FormField>
                            <FormField label="Email" name="email">
                                <MaskedInput
                                    name="email"
                                    placeholder='example@gmail.com'
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </FormField>
                            <FormField label="Phone Number" name="phNo" >
                                <MaskedInput
                                    name="phNo"
                                    mask={[
                                        {
                                            length: 10,
                                            regexp: /^[0-9]{1,10}$/,
                                            placeholder: 'Phone Number',
                                        },
                                    ]}
                                    value={phNo}
                                    onChange={event => setPhoneNumber(event.target.value)}
                                />
                            </FormField>
                            <FormField label="Roll No" name="rollNo">
                                <MaskedInput
                                    name="rollNo"
                                    mask={[
                                        { fixed: 'CB.' },
                                        { regexp: /^[\w]+$/, placeholder: 'Branch', length: 2 },
                                        { fixed: '.' },
                                        { regexp: /^[\w]+$/, placeholder: 'Year', length: 2 },
                                        { regexp: /^[\w]+$/, placeholder: 'com', length: 3 },
                                        {
                                            length: 5,
                                            regexp: /^[0-9]{1,10}$/,
                                            placeholder: 'Department rollNo',
                                        },
                                    ]}
                                    placeholder='CB.XX.XX.XXX.XXXXX'
                                    value={rollNo}
                                    onChange={event => setRollNumber(event.target.value)}
                                />
                            </FormField>
                            <Box direction="row" justify="between" margin={{ top: 'large' }}>
                                <Button data-testid="button" id="registerBtn" type="submit" label="Register" primary />
                            </Box>
                        </Form>
                    </Box>
                </Box>
                <Box fill align="center" justify="center" gridArea="right" style={{ marginLeft: "75%" }}>
                    <Box width="medium">
                        <Form
                            onSubmit={onSubmitSignUp}
                        >
                        </Form>
                        <FormField label="Date of Birth" name="dob">
                            <MaskedInput
                                id="dob"
                                mask={[
                                    {
                                        length: 4,
                                        options: Array.from({ length: 6 }, (v, k) => 2004 - k),
                                        regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
                                        placeholder: 'yyyy',
                                    },
                                    { fixed: '-' },
                                    {
                                        length: [1, 2],
                                        options: Array.from({ length: 12 }, (v, k) => k + 1),
                                        regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
                                        placeholder: 'mm',
                                    },
                                    { fixed: '-' },
                                    {
                                        length: [1, 2],
                                        options: Array.from(
                                            {
                                                length: daysInMonth(parseInt(dob.split('/')[0], 10)),
                                            },
                                            (v, k) => k + 1,
                                        ),
                                        regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
                                        placeholder: 'dd',
                                    },

                                ]}
                                value={dob}
                                onChange={event => setDob(event.target.value)}
                            />
                        </FormField>
                        <FormField label="Year of Graduation" name="yoc">
                            <MaskedInput
                                id="yog"
                                mask={[
                                    {
                                        length: 4,
                                        options: Array.from({ length: 5 }, (v, k) => 2025 - k),
                                        regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
                                        placeholder: 'yyyy',
                                    },
                                ]}
                                value={yoc}
                                onChange={event => setYoc(event.target.value)}
                            />
                        </FormField>
                        <Box direction="row" justify="between" margin={{ top: 'medium' }} gap="large">
                            <FormField label="Branch" name="branch" required>
                                <Select id="branch"
                                    options={['CSE', 'ECE', 'EEE', 'EIE', 'MEE', 'AEE', 'CHE', 'PHY', "Choose"]}
                                    value={branch}
                                    defaultValue={"Choose"}
                                    disabled={["Choose"]}
                                    onChange={({ option }) => setBranch(option)}
                                />
                            </FormField>
                            <FormField label="Section" name="branch" >
                                <Select id="section"
                                    options={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Choose']}
                                    value={section}
                                    defaultValue={"Choose"}
                                    disabled={["Choose"]}
                                    onChange={({ option }) => setSection(option)}
                                />
                            </FormField>
                        </Box>
                        <FormField label="Preferred Password" name="passsword">
                            <Box direction="row" justify="between" margin={{ top: 'xxsmall' }}>
                                <TextInput
                                    id="password"
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
                    </Box>
                </Box>
                {open ? (
                    <Layer position="center">
                        <Box pad="medium" gap="small" width="medium">
                            <Heading level={3} margin="none">
                                EMAIL OTP VERIFICATION
                            </Heading>
                            <Text>Enter the OTP</Text>
                            <TextInput
                                name="otp"
                                value={otp}
                                onChange={event => setOtp(event.target.value)}
                                placeholder='One Time Pass'
                            />
                            <Box
                                as="footer"
                                gap="small"
                                direction="row"
                                align="center"
                                justify="end"
                                pad={{ top: 'medium', bottom: 'small' }}
                            >
                                <Button label="Submit" id="otpSubmit" onClick={onOTPSubmit} color="dark-3" />
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
            </Grid>
        </Grommet>
    );
};


SignUp.storyName = 'Controlled input lazy';

export default SignUp