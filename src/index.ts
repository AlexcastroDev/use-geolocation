import { IUseGeolocation, IUseGeolocationReturn } from './types'
import GeolocationState from './state'

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}

const useGeolocation = (props?: IUseGeolocation): IUseGeolocationReturn => {
  const getCurrentPositionOptions = props?.getCurrentPositionOptions || options
  let isMounted = false

  const onSuccessCallback = (data: GeolocationPosition) => {
    props?.onSuccess && props.onSuccess(data)
    GeolocationState.location = data
    GeolocationState.loading = false
    GeolocationState.error = null
  }

  const onErrorCallback = (data: GeolocationPositionError) => {
    props?.onError && props.onError(data)
    GeolocationState.error = data
    GeolocationState.loading = false
    GeolocationState.location = null
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
    if (props?.requestLocationOnMount && !isMounted) {
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
