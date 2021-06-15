/* eslint-disable react/prop-types */
import React from 'react';
import { Book, Storage, Group } from 'grommet-icons';
import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Grid,
    Grommet,
    Text,
    Image,
    Carousel
} from 'grommet';

import carousal_1 from '../assets/carousal_1.jpg'
import carousal_3 from '../assets/carousal_3.jpg'
import { useHistory } from 'react-router';

const theme = {
    global: {
        font: {
            family: `-apple-system,
           BlinkMacSystemFont, 
           "Segoe UI"`,
        },
    },
    card: {
        container: {
            background: '#FFFFFFF12',
            elevation: 'none',
        },
        footer: {
            pad: { horizontal: 'medium', vertical: 'small' },
            background: '#FFFFFF06',
        },
    },
};

// eslint-disable-next-line no-unused-vars
const gradient = [
    { value: 28, color: 'status-ok' },
    { value: 50, color: 'status-warning' },
    { value: 80, color: 'status-critical' },
];

const data = [
    {
        icon: <Book size="large" />,
        title: 'Student Portal Login',
        message: 'Student Potal to Apply OD/ML',
        type: 'bar',
        id: 'student'
    },
    {
        icon: <Storage size="large" />,
        title: 'Admin Portal Login',
        message: 'Admin Portal to Manage Records',
        type: 'line',
        id: 'admin'
    },
    {
        icon: <Group size="large" />,
        title: 'Teacher Portal',
        message: 'Teacher Portal to Approve Student Records',
        type: 'point',
        id: 'teacher'
    },
];

const Identifier = ({ children, title, subTitle, size, ...rest }) => (
    <Box gap="small" align="center" direction="column" pad="medium" {...rest}>
        {children}
        <Box>
            <Text size={size} weight="bold">
                {title}
            </Text>
            <Text size={size}>{subTitle}</Text>
        </Box>
    </Box>
);

export const Welcome = () => {
    const history = useHistory();
    const onClickRouteChange = (title) => {
        if (title === "Student Portal Login") {
            history.push('/signin')
        }
        else if (title === "Admin Portal Login") {
            history.push('/adminsignin')
        }
        else {
            history.push('/teachersignin')
        }
    }
    return (
        <Grommet full theme={theme}>
            <Box align="center" pad="xxsmall">
                <Carousel controls={false} play={3000}>
                    <Box pad="xxxsmall" background="accent-1">
                        <Image src={carousal_1} fill="cover" />
                    </Box>
                    <Box pad="xxxsmall" background="accent-3">
                        <Image src={carousal_3} fill="cover" />
                    </Box>
                </Carousel>
            </Box>
            <Box pad="large" height="100%">
                <Grid gap="medium" columns={{ count: 'fit', size: 'small' }}>
                    {data.map(value => (
                        <Card
                            style={{ marginTop: "-2%" }}
                            key={value.title}
                            id={value.id}
                            onClick={() => { onClickRouteChange(value.title) }
                            }
                            background="dark-1"
                        >
                            <CardBody pad="small">
                                <Identifier
                                    title={value.title}
                                    subTitle={value.subTitle}
                                    size="small"
                                >
                                    {value.icon}
                                </Identifier>
                            </CardBody>
                            <CardFooter pad={{ horizontal: 'medium', vertical: 'small' }}>
                                <Text size="xsmall">{value.message}</Text>
                            </CardFooter>
                        </Card>
                    ))}
                </Grid>
            </Box>
        </Grommet>);
};

export default Welcome;