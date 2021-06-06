import React from 'react';
import ReactDOM from 'react-dom';
import TeacherRegister from '../container/TeacherRegister';
import { cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TeacherRegister></TeacherRegister>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<TeacherRegister></TeacherRegister>).toJSON();
    expect(tree).toMatchSnapshot();
})
