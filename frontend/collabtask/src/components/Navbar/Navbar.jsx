// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Sidebar = ({ user }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('access');
//     localStorage.removeItem('refresh');
//     navigate('/login');
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className={`bg-gradient-to-br from-gray-800 to-gray-900 text-white h-screen p-5 pt-8 shadow-xl
//     ${isOpen ? 'w-72' : 'w-20'}
//     transition-all duration-500 ease-in-out relative shadow-gray-900`}>
//          {/* App Name */}
//         <h1 className={`text-2xl font-bold mb-10 tracking-wide ${!isOpen && 'text-lg'}`}>
//           {isOpen ? 'Collab Task' : 'CT'}
//         </h1>

//         {/* Hamburger toggle */}
//         <button
//           className="absolute top-3 right-3 text-white focus:outline-none"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>

       
//         {/* Navigation Links */}
//         <ul className="space-y-4">
//           <li>
//             <Link
//               to="/dashboard"
//               className="block px-4 py-2 rounded-lg hover:bg-blue-600 hover:shadow-md transition duration-200 "
//             >
//               {isOpen ? 'Dashboard' : '🏠'}
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/tasks"
//               className="block px-4 py-2 rounded-lg hover:bg-green-600 hover:shadow-md transition duration-200 "
//             >
//               {isOpen ? 'Tasks' : '📋'}
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/settings"
//               className="block px-4 py-2 rounded-lg hover:bg-purple-600 hover:shadow-md transition duration-200 "
//             >
//               {isOpen ? 'Settings' : '⚙️'}
//             </Link>
//           </li>
//         </ul>

//         {/* User Section */}
//         <div className="absolute bottom-6 left-5 right-5">
//           <div
//             className="cursor-pointer flex items-center gap-3 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 shadow-md"
//             onClick={() => setShowUserMenu(!showUserMenu)}
//           >
//             {/* Avatar */}
//             <div className="relative">
//               <img
//                 src={user?.avatar || 'https://ui-avatars.com/api/?name=User'}
//                 alt="User Avatar"
//                 className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
//               />
//               <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
//             </div>
//             {/* Username */}
//             {isOpen && <span className="font-medium">{user?.username || 'User'}</span>}
//             {isOpen && <span className="ml-auto">▾</span>}
//           </div>

//           {/* Dropdown */}
//           {showUserMenu && isOpen && (
//             <div className="mt-2 bg-gray-700 rounded-lg shadow-lg overflow-hidden">
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-600 transition"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-gray-100 min-h-screen">
//         {/* Routed content goes here */}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";

const menuitems=[
    {name:'Add Task',link:'/dashboard',icon:'➕'},
    {name:'Dashboard',link:'/dashboard',icon:'🏠'},
    {name:'Tasks',link:'/tasks',icon:'📋'},
    {name:'Settings',link:'/settings',icon:'⚙️'},
]

const Sidebar = () =>{
    const [isOpen, setIsOpen] = React.useState(true);
    const [showUserMenu, setShowUserMenu] = React.useState(false);
    return(
        <div className="sidebar shadow-lg shadow-gray-200">

        
        <div className={`${isOpen ?'w-72':'w-20'} h-screen bg-cyan-50 shadow-lg shadow-gray-200 transition-all duration-500 ease-in-out `}>
    <div className="title flex items-center justify-between p-4 gap-3">
      <h1
  className={`font-extrabold tracking-wide transition-all duration-300 ease-in-out ${
    isOpen ? 'text-3xl text-gray-800' : 'text-xl text-blue-400'
  }`}
>
  {isOpen ? 'Collab Task' : 'CT'}
</h1>

      <button onClick={() => setIsOpen(!isOpen)}>
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    {/* sidebar links */}
        <div className="menuitems">
            <ul className="flex flex-col gap-4 p-4">
                {menuitems.map((item,index)=>(
                    <li key={index} className="text-white bg-green-900 shadow-xl hover:bg-cyan-700 p-2 rounded-lg cursor-pointer flex items-center gap-3" >
                        <span className="text-lg">{item.icon}</span>
                        {isOpen && <span className="text-md">{item.name}</span>}
                    </li>
                ))}
            </ul>
        </div>
  </div>
  </div>
    )   
}
export default Sidebar;