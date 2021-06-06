import React from 'react';
import ReactDOM from 'react-dom';
import ForgotPassword from '../container/ForgotPassword';
import { cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ForgotPassword></ForgotPassword>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<ForgotPassword></ForgotPassword>).toJSON();
    expect(tree).toMatchSnapshot();
})
