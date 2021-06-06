import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from '../container/Welcome';
import { cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Welcome></Welcome>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<Welcome></Welcome>).toJSON();
    expect(tree).toMatchSnapshot();
})
