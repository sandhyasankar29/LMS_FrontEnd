import { React, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Grommet,
    TextInput,
    Image,
    Select,
} from 'grommet';
import Swal from 'sweetalert2'
import passwordImage from '../assets/password.svg'
import { grommet } from 'grommet/themes';
import { urlPass } from './Url'
const ForgotPassword = () => {
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
    const [email, setEmail] = useState("")
    const [id, setId] = useState("")
    const options = ['student', 'teacher']
    const onSubmitForgotPassword = () => {
        if (email) {
            axios.post(urlPass, { email: email, id: id })
                .then(res => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Please Check your Email'
                    })
                }).catch(error => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Failed Try Again'
                    })
                })
        }
    }
    document.body.style.overflow = "hidden"
    return (
        <Grommet full theme={grommet}>
            <Box fill align="center" justify="center">
                <Box height="small" width="large" style={{
                    marginBottom: "3%",
                }}>
                    <Image src={passwordImage} fit="contain" />
                </Box>

                <Box width="medium">
                    <Box
                        width="medium"
                        direction="row"
                        align="center"
                        round="small"
                        border
                    >
                        <TextInput
                            plain
                            placeholder="Enter Registered Email"
                            name="email" type="email"
                            //eslint-disable-next-line react/jsx-no-duplicate-props
                            type={'text'}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <Select
                            id="select"
                            name="id"
                            placeholder="Choose.."
                            value={id}
                            options={options}
                            onChange={({ option }) => setId(option)}
                        />
                    </Box>

                    <Box direction="row" justify="center" margin={{ top: 'medium' }}>
                        <Button active={true} onClick={onSubmitForgotPassword} type="submit" label="Get Password" primary />
                    </Box>
                </Box>
            </Box>
        </Grommet>
    );
};

export default ForgotPassword;