import React from 'react';
import ReactDOM from 'react-dom';
import StudentPastApplication from '../container/StudentPastApplication';
import { cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<StudentPastApplication></StudentPastApplication>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<StudentPastApplication></StudentPastApplication>).toJSON();
    expect(tree).toMatchSnapshot();
})
