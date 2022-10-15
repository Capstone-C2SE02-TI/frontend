import Tippy from '@tippyjs/react';

function Support() {
    

const defaultProps = {
    animateFill: false,
    animation: 'scale',
    interactive: true,
    interactiveBorder: 10,
    theme: 'tomato',
    // trigger: 'click',
    content: 'this is popover content',
};


    return (
        <Tippy {...defaultProps}>
            <button id="myButton">My Button</button>
        </Tippy>
    );
}

export default Support;
