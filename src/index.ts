import { IUseGeolocation, IUseGeolocationReturn } from './types'
import GeolocationState from './state'

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}

const useGeolocation = ({
  onSuccess,
  onError,
  requestLocationOnMount,
  getCurrentPositionOptions = options,
}: IUseGeolocation): IUseGeolocationReturn => {
  let isMounted = false

  const onSuccessCallback = (data: GeolocationPosition) => {
    onSuccess && onSuccess(data)
    GeolocationState.location = data
    GeolocationState.loading = false
  }

  const onErrorCallback = (data: GeolocationPositionError) => {
    onError && onError(data)
    GeolocationState.error = data
    GeolocationState.loading = false
  }

  const requestGeolocation = () => {
    if (typeof window !== 'undefined') {
      navigator.geolocation.getCurrentPosition(
        onSuccessCallback,
        onErrorCallback,
        getCurrentPositionOptions
      )
    }
  }

  ;(() => {
    if (requestLocationOnMount && !isMounted) {
      requestGeolocation()
    }
    isMounted = true
  })()

  return {
    location: GeolocationState.location,
    error: GeolocationState.error,
    loading: GeolocationState.loading,
    requestGeolocation,
  }
}

export default useGeolocation
