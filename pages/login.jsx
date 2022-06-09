import React, {useState} from 'react';


const login = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="bg-white shadow-md w-1/3 rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input className="shadow appearance-none border rounded  w-full py-2 px-3 text-grey-darker" id="username" type="text"
          placeholder="Username" />
      </div>
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password" type={isPasswordVisible ? "text" : "password"} placeholder="**********" />
        <p className="text-red-500 text-xs italic">Password harus diisi.</p>
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded" type="button">
          Login
        </button>
        <a className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-800" href="#">
          Lupa Password ?
        </a>
        <button onClick={() => setPasswordVisible(!isPasswordVisible)}>Show Password</button>
      </div>
    </div>
  )
}

export default login;