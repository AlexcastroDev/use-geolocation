export interface IGeolocationState {
  location: GeolocationPosition | null
  error: GeolocationPositionError | null
  loading: boolean
}

export interface IUseGeolocationReturn {
  location: GeolocationPosition | null
  error: GeolocationPositionError | null
  loading: boolean
  requestGeolocation: () => void
}

export interface IUseGeolocation {
  onSuccess?: (data: GeolocationPosition) => void
  onError?: (error: GeolocationPositionError) => void
  getCurrentPositionOptions?: PositionOptions
  requestLocationOnMount?: boolean
}
