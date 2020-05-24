import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Blocks from '../Blocks/Blocks';
import LeftPan from './LeftPan';
import Button from '../Button/Button';
import Input from '../Input/Input';

configure({adapter: new Adapter()});

describe('<LeftPan />', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<LeftPan />);
    })
    it('should render starting buttons',() => {
        expect(wrapper.find(Button)).toHaveLength(3);
    });
    it('should render letter box',() => {
        wrapper.setProps({
             letterLists:["i","k","y","w","t","j","a","q","z"],
             matrix: 3
        })
        const letters = []
        expect(wrapper.find(Blocks)).toHaveLength(1);
    });
    it('should render input box',() => {
        wrapper.setProps({
             letterLists:["i","k","y","w","t","j","a","q","z"],
             matrix: 3
        })
        const letters = []
        expect(wrapper.find(Input)).toHaveLength(1);
    });
});