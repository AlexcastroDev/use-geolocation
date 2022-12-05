import { IGeolocationState } from '../types'

export const data = {
  location: null,
  error: null,
  loading: false,
}

export const schema: IGeolocationState = JSON.parse(JSON.stringify(data))
