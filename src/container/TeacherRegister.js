import React, { useState } from 'react';
import axios from 'axios';
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
} from 'grommet';
import Swal from 'sweetalert2'
import { Hide, View } from 'grommet-icons';
import { grommet } from 'grommet/themes';
import { urlRegisterTeacher } from './Url';
export const TeacherRegister = () => {
    const daysInMonth = month => new Date(2021, month, 0).getDate();
    const [name, setName] = useState('');
    const [lastName, setlastName] = useState('');
    const [phNo, setPhoneNumber] = useState();
    const [email, setEmail] = useState('');
    const [rollNo, setRollNumber] = useState();
    const [doj, setDoj] = useState('');
    const [branch, setBranch] = useState();
    const [password, setPassword] = useState();
    const [reveal, setReveal] = useState("")
    const onSubmitSignUp = () => {
        if (name && lastName && email && branch && password && doj && phNo) {
            axios.post(urlRegisterTeacher, {
                tuserid: rollNo,
                lastname: lastName,
                firstname: name,
                doj: doj,
                branch: branch,
                email: email,
                password: password,
                phoneNumber: phNo
            }).then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Registered',
                    text: 'Please Wait for Admin\'s Approval'
                })
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: 'Please Check the Data'
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
                            <FormField label="Teacher ID" name="rollNo">
                                <MaskedInput
                                    name="rollNo"
                                    placeholder='xxDeptxxx'
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
                        <FormField label="Date of Joining" >
                            <MaskedInput
                                name="doj"
                                mask={[
                                    {
                                        length: 4,
                                        options: Array.from({ length: 28 }, (v, k) => 2021 - k),
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
                                                length: daysInMonth(parseInt(doj.split('/')[0], 10)),
                                            },
                                            (v, k) => k + 1,
                                        ),
                                        regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
                                        placeholder: 'dd',
                                    },

                                ]}
                                value={doj}
                                onChange={event => setDoj(event.target.value)}
                            />
                        </FormField>
                        <Box margin={{ top: 'medium' }} gap="large">
                            <FormField label="Branch" name="branch" required>
                                <Select
                                    id="branch"
                                    options={['CSE', 'ECE', 'EEE', 'EIE', 'MEE', 'AEE', 'CHE', 'PHY', "Choose"]}
                                    value={branch}
                                    defaultValue={"Choose"}
                                    disabled={["Choose"]}
                                    onChange={({ option }) => setBranch(option)}
                                />
                            </FormField>
                        </Box>
                        <FormField label="Preferred Password" >
                            <Box direction="row" justify="between" margin={{ top: 'xxsmall' }}>
                                <TextInput
                                    name="passsword"
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
            </Grid>
        </Grommet>
    );
};



export default TeacherRegister;