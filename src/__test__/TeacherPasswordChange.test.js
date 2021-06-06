import React from 'react';
import ReactDOM from 'react-dom';
import TeacherPasswordChange from '../container/TeacherPasswordChange';
import { cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TeacherPasswordChange></TeacherPasswordChange>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<TeacherPasswordChange></TeacherPasswordChange>).toJSON();
    expect(tree).toMatchSnapshot();
})
