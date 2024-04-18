const BASE_URL = 'http://localhost:1234';

const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  const data = await response.json();
  return data;
};

const getUserById = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  const data = await response.json();
  return data;
};

const addUser = async (user) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(user)
  });
  const data = await response.json();
  return data;
};

const updateUser = async (userId, newData) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)
  });
  const data = await response.json();
  return data;
};

const partiallyUpdateUser = async (userId, partialData) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(partialData)
  });
  const data = await response.json();
  return data;
};

const deleteUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.ok;
};

const getMixes = async () => {
  const response = await fetch(`${BASE_URL}/mixes`);
  const data = await response.json();
  return data;
};

const getMixById = async (mixId) => {
  const response = await fetch(`${BASE_URL}/mixes/${mixId}`);
  const data = await response.json();
  return data;
};

const getMixesByFlavour = async (flavour) => {
  const response = await fetch(`${BASE_URL}/mixes?flavour=${flavour}`);
  const data = await response.json();
  return data;
};

const getMixesByCategory = async (category) => {
  const response = await fetch(`${BASE_URL}/mixes?category=${category}`);
  const data = await response.json();
  return data;
};

const getMixesByCategoryAndFlavour = async (flavour, category) => {
  const response = await fetch(`${BASE_URL}/mixes?flavour=${flavour}&category=${category}`);
  const data = await response.json();
  return data;
};

const addMix = async (mix) => {
  const response = await fetch(`${BASE_URL}/mixes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(mix)
  });
  const data = await response.json();
  return data;
};

const updateMix = async (mixId, newData) => {
  const response = await fetch(`${BASE_URL}/mixes/${mixId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)
  });
  const data = await response.json();
  return data;
};

const partiallyUpdateMix = async (mixId, partialData) => {
  const response = await fetch(`${BASE_URL}/mixes/${mixId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(partialData)
  });
  const data = await response.json();
  return data;
};

const deleteMix = async (mixId) => {
  const response = await fetch(`${BASE_URL}/mixes/${mixId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.ok;
};

const getFlavours = async () => {
  const response = await fetch(`${BASE_URL}/flavours`);
  const data = await response.json();
  return data;
};

const getFlavourById = async (flavourId) => {
  const response = await fetch(`${BASE_URL}/flavours/${flavourId}`);
  const data = await response.json();
  return data;
};

const getFlavoursByBrand = async (brand) => {
  const response = await fetch(`${BASE_URL}/flavours?brand=${brand}`);
  const data = await response.json();
  return data;
};

const addFlavour = async (flavour) => {
  const response = await fetch(`${BASE_URL}/flavours`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(flavour)
  });
  const data = await response.json();
  return data;
};

const updateFlavour = async (flavourId, newData) => {
  const response = await fetch(`${BASE_URL}/flavours/${flavourId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)
  });
  const data = await response.json();
  return data;
};

const partiallyUpdateFlavour = async (flavourId, partialData) => {
  const response = await fetch(`${BASE_URL}/flavours/${flavourId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(partialData)
  });
  const data = await response.json();
  return data;
};

const deleteFlavour = async (flavourId) => {
  const response = await fetch(`${BASE_URL}/flavours/${flavourId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.ok;
};

const api = {
  getUsers, 
  getUserById,
  addUser,
  updateUser,
  partiallyUpdateUser,
  deleteUser,
  getMixes,
  getMixById,
  getMixesByFlavour,
  getMixesByCategory,
  getMixesByCategoryAndFlavour,
  addMix,
  updateMix,
  partiallyUpdateMix,
  deleteMix,
  getFlavours,
  getFlavourById,
  getFlavoursByBrand,
  addFlavour,
  updateFlavour,
  partiallyUpdateFlavour,
  deleteFlavour,
}

export default api;