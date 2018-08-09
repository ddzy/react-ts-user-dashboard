import axios from 'axios';


export interface IRequestOptions {
  method: string;
  url: string;
  token: string | null;
};

function checkStatus(res: any) {
  if(res.status >= 200 || res.status < 300 || res.status === 304  && res.data.code === 0) {
    return res.data;
  }
}



export function request(options: IRequestOptions) {
  return axios({
    method: options.method,
    url: options.url,
    headers: {
      Authorization: `Bearer ${options.token}`,
    },
  }).then(checkStatus).then((data) => { data });
}