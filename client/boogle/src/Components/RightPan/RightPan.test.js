import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RightPan from './RightPan';
import Timer from '../Timer/Timer';
import Button from '../Button/Button';
import Block from '../WordLists/WordLists';

configure({adapter: new Adapter()});

describe('<RightPan />', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<RightPan />);
    })
    it('should not render any child',() => {
        expect(wrapper.children()).toHaveLength(0);        
    });
    it('should  render timer',() => {
        wrapper.setProps({
            playing:true,
            timer:120
        })
        expect(wrapper.find(Timer)).toHaveLength(1);        
    });
    it('should  render Refresh button',() => {
        wrapper.setProps({
            playing:true,
        })
        expect(wrapper.find(Button)).toHaveLength(1);        
    });
    it('should  render wordboard',() => {
        wrapper.setProps({
            playing:true,
            words:["ram","apple","pen","ok","parrot"]
        })
        expect(wrapper.find('#wordboard')).toHaveLength(1);        
    });
    it('should not render scoreboard',() => {
        wrapper.setProps({
            playing:true,
        })
        expect(wrapper.find('#scoreboard')).toHaveLength(0);        
    });
    it('should  render scoreboard',() => {
        wrapper.setProps({
            playing:true,
            score:{"totalscore":7,"validList":[{"score":1,"word":"ram"},{"score":2,"word":"apple"},{"score":1,"word":"pen"},{"score":3,"word":"parrot"}],"invalidList":[{"score":0,"word":"ok"}]}
        })
        expect(wrapper.find('#scoreboard')).toHaveLength(1);        
    });
});