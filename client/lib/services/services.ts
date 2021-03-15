interface Params {
  url: string;
  accessToken: string;
  data?: any;
}

interface Options extends Params {
  method: string;
}

const postData = async (url: string, data: any): Promise<any>  => {
  let res = await fetch(url, {
    credentials: 'include',
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  return res;
};

const changeResources = async ({ method, url, accessToken, data = null }: Options): Promise<any> => {
  const options = {
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
  return changeResources({ method: 'POST', ...params });
};

const deleteResource = async (params: Params): Promise<any> => {
  return changeResources({ method: 'DELETE', ...params });
};

const getResources = async (params: Params): Promise<any> => {
  return (await changeResources({ method: 'GET', ...params })).json();
};

export { getResources, addResource, deleteResource, postData };
