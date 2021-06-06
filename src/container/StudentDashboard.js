import { React, useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Grommet,
    Text,
    Anchor,
    Header,
    Nav,
    TextInput,
    FormField,
    Form,
    CheckBox,
    MaskedInput,
    Select,
    Layer
} from 'grommet';
import Swal from 'sweetalert2'
import { FormClose, StatusGood, User } from 'grommet-icons';
import { grommet } from 'grommet/themes';
import LogOut from './LogOut';
import { urlLeave, urlTeacher } from './Url.js'
const StudentDashboard = () => {
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
    const [open, setOpen] = useState(true);
    const [dos, setDos] = useState('');
    const [doe, setDoe] = useState('');
    const [branch, setBranch] = useState(localStorage.getItem('suserid').substring(8, 11));
    const [tuserid, settuserid] = useState(null);
    const [haveAlias, setHaveAlias] = useState(false);
    const [teachers, setTeachers] = useState([{ tuserid: "Choose" }]);
    useEffect(() => { getTeacherList(branch) });
    const getTeacherList = (dept) => {
        setBranch(dept)
        axios.get(urlTeacher + dept).then(res => {
            if (res.data !== 'NA') { setTeachers(res.data) }
            else {
                setTeachers([{ tuserid: "Choose" }])
                settuserid(null)
            }
        }).catch(error => {
            Toast.fire({
                icon: 'error',
                title: 'Invalid Dates',
            })
        })
    }
    const checkCurrDate = (dosFunc, doeFunc, aliasFunc) => {
        var today = new Date();
        var newDos = new Date(dosFunc)
        var newDoe = new Date(doeFunc)
        if (aliasFunc && ((today < newDos && today > newDoe) || (today > newDoe && today < newDos))) {
            return false
        }
        else if (!aliasFunc && newDos < today) {
            return false
        }
        else if (newDos > newDoe) {
            return false
        }
        return true
    }
    const onSubmitLeaveRecord = (value) => {
        let res = checkCurrDate(dos, doe, haveAlias)
        if (res === false) {
            Toast.fire({
                icon: 'error',
                title: 'Invalid Dates',
            })
        }
        if (res && value && tuserid !== null && tuserid !== "Choose" && branch) {
            axios.post(urlLeave, { suserid: localStorage.getItem("suserid"), tuserid: value.tuserid.split('-')[0].trim(), dos: value.dos, doe: value.doe, reason: value.reason, cert: value.alias ? value.alias : 'NA', branch: localStorage.getItem('suserid').substring(8, 11) }).then(response => {
                if (response.data.status === "Redundant copies of Leave Records") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Unable to Submit your request',
                        text: res.data.status,
                        footer: 'Verify the Form Data'
                    })
                }
                else {
                    Toast.fire({
                        icon: 'success',
                        title: 'Request Registered',
                    })
                }
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Unable to Submit your request',
                    footer: 'Verify the Form Data'
                })
            })
        }
    }
    const onClose = () => setOpen(undefined);
    const items = [
        { label: 'Dashboard', href: '/studentDashboard', value: 0, id: 'dashboard' },
        { label: 'Past Application', href: '/studentpastapplication', value: 1, id: 'pastApplication' },
        { label: 'Button', href: '#', value: 2 },
    ];
    return (
        <Grommet full theme={grommet}>
            <Header background="dark-1" pad="small">
                <Box direction="row" align="center" gap="small">
                    <User />
                    <Anchor color="white">
                        Welcome {localStorage.getItem('firstnameStudent')}
                    </Anchor>
                </Box>
                <Nav direction="row">
                    {items.map((item) => (
                        item.value !== 2 ?
                            <Anchor id={item.id} href={item.href} label={item.label} key={item.label} /> : <LogOut route={'/signin'} />
                    ))}
                </Nav>
            </Header>
            <Box fill align="center" justify="center">
                <Box width="medium" >
                    <Form
                        validate="blur"
                        onSubmit={({ value }) => onSubmitLeaveRecord(value)}
                        onReset={() => {
                            setDoe("")
                            setDos("")
                            setHaveAlias(false)
                        }}
                    >
                        <FormField label="TUserID" name="tuserid" required>
                            <Select
                                options={teachers.map(item => {
                                    return `${item.tuserid} - ${item.firstname} ${item.lastname}`
                                })}
                                value={tuserid}
                                defaultValue={"Choose"}
                                disabled={["Choose"]}
                                onChange={({ option }) => settuserid(option)}
                                name="tuserid"
                                id="teacher__input"
                            />
                        </FormField>
                        <Box direction="row" justify="between">
                            <FormField style={{ marginRight: "5%" }} label="Date of Start" name="dos" required>
                                <MaskedInput
                                    mask={[
                                        {
                                            length: 4,
                                            options: Array.from({ length: 1 }, (v, k) => 2021 - k),
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
                                                    length: daysInMonth(parseInt(dos.split('/')[0], 10)),
                                                },
                                                (v, k) => k + 1,
                                            ),
                                            regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
                                            placeholder: 'dd',
                                        },

                                    ]}
                                    name='dos'
                                    value={dos}
                                    onChange={event => setDos(event.target.value)}
                                />
                            </FormField>
                            <FormField label="Date of End" name="doe" required>
                                <MaskedInput
                                    mask={[
                                        {
                                            length: 4,
                                            options: Array.from({ length: 1 }, (v, k) => 2021 - k),
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
                                                    length: daysInMonth(parseInt(doe.split('/')[0], 10)),
                                                },
                                                (v, k) => k + 1,
                                            ),
                                            regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
                                            placeholder: 'dd',
                                        },

                                    ]}
                                    name='doe'
                                    value={doe}
                                    onChange={event => setDoe(event.target.value)}
                                />
                            </FormField>
                        </Box>
                        <FormField name="haveAlias">
                            <CheckBox
                                name="haveAlias"
                                label="Medical Leave?"
                                checked={haveAlias}
                                onChange={() => setHaveAlias(!haveAlias)}
                            />
                        </FormField>
                        {haveAlias && (
                            <FormField label="Paste the Google Drive Shareable link of the medical certificate" name="alias" required>
                                <TextInput name="alias" />
                            </FormField>
                        )}
                        <FormField label="Reason" name="reason" required>
                            <TextInput name="reason" />
                        </FormField>
                        <Box direction="row" justify="between" margin={{ top: 'medium' }}>
                            <Button type="reset" label="Reset" id="resetBtn" />
                            <Button type="submit" id="submitBtn" label="Submit" primary />
                        </Box>
                    </Form>
                </Box>
            </Box>
            {open && <Layer
                position="bottom"
                modal={false}
                margin={{ vertical: 'medium', horizontal: 'small' }}
                onEsc={onClose}
                responsive={false}
                plain
            >
                <Box
                    align="center"
                    direction="row"
                    gap="small"
                    justify="between"
                    round="medium"
                    elevation="medium"
                    pad={{ vertical: 'xsmall', horizontal: 'small' }}
                    background="status-ok"
                >
                    <Box align="center" direction="row" gap="xsmall">
                        <StatusGood />
                        <Text>
                            Succcesfully Signed In To Student Portal
              </Text>
                    </Box>
                    <Button icon={<FormClose />} onClick={onClose} plain />
                </Box>
            </Layer>}
        </Grommet>
    );
};

export default StudentDashboard;