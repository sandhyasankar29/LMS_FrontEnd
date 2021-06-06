import React from 'react';
import ReactDOM from 'react-dom';
import TeacherSignIn from '../container/TeacherSignIn';
import { cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TeacherSignIn></TeacherSignIn>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<TeacherSignIn></TeacherSignIn>).toJSON();
    expect(tree).toMatchSnapshot();
})
