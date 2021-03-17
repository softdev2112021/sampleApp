interface Params {
  url: string;
  data?: any;
}

interface Options extends Params {
  method: string;
}

const postData = async ({ url, data }: Params): Promise<any> => {
  let res = await fetch(url, {
    credentials: 'include',
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status} (${res.statusText})`);
  }

  return res;
};

const changeResources = async ({ method, url, data = null }: Options): Promise<any> => {
  const options: RequestInit = {
    credentials: 'include',
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
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

const addResource = async (params: Params): Promise<any> => {
  return (await changeResources({ method: 'POST', ...params })).json();
};

const deleteResource = async (params: Params): Promise<any> => {
  return changeResources({ method: 'DELETE', ...params });
};

const getResources = async (params: Params): Promise<any> => {
  return (await changeResources({ method: 'GET', ...params })).json();
};

export { getResources, addResource, deleteResource, postData };
