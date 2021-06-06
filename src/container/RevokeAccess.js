import { React, useState } from 'react';
import axios from 'axios';
import { Box, Grommet, Button, Image, Header, Nav, Anchor, Select, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { User } from 'grommet-icons';
import passImage from '../assets/lock.svg'
import LogOut from './LogOut';
import Swal from 'sweetalert2'
import './GlobalVariables'
export const RevokeAccess = () => {
    const urlRevoke = 'http://'+{global,ip}.ip+':3001/revoke';
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
    const [id, setId] = useState('')
    const [userid, setUserId] = useState()
    const items = [
        { label: 'Verify Teacher', href: '/adminteacherverify', value: 0 },
        { label: 'Revoke Access', href: '/adminrevoke', value: 1 },
        { label: 'Button', href: '#', value: 2 },

    ];
    const revoke = () => {
        if (id && userid) {
            axios.post(urlRevoke, { id: id, userid: userid })
                .then(res => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Success'
                    })
                }).catch(error => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Failed'
                    })
                })
        }
    }
    const options = ['student', 'teacher']
    return (
        <Grommet full theme={grommet}>
            <Header background="dark-1" pad="small">
                <Box direction="row" align="center" gap="small">
                    <User />
                    <Anchor color="white" >
                        Welcome Admin
                </Anchor>
                </Box>
                <Nav direction="row">
                    {items.map(item => (
                        item.value !== 2 ? <Anchor href={item.href} label={item.label} key={item.label} /> : <LogOut route={'/adminsignin'} />
                    ))}
                </Nav>

            </Header>
            <Box fill align="center" justify="center">
                <Box height="small" width="large" style={{
                    marginBottom: "3%",
                }}>
                    <Image src={passImage} fit="contain" />
                </Box>

                <Box width="medium">
                    <Box
                        width="large"
                        direction="row"
                        align="center"
                        round="small"
                        border
                    >
                        <TextInput
                            plain
                            placeholder="Enter Registered ID"
                            name="userid" type="text"
                            //eslint-disable-next-line react/jsx-no-duplicate-props
                            type={'text'}
                            value={userid}
                            onChange={(event) => setUserId(event.target.value)}
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
                        <Button active={true} onClick={revoke} type="submit" label="Revoke" primary />
                    </Box>
                </Box>
            </Box>
        </Grommet>)
}

export default RevokeAccess;