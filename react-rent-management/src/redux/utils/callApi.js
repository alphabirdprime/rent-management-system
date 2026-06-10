import config from '../../config';

const buildQueryString = (qs) => {
  const params = new URLSearchParams();
  Object.entries(qs).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value);
    }
  });
  const query = params.toString();
  return query ? `?${query}` : '';
};

const callApi = async (method, path, body = {}, qs = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  const token = window.localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = `${config.server}${path}${buildQueryString(qs)}`;
  const options = {
    method,
    headers,
  };

  if (method !== 'GET' && method !== 'HEAD') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.err || 'Request failed');
    error.statusCode = response.status;
    error.error = data;
    throw error;
  }

  return data;
};

export default callApi;
