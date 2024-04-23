const BASE_URL = "http://localhost:1234/api";

const login = async (credentials) => {
  const response = await fetch("http://localhost:1234/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!data.error) {
    document.cookie = `api_token=${data.data}; SameSite=Strict`;
    return true;
  }
  return false;
};

const register = async (userData) => {
  const response = await fetch("http://localhost:1234/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!data.error) {
    document.cookie = `api_token=${data.data}; SameSite=Strict`;
    return true;
  }
  return false;
};

const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return "";
};

const fetchWithAuth = async (url, options) => {
  const token = getCookie("api_token");
  if (token) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(url, options);
};

// ******************************** CRUD USUARIOS ********************************
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
  const response = await fetchWithAuth(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

const updateUser = async (userId, newData) => {
  const response = await fetchWithAuth(`${BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const data = await response.json();
  return data;
};

const partiallyUpdateUser = async (userId, partialData) => {
  const response = await fetchWithAuth(`${BASE_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(partialData),
  });
  const data = await response.json();
  return data;
};

const deleteUser = async (userId) => {
  const response = await fetchWithAuth(`${BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.ok;
};

// ******************************** CRUD MEZCLAS ********************************
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
  const response = await fetch(
    `${BASE_URL}/mixes?flavour=${flavour}&category=${category}`
  );
  const data = await response.json();
  return data;
};

const addMix = async (mix) => {
  const response = await fetchWithAuth(`${BASE_URL}/mixes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mix),
  });
  const data = await response.json();
  return data;
};

const updateMix = async (mixId, newData) => {
  const response = await fetchWithAuth(`${BASE_URL}/mixes/${mixId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const data = await response.json();
  return data;
};

const partiallyUpdateMix = async (mixId, partialData) => {
  const response = await fetchWithAuth(`${BASE_URL}/mixes/${mixId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(partialData),
  });
  const data = await response.json();
  return data;
};

const addLike = async (mixId) => {
  const response = await fetchWithAuth(`${BASE_URL}/mixes/${mixId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.ok;
};

const removeLike = async (mixId) => {
  const response = await fetchWithAuth(`${BASE_URL}/mixes/${mixId}/like`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.ok;
};

const deleteMix = async (mixId) => {
  const response = await fetchWithAuth(`${BASE_URL}/mixes/${mixId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.ok;
};

// ******************************** CRUD SABORES ********************************
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
  const response = await fetchWithAuth(`${BASE_URL}/flavours`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(flavour),
  });
  const data = await response.json();
  return data;
};

const updateFlavour = async (flavourId, newData) => {
  const response = await fetchWithAuth(`${BASE_URL}/flavours/${flavourId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const data = await response.json();
  return data;
};

const partiallyUpdateFlavour = async (flavourId, partialData) => {
  const response = await fetchWithAuth(`${BASE_URL}/flavours/${flavourId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(partialData),
  });
  const data = await response.json();
  return data;
};

const deleteFlavour = async (flavourId) => {
  const response = await fetchWithAuth(`${BASE_URL}/flavours/${flavourId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.ok;
};

// ******************************** CRUD ENTRADAS DE TEXTO ********************************
const getEntries = async () => {
  const response = await fetch(`${BASE_URL}/entries`);
  const data = await response.json();
  return data;
};

const getEntriesById = async (entryId) => {
  const response = await fetch(`${BASE_URL}/entries/${entryId}`);
  const data = await response.json();
  return data;
};

const getEntriesByCategory = async (category) => {
  const response = await fetch(`${BASE_URL}/entries?category=${category}`);
  const data = await response.json();
  return data;
};

const addEntry = async (entry) => {
  const response = await fetchWithAuth(`${BASE_URL}/entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  const data = await response.json();
  return data;
};

const updateEntry = async (entryId, newData) => {
  const response = await fetchWithAuth(`${BASE_URL}/entries/${entryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const data = await response.json();
  return data;
};

const partiallyUpdateEntry = async (entryId, partialData) => {
  const response = await fetchWithAuth(`${BASE_URL}/entries/${entryId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(partialData),
  });
  const data = await response.json();
  return data;
};

const deleteEntry = async (entryId) => {
  const response = await fetchWithAuth(`${BASE_URL}/entries/${entryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.ok;
};

const api = {
  login,
  register,
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
  addLike,
  removeLike,
  deleteMix,
  getFlavours,
  getFlavourById,
  getFlavoursByBrand,
  addFlavour,
  updateFlavour,
  partiallyUpdateFlavour,
  deleteFlavour,
  getEntries,
  getEntriesById,
  getEntriesByCategory,
  addEntry,
  updateEntry,
  partiallyUpdateEntry,
  deleteEntry,
};

export default api;
