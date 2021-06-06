import React from 'react';
import ReactDOM from 'react-dom';
import history from '../container/history';
import { cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<history></history>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<history></history>).toJSON();
    expect(tree).toMatchSnapshot();
})
