
import React from 'react';
import ReactDOM from 'react-dom';
import AdminSignIn from '../container/AdminSignIn';
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

afterEach(cleanup)
it ("renders without crashing",()=>{
    const div=document.createElement("div");
    ReactDOM.render(<AdminSignIn></AdminSignIn>,div)
})

it("renders button correctly", () => {
    const { getByTestId } = render(<AdminSignIn></AdminSignIn>)
    expect(getByTestId('button')).toHaveTextContent("Log In")
});


it("matches snapshot", () => {
    const tree = renderer.create(<AdminSignIn></AdminSignIn>).toJSON();
    expect(tree).toMatchSnapshot();
})