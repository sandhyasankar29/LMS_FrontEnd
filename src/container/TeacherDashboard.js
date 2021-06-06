import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import {
    Box,
    Button,
    Grommet,
    Text,
    Accordion, AccordionPanel,
    Header, Nav,
    Anchor, Form,
    FormField, TextInput,
    TextArea, Layer
} from 'grommet';
import { FormClose, Info, StatusGood, User, Search } from 'grommet-icons';
import { grommet } from 'grommet/themes';
import LogOut from './LogOut';
import './GlobalVariables'
const TeacherDashboard = () => {
    const urlTeacherLeave = 'http://'+{global,ip}.ip+':3001/teacherleaverecords/';
    const urlChairLeave = 'http://'+{global,ip}.ip+':3001/chairleaverecords/';
    const urlDecision = 'http://'+{global,ip}.ip+':3001/decisionteacher';
    const urlNotify = 'http://'+{global,ip}.ip+':3001/notifystudent';
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
    const [count, changeCount] = useState(0)
    const [search, setSearch] = useState("");
    useEffect(() => {
        (localStorage.getItem("chairperson") !== 'Yes') ? axios.get(urlTeacherLeave + localStorage.getItem("tuserid"))
            .then(res => {
                if (res.data !== "No Data Available as of Now") {
                    setStudent(res.data)
                }
                else {
                    setStudent(null)
                }
            }).catch(error => {
                Toast.fire({
                    icon: "error",
                    title: 'Detail Fetch Failure'
                })
            }) : axios.get(urlChairLeave + localStorage.getItem("tuserid").substring(2, 5))
                .then(res => {
                    if (res.data !== "No Data Available as of Now") {
                        setStudent(res.data)
                    }
                    else {
                        setStudent(null)
                    }
                }).catch(error => {
                    Toast.fire({
                        icon: "error",
                        title: 'Detail Fetch Failure'
                    })
                })
    }, [count, Toast]);
    const decisionSubmit = (decision, suserid, dos, doe, reason) => {
        if (localStorage.getItem("chairperson") === 'Yes') {
            if (decision === "Verified") {
                decision = "Approved"
            }
        }
        axios.post(urlDecision, { status: decision, suserid: suserid, dos: dos })
            .then(res => {
                if (decision === "Approved" || decision === "Rejected") {
                    axios.post(urlNotify, { status: decision, suserid: suserid, dos: dos, doe: doe, reason: reason })
                        .then(response => {
                            Toast.fire({
                                icon: "success",
                                title: 'SMS Sent'
                            })
                        })
                        .catch(err => {
                            Toast.fire({
                                icon: "error",
                                title: 'Failed to send SMS'
                            })
                        })
                }
                else {
                    Toast.fire({
                        icon: "success",
                        title: 'Decision Registered'
                    })
                }
            }).catch(error => {
                Toast.fire({
                    icon: "error",
                    title: 'Detail Fetch Failure'
                })
            })
        changeCount(count + 1)
    }

    const [student, setStudent] = useState()
    const [open, setOpen] = useState(true);
    const onClose = () => setOpen(undefined);
    const items = [
        { label: 'Dashboard', href: '/teacherdashboard', value: 0 },
        { label: 'Password Change', href: '/teacherchangepassword', value: 1 },
        { label: 'Button', href: '#', value: 2 },
    ];
    return (
        <Grommet full theme={grommet} style={{ overflowY: 'scroll' }}>
            <Header background="dark-1" pad="small">
                <Box direction="row" align="center" gap="small">
                    <User />
                    <Anchor color="white" href="#">
                        Welcome {localStorage.getItem('firstname')}
                    </Anchor>
                    <TextInput icon={<Search />} placeholder="search ..." onChange={(event) => setSearch(event.target.value)} />
                </Box>
                <Nav direction="row">
                    {items.map(item => (
                        item.value !== 2 ? <Anchor href={item.href} label={item.label} key={item.label} /> : <LogOut route={'/teachersignin'} />
                    ))}
                </Nav>
            </Header>
            <div class="flex items-center justify-center pa4 bg-yellow">
                <Info />
                <span class="lh-title ml3">The following are the Student Leave Details, Please verify and take appropriate action</span>
            </div>
            <Box>
                {student ? student.filter(item => item.suserid.toLowerCase().includes(search.toLowerCase())).map((item) => (
                    <Accordion>
                        <AccordionPanel key={item} label={item.suserid} id="studentNo">
                            <Box align="center" pad="large" id="application">
                                <Form>
                                    <Box border gap="medium" pad="large" width="medium" id="leaveRequest">
                                        {localStorage.getItem('chairperson') === 'Yes' ? <FormField
                                            htmlFor="info-id"
                                            name="info-demo"
                                            label="Verified By"
                                        >
                                            <TextInput
                                                id="info-id"
                                                value={item.tuserid}
                                            />
                                        </FormField> : null}
                                        <FormField
                                            htmlFor="info-id"
                                            name="info-demo"
                                            label="Student ID"
                                        >
                                            <TextInput
                                                id="info-id"
                                                value={item.suserid}
                                            />
                                        </FormField>
                                        <FormField
                                            htmlFor="info-id"
                                            name="info-demo"
                                            label="Date of Start"
                                        >
                                            <TextInput
                                                id="dos"
                                                value={new Date(item.dos).toLocaleDateString("sq-AL", { year: 'numeric', day: '2-digit', month: '2-digit' })}
                                            />
                                        </FormField>
                                        <FormField
                                            htmlFor="info-id"
                                            name="info-demo"
                                            label="Date of End"
                                        >
                                            <TextInput
                                                id="doe"
                                                value={new Date(item.doe).toLocaleDateString("sq-AL", { year: 'numeric', day: '2-digit', month: '2-digit' })}
                                            />
                                        </FormField>
                                        <FormField
                                            htmlFor="info-id"
                                            name="info-demo"
                                            label="Reason"
                                        >
                                            <TextArea
                                                id="reason"
                                                value={item.reason}
                                            />
                                        </FormField>
                                        {item.cert !== 'NA' ? <FormField
                                            htmlFor="info-id2"
                                            name="info-demo2"
                                            label="Medical Certificate"
                                        >
                                            <TextArea
                                                value={item.cert}
                                            />
                                        </FormField> : null}

                                        <Box direction="row" justify="between">
                                            <Button id="approveBtn" label="Approve" style={{ backgroundColor: '#4BB543' }} onClick={() => decisionSubmit("Verified", item.suserid, new Date(item.dos).toLocaleDateString("sv-SE", { year: 'numeric', day: '2-digit', month: '2-digit' }), new Date(item.doe).toLocaleDateString("sv-SE", { year: 'numeric', day: '2-digit', month: '2-digit' }), item.reason)} />
                                            <Button id="rejectBtn" label="Reject" style={{ backgroundColor: '#FF6347' }} onClick={() => decisionSubmit("Rejected", item.suserid, new Date(item.dos).toLocaleDateString("sv-SE", { year: 'numeric', day: '2-digit', month: '2-digit' }), new Date(item.doe).toLocaleDateString("sv-SE", { year: 'numeric', day: '2-digit', month: '2-digit' }), item.reason)} />
                                        </Box>
                                    </Box>
                                </Form>
                            </Box>
                        </AccordionPanel>
                    </Accordion>
                )) : null}
            </Box>
            {
                open && <Layer
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
                                Succcesfully Signed In To Teacher Portal
              </Text>
                        </Box>
                        <Button icon={<FormClose />} onClick={onClose} plain />
                    </Box>
                </Layer>
            }
        </Grommet>
    );
};

export default TeacherDashboard;