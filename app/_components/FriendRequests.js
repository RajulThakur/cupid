'use client';
import {CheckRounded, CloseRounded} from '@mui/icons-material';
import {Avatar} from '@mui/material';
import {BASE_URL} from '../_helper/Config';
function FriendRequest({request, setRequests, requests}) {
  async function handleAccept(id) {
    const newRequests = requests.filter((request) => request.id !== id);
    setRequests(newRequests);

    await fetch(`${BASE_URL}/requests/add`, {
      method: 'POST',
      body: JSON.stringify({sender: request.id}),
    });
  }
  async function handleReject(id) {
    const newRequests = requests.filter((request) => request.id !== id);
    setRequests(newRequests);
    await fetch(`${BASE_URL}/requests/reject`, {
      method: 'POST',
      body: JSON.stringify({receiver: request.id}),
    });
  }
  return (
    <section className="flex items-center gap-4 rounded-lg bg-accent-tint-1000 px-4 py-5">
      <Avatar
        alt="Priyanka"
        style={{width: '56px', height: '56px'}}
      />
      <div className="flex-1">
        <p className="text-lg font-semibold tracking-wide">{request.username}</p>
      </div>
      <button
        className="rounded-md bg-accent-tint-600 px-2 py-1 text-base font-bold tracking-wider text-accent-shade-800 hover:bg-accent-tint-400"
        onClick={() => handleAccept(request.id)}>
        <CheckRounded sx={{fontSize: '1.2rem', strokeWidth: '0.1rem', stroke: 'rgb(96,124,83)'}} />
      </button>
      <button
        className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600"
        onClick={() => handleReject(request.id)}>
        Reject <CloseRounded sx={{fontSize: '1.2rem', strokeWidth: '0.1rem'}} />
      </button>
    </section>
  );
}
function FriendRequests({requests, setRequests}) {
  return (
    <>
      {requests.map((request) => (
        <FriendRequest
          key={request.id}
          request={request}
          setRequests={setRequests}
          requests={requests}
        />
      ))}
    </>
  );
}

export default FriendRequests;
