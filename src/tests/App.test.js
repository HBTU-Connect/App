import React from 'react'
import ReactDOM from 'react-dom'
import { mount, shallow } from 'enzyme' 
import TestApp from './TestApp'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'

//configuration 
import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// mock store 
// const mockStore = configureMockStore([thunkMiddleware])


it('mounts without crashing', () => {
    mount(<TestApp  />)
});


it('snapshot mached', () => {
  expect(shallow(<TestApp />)).toMatchSnapshot()
})


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TestApp />, div);
});