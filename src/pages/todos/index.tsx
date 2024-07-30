import React, { FC } from 'react';

import { useAuth } from '@/store/authStore';

const Todos: FC = () => {
  const count = useAuth((state) => state.count) ;
  const inc = useAuth(state=>state.inc)
  return <React.Fragment>Todos
    <div>
      {count}
      <button onClick={inc} className='bg-blue-400 p-1'>Increment</button>
    </div>
  </React.Fragment>;
};

export default Todos;
