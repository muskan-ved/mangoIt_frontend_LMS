import React, { useState, useEffect } from 'react';
const Auotcomplete = ({ defaultValue, placeholder }:any) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  );
};

// const LoginForm = () => {
//   return (
//     <form>
//       <UncontrolledInput defaultValue="" placeholder="Email" />
//       <UncontrolledInput defaultValue="" placeholder="Password" />
//       <button>Submit</button>
//     </form>
//   );
// };




export default Auotcomplete;