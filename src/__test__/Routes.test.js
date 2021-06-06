import React from 'react';
import ReactDOM from 'react-dom';
import Routes from '../container/Routes';
import { cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Routes></Routes>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<Routes></Routes>).toJSON();
    expect(tree).toMatchSnapshot();
})
