import React from 'react';
import ReactDOM from 'react-dom';
import AdminVerify from '../container/AdminTeacherVerify';
import renderer from 'react-test-renderer'

it ("renders without crashing",()=>{
    const div=document.createElement("div");
    ReactDOM.render(<AdminVerify></AdminVerify>,div)
})
it("matches snapshot", () => {
    const tree = renderer.create(<AdminVerify></AdminVerify>).toJSON();
    expect(tree).toMatchSnapshot();
})