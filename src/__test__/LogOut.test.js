import React from 'react';
import ReactDOM from 'react-dom';
import LogOut from '../container/LogOut';
import { cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<LogOut></LogOut>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<LogOut></LogOut>).toJSON();
    expect(tree).toMatchSnapshot();
})
