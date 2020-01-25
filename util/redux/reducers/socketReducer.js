import io from 'socket.io-client';

const renewSocket = () => {
  return (typeof window !== 'undefined')?
    io.connect(
      window.location.protocol+'//'
      +window.location.hostname+((window.location.port)?(':'+window.location.port):'')
    ):null
}

export default (
  state = renewSocket(),
  action
) => {
  switch (action.type) {
    case 'ADD_EVENT':
      state.off(action.eventName);
      state.on(action.eventName, (data)=>{
        action.cb(data)
      });
      return state;
    case 'SET_SOCKET':
      return renewSocket();
  }
  return state || renewSocket();
};
