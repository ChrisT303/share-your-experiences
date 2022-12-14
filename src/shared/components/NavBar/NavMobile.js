import React from 'react'

import './NavMobile.css'

const NavMobile = props => {
    return <aside className='nav-mobile'>
     {props.children}
    </aside>
};

export default NavMobile