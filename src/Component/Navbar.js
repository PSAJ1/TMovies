import React from 'react';
import {Link} from 'react-router-dom';
class Navbar extends React.Component
{
    render()
    {
        return(
            <div className='nav-bar'>
                <Link to='/' style={{textDecoration:"none"}}><h1 className='nav-app-name col-xs-12 nav1'>Movie App</h1></Link>
                <Link to='/favourate' style={{textDecoration:"none"}}><h3 className='nav-page-name col-xs-12 nav1'>Favourite Page</h3></Link>
            </div>
        );
    }
}
export default Navbar;