import React from 'react';
import ReactDOM from 'react-dom';
import TeacherDashboard from '../container/TeacherDashboard';
import { cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TeacherDashboard></TeacherDashboard>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<TeacherDashboard></TeacherDashboard>).toJSON();
    expect(tree).toMatchSnapshot();
})
