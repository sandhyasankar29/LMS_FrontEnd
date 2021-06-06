import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import {
    Box,
    Button,
    Grommet,
    Text,
    Anchor,
    Header,
    Nav,
    TextInput,
    Card,
    CardFooter,
    CardBody,
    Select
} from 'grommet';
import { grommet } from 'grommet/themes';
import '../Theme/StudentPastApplication.css'
import LogOut from './LogOut';
import { User, Search, Filter, Close } from 'grommet-icons';
import './GlobalVariables'
var dateFormat = require('dateformat');
const StudentPastApplication = () => {
    const urlPast = 'http://'+{global,ip}.ip+':3001/leavestatus/';
    const urlCancel = 'http://'+{global,ip}.ip+':3001/cancelleaverequest';
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
    const [search, setSearch] = useState("");
    const [student, setStudent] = useState();
    const [count, setCount] = useState(0)
    const [filter, setFilter] = useState('Reason')
    const allOptions = ['Reason', 'Start Date']
    const items = [
        { label: 'Dashboard', href: '/studentDashboard', value: 0 , id: 'dashboard' },
        { label: 'Past Application', href: '/studentpastapplication', value: 1, id:'pastApplication' },
        { label: 'Button', href: '#', value: 2 },
    ];
    useEffect(() => {
        axios.get(urlPast + localStorage.getItem("suserid"))
            .then(res => {
                console.log(res.data)
                if (res.data !== "No Data Available as of Now") {
                    setStudent(res.data)
                }
                else {
                    Toast.fire({
                        title: res.data,
                    })
                    setStudent(null)
                }
            }).catch(error => {
                Toast.fire({
                    icon: 'error',
                    title: 'Details Fetch Failure',
                })
            })
    }, [count, Toast]);

    const cancelLeave = (value) => {
        var day=dateFormat(new Date(value.dos), "mm/dd/yyyy");
        axios.delete(urlCancel, {
            headers: {
                Authorization: null
            },
            data: { suserid: localStorage.getItem("suserid"), dos: value.dos, reason: value.reason }
        }).then(res => {
            Toast.fire({
                icon: 'success',
                title: 'Request Cancelled',
            })
            setCount(count + 1)
        }).catch(error => {
            Toast.fire({
                icon: 'error',
                title: 'Unable to cancel request',
            })
        })
    }

    return (
        <Grommet full theme={grommet} style={{ overflowY: 'scroll' }}>
            <Header background="dark-1" pad="small">
                <Box direction="row" align="center" gap="small">
                    <User />
                    <Anchor color="white" href="#">
                        Welcome {localStorage.getItem('suserid')}
                    </Anchor>
                    <TextInput icon={<Search />} placeholder="search ..." onChange={(event) => setSearch(event.target.value)} />
                    <Select
                        icon={Filter}
                        options={allOptions}
                        value={filter}
                        onChange={({ option }) => setFilter(option)}
                    />
                </Box>
                <Nav direction="row">
                    {items.map(item => (
                        item.value !== 2 ? <Anchor id={item.id} href={item.href} label={item.label} key={item.label} /> : <LogOut route={'/signin'} />
                    ))}
                </Nav>
            </Header>
            {student ?
                student.filter(item => filter === "Reason" ? item.reason.toLowerCase().includes(search.toLowerCase()) : new Date(item.dos).toLocaleDateString("sq-AL", { year: 'numeric', day: '2-digit', month: '2-digit' }).includes(search)).map((item, key) => (
                    <div class='leaveApp fl w-third pa2'>
                        <Card style={{ 'marginLeft': "6%" }} height="small" width="medium" background="light-1">
                            <CardBody pad="medium" background={item.approval !== 'Rejected' ? item.approval === "Approved" ? 'status-ok' : 'status-warning' : 'status-critical'}>
                                <Text weight="bold">LEAVE ID:{key}</Text>
                                <Text id="dos" weight="bold">DOS: {new Date(item.dos).toLocaleDateString("sq-AL", { year: 'numeric', day: '2-digit', month: '2-digit' })}</Text>
                                <Text id="doe" weight="bold">DOE: {new Date(item.doe).toLocaleDateString("sq-AL", { year: 'numeric', day: '2-digit', month: '2-digit' })}</Text>
                                <Text weight="bold">{item.reason}</Text>
                            </CardBody>
                            <CardFooter background="light-2" >
                                <Button id="decideBtn" disabled={item.approval === "Approved" ? true : false} margin="small" style={{ 'marginLeft': "26%" }} label="Cancel Request" icon={<Close color="red" />} hoverIndicator plain={true} onClick={() => { cancelLeave(item) }} />
                            </CardFooter></Card>
                    </div>
                )) : null}
        </Grommet>
    )
}
export default StudentPastApplication;