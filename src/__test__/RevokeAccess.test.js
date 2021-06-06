import React from 'react';
import ReactDOM from 'react-dom';
import RevokeAccess from '../container/RevokeAccess';
import { cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'

afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<RevokeAccess></RevokeAccess>, div)
})

it("matches snapshot", () => {
    const tree = renderer.create(<RevokeAccess></RevokeAccess>).toJSON();
    expect(tree).toMatchSnapshot();
})
