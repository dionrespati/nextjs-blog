import React from 'react';
import Link from 'next/link';
/* import { IoMdFingerPrint } from 'react-icons/';
import { FaBars, FaTimes} from 'react-icons/fa'; */

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="navbar-container container">
          <Link href="/" className="navbar-logo">
            <a>
              BecomeGreat
            </a>  
          </Link>
        </div>
        <div className="menu-ioon">

        </div>
      </div>
    </>
  );
};

export default Navbar;
