import { Logout } from 'grommet-icons';
import { React } from 'react';
import { Button } from 'grommet';
import { useHistory } from "react-router-dom";
const LogOut = (props) => {
    const history = useHistory();
    return (<Button pad='xsmall' id="logoutBtn" plain icon={<Logout color="red" />} onClick={() => { localStorage.clear(); history.replace(props.route) }} ><Logout /></Button>)
}

export default LogOut;

