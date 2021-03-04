import fetch from 'node-fetch';

const getResources = async (url: string): Promise<any> => {
  let res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};

const postData = async (url: string, data: any): Promise<any> => {
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });

  return await res.json();
};

export { getResources, postData };
