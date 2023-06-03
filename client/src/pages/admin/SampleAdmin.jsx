import React, { useState } from 'react';

const NavigationBar = ({ activeView, setActiveView, handleSignOut }) => {
  return (
    <div className="flex flex-col min-h-screen bg-base-300 text-black p-4 w-80">
      <div className="font-bold text-3xl">
        <span className="text-primary">Dash</span>
        <span className="text-black">board</span>
        <span className="absolute bg-gray-800 text-white text-xs rounded-full px-2 ml-2 -mt-1">
          Admin
        </span>
      </div>
      <ul className="space-y-2 mt-8">
        <li>
          <button
            className={`${
              activeView === 'pending' ? 'bg-primary text-gray-200 rounded' : 'bg-transparent text-black'
            } w-full rounded p-2 text-left`}
            onClick={() => setActiveView('pending')}
          >
            Pending Accounts
          </button>
        </li>
        <li>
          <button
            className={`${
              activeView === 'student' ? 'bg-primary text-gray-200 rounded' : 'bg-transparent text-black'
            } w-full rounded p-2 text-left`}
            onClick={() => setActiveView('student')}
          >
            Student Accounts
          </button>
        </li>
        <li>
          <button
            className={`${
              activeView === 'approver' ? 'bg-primary text-gray-200 rounded' : 'bg-transparent text-black'
            } w-full rounded p-2 text-left`}
            onClick={() => setActiveView('approver')}
          >
            Approver Accounts
          </button>
        </li>
      </ul>
      <div className="border-t border-gray-400 my-8"></div>
      <button
        className="bg-primary text-gray-200 uppercase w-full rounded p-2"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
};

const MainPanel = ({ activeView }) => {
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [upEmail, setUpEmail] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [password, setPassword] = useState('');
  const [isClearanceOfficer, setIsClearanceOfficer] = useState(false);

  const handleCreateAccountClick = () => {
    setIsCreateAccountOpen(true);
  };

  const handleCreateAccount = () => {
    console.log('Creating account...');
    console.log('Username:', username);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('UP Email:', upEmail);
    console.log('Middle Name:', middleName);
    console.log('Password:', password);
    console.log('Is Clearance Officer:', isClearanceOfficer);

    setUsername('');
    setFirstName('');
    setLastName('');
    setUpEmail('');
    setMiddleName('');
    setPassword('');
    setIsClearanceOfficer(false);

    setIsCreateAccountOpen(false);
  };

  let viewTitle;
  let smallButtons = [];

  switch (activeView) {
    case 'pending':
      viewTitle = 'Pending Accounts';
      smallButtons = ['Student Number', 'Name'];
      break;
    case 'student':
      viewTitle = 'Student Accounts';
      smallButtons = ['Student Number', 'Name'];
      break;
    case 'approver':
      viewTitle = 'Approver Accounts';
      smallButtons = ['Approver Name'];
      break;
    default:
      viewTitle = '';
  }

  return (
    <div className="flex-grow bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-black mb-6">{viewTitle}</h1>
      

      {isCreateAccountOpen && activeView === 'approver' && (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded mb-4 w-full"
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded mb-4 w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded mb-4 w-full"
          />
          <input
            type="text"
            placeholder="UP Email"
            value={upEmail}
            onChange={(e) => setUpEmail(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded mb-4 w-full"
          />
          <input
            type="text"
            placeholder="Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded mb-4 w-full"
          />
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={isClearanceOfficer}
              onChange={(e) => setIsClearanceOfficer(e.target.checked)}
              className="mr-2"
            />
            Is Clearance Officer
          </label>
          <button
            className="bg-primary text-gray-200 rounded uppercase text-sm font-medium px-4 py-2 mb-4"
            onClick={handleCreateAccount}
          >
            CREATE
          </button>
        </div>
      )}
    </div>
  );
};

const AdminPage = () => {
  const [activeView, setActiveView] = useState('pending');
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [upEmail, setUpEmail] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [password, setPassword] = useState('');
  const [isClearanceOfficer, setIsClearanceOfficer] = useState(false);

  const handleSignOut = () => {
    // Handle sign out logic
  };

  const handleCreateAccountClick = () => {
    setIsCreateAccountOpen(true);
  };

  const handleCreateAccount = () => {
    console.log('Creating account...');
    console.log('Username:', username);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('UP Email:', upEmail);
    console.log('Middle Name:', middleName);
    console.log('Password:', password);
    console.log('Is Clearance Officer:', isClearanceOfficer);

    setUsername('');
    setFirstName('');
    setLastName('');
    setUpEmail('');
    setMiddleName('');
    setPassword('');
    setIsClearanceOfficer(false);

    setIsCreateAccountOpen(false);
  };

  let viewTitle;
  let smallButtons = [];
  let tableHeaders = [];

  switch (activeView) {
    case 'pending':
      viewTitle = 'Pending Accounts';
      smallButtons = ['Student Number', 'Name'];
      tableHeaders = ['Student Number', 'Name', 'UP Mail', 'Actions'];
      break;
    case 'student':
      viewTitle = 'Student Accounts';
      smallButtons = ['Student Number', 'Name'];
      tableHeaders = ['Student Number', 'Name', 'UP Mail', 'Adviser'];
      break;
    case 'approver':
      viewTitle = 'Approver Accounts';
      smallButtons = ['Approver Name'];
      tableHeaders = ['Username', 'Name', 'Email', 'Actions'];
      break;
    default:
      viewTitle = '';
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col min-h-screen bg-base-300 text-black p-4 w-80">
        <div className="font-bold text-3xl">
          <span className="text-primary">Dash</span>
          <span className="text-black">board</span>
          <span className="absolute bg-gray-800 text-white text-xs font-light rounded-full px-2 ml-2 -mt-0">
            Admin
          </span>
        </div>
        <ul className="space-y-2 mt-8">
          <li>
            <button
              className={`${
                activeView === 'pending' ? 'bg-primary text-gray-200 rounded' : 'bg-transparent text-black'
              } w-full rounded p-2 text-left`}
              onClick={() => setActiveView('pending')}
            >
              Pending Accounts
            </button>
          </li>
          <li>
            <button
              className={`${
                activeView === 'student' ? 'bg-primary text-gray-200 rounded' : 'bg-transparent text-black'
              } w-full rounded p-2 text-left`}
              onClick={() => setActiveView('student')}
            >
              Student Accounts
            </button>
          </li>
          <li>
            <button
              className={`${
                activeView === 'approver' ? 'bg-primary text-gray-200 rounded' : 'bg-transparent text-black'
              } w-full rounded p-2 text-left`}
              onClick={() => setActiveView('approver')}
            >
              Approver Accounts
            </button>
          </li>
        </ul>
        <div className="border-t border-gray-400 my-8"></div>
        <button
          className="bg-primary text-gray-200 uppercase w-full rounded p-2"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
      <div className="flex-grow bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-black mb-6 py-5">{viewTitle}</h1>
        {activeView === 'pending' && (
          <div>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search a pending account"
                className="px-4 py-3 border border-gray-300 rounded-l focus:outline-none"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="8" cy="8" r="5" />
                  <path d="M15 15l-4.35-4.35" />
                </svg>
              </button>
            </div>
            <div className="flex space-x-2 text-sm text-red-500 mb-6">
              {smallButtons.map((button, index) => (
                <button key={index} className="px-2 py-1 bg-transparent text-primary rounded">
                  {button}
                </button>
              ))}
            </div>
            {/* Table-like container */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    {tableHeaders.map((header, index) => (
                        <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-bold text-primary uppercase tracking-wider"
                        >
                        {header}
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {/* Render rows of data here */}
                </tbody>
                </table>
            </div>
          </div>
        )}
        {activeView === 'student' && (
          <div>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search a student"
                className="px-4 py-3 border border-gray-300 rounded-l focus:outline-none"
              />
              <button className="bg-primary text-white rounded-r px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="8" cy="8" r="5" />
                  <path d="M15 15l-4.35-4.35" />
                </svg>
              </button>
            </div>
            <div className="flex space-x-2 text-sm text-red-500 mb-6">
              {smallButtons.map((button, index) => (
                <button key={index} className="px-2 py-1 bg-transparent text-primary rounded">
                  {button}
                </button>
              ))}
            </div>
          </div>
        )}
        {activeView === 'student' && (
            <>
                <button className="bg-primary text-gray-200 rounded uppercase text-sm font-medium px-4 py-2 mb-4">
                    UPLOAD A CSV
                </button>
                {/* Table-like container */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        {tableHeaders.map((header, index) => (
                            <th
                            key={index}
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-bold text-primary uppercase tracking-wider"
                            >
                            {header}
                            </th>
                        ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {/* Render rows of data here */}
                    </tbody>
                    </table>
                </div>
            </>
        )}
        {activeView === 'approver' && (
          <div>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search an approver"
                className="px-4 py-3 border border-gray-300 rounded-l focus:outline-none"
              />
              <button className="bg-primary text-white rounded-r px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="8" cy="8" r="5" />
                  <path d="M15 15l-4.35-4.35" />
                </svg>
              </button>
            </div>
            <div className="flex space-x-2 text-sm text-red-500 mb-6">
              {smallButtons.map((button, index) => (
                <button key={index} className="px-2 py-1 bg-transparent text-primary rounded">
                  {button}
                </button>
              ))}
            </div>
          </div>
        )}
        {activeView === 'approver' && (
            <>
                <button
                    className="bg-primary text-gray-200 rounded uppercase text-sm font-medium px-4 py-2 mb-4"
                    onClick={handleCreateAccountClick}
                >
                    CREATE ACCOUNT
                </button>
                {/* Table-like container */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        {tableHeaders.map((header, index) => (
                            <th
                            key={index}
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-bold text-primary uppercase tracking-wider"
                            >
                            {header}
                            </th>
                        ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {/* Render rows of data here */}
                    </tbody>
                    </table>
                </div>
            </>
          
        )}

        {isCreateAccountOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-primary bg-opacity-30">
                <div className="bg-white rounded-[20px] p-8 w-100 relative"> {/* Added 'relative' class */}
                    <button
                    className="absolute top-3 right-3 p-2 rounded-full bg-red-500"
                    onClick={() => setIsCreateAccountOpen(false)}
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
                    <h2 className="text-xl text-primary font-bold mb-4">Create Account</h2>
                    <form className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="mb-4">
                            <label htmlFor="username" className="text-primary font-bold block mb-1">
                            Username:
                            </label>
                            <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-400 rounded px-3 py-2"
                            />
                        </div>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="text-primary font-bold block mb-1">
                        First Name:
                        </label>
                        <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border border-gray-400 rounded px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="text-primary font-bold block mb-1">
                        Last Name:
                        </label>
                        <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border border-gray-400 rounded px-3 py-2"
                        />
                    </div>
                    </div>
                    <div>
                    <div className="mb-4">
                        <label htmlFor="upEmail" className="text-primary font-bold block mb-1">
                        UP Email:
                        </label>
                        <input
                        type="email"
                        id="upEmail"
                        value={upEmail}
                        onChange={(e) => setUpEmail(e.target.value)}
                        className="w-full border border-gray-400 rounded px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="middleName" className="text-primary font-bold block mb-1">
                        Middle Name:
                        </label>
                        <input
                        type="text"
                        id="middleName"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        className="w-full border border-gray-400 rounded px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-primary font-bold block mb-1">
                        Password:
                        </label>
                        <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-400 rounded px-3 py-2"
                        />
                    </div>
                    </div>
                    <div className="flex flex-row col-span-2 mb-4">
                    <input
                        type="checkbox"
                        id="isClearanceOfficer"
                        checked={isClearanceOfficer}
                        onChange={(e) => setIsClearanceOfficer(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-primary"
                    />
                    <label htmlFor="isClearanceOfficer" className="pl-3 text-gray-700 block mb-1">
                        Mark as Clearance Officer:
                    </label>
                    </div>
                    <div className="col-span-2">
                    <button
                        type="button"
                        onClick={handleCreateAccount}
                        className="bg-primary text-gray-200 rounded-[8px] px-4 py-2 w-full"
                    >
                        Create Account
                    </button>
                    </div>
                </form>
                </div>
            </div>
            )}

      </div>
    </div>
  );
};

export default AdminPage;