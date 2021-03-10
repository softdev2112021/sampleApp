const postData = async (url, data) => {
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  return res;
};

const changeResources = async ({ method, url, accessToken, data = null }) => {
  const options = {
    method,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  let res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return res;
};

const addResource = async (params) => {
  return changeResources({ method: 'POST', ...params });
};

const deleteResource = async (params) => {
  return changeResources({ method: 'DELETE', ...params });
};

const getResources = async (params) => {
  return (await changeResources({ method: 'GET', ...params })).json();
};

export { getResources, addResource, deleteResource, postData };
