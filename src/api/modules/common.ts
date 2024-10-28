import { post } from '../http.js'

export async function getData(data: any) {
  return post('/langdetect', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
