
import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from '../container/SignIn';
import { render, cleanup } from '@testing-library/react'

import renderer from 'react-test-renderer'

afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SignIn></SignIn>, div)
})
afterEach(cleanup)
it("renders button correctly", () => {
    const { getByTestId } = render(<SignIn></SignIn>)
    expect(getByTestId('button')).toHaveTextContent("Log In")
});
afterEach(cleanup)
it("renders button1 correctly", () => {
    const { getByTestId } = render(<SignIn></SignIn>)
    expect(getByTestId('button2')).toHaveTextContent("Not Signed Up?")
});

it("matches snapshot", () => {
    const tree = renderer.create(<SignIn></SignIn>).toJSON();
    expect(tree).toMatchSnapshot();
})
