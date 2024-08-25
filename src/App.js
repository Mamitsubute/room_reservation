import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://kdxgnhqjpdabkvvkqsjs.supabase.co/rest/v1/rooms';
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'apikey': API_KEY,
        },
      });
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const addRoom = async () => {
    try {
      await axios.post(API_URL, { name: roomName }, {
        headers: {
          'apikey': API_KEY,
          'Content-Type': 'application/json',
        },
      });
      setRoomName('');
      fetchRooms();
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  const deleteRoom = async (id) => {
    try {
      await axios.delete(`${API_URL}?id=eq.${id}`, {
        headers: {
          'apikey': API_KEY,
        },
      });
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div>
      <h1>Room Management</h1>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Room name"
      />
      <button onClick={addRoom}>Add Room</button>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name} <button onClick={() => deleteRoom(room.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
