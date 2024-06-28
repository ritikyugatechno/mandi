/* eslint-disable react-hooks/rules-of-hooks */
import axios, { isCancel } from 'axios';
export enum methods {
  get = 'get',
  post = 'post',
  delete = 'delete',
  patch = 'patch',
  put = 'put'
}
export const api = async (
  method: methods,
  url: string,
  data: object = {}
) => {
  const controller = new AbortController();
  return (async () => {
    try {
      const response = await axios[method](url, {
        ...data,
        signal: controller.signal
      });
      const responseData = response.data;
      return responseData;
    } catch (err: unknown) {
      if (isCancel(err)) {
        console.log("---------------------------")
        console.log(err);
        console.log("---------------------------")
        return err;
      }
      return err;
    }
  })();
};
