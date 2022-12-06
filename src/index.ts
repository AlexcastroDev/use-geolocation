import { IGeolocationState, IUseGeolocation, IUseGeolocationReturn } from './types'

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}

export default function geolocationState(props?: IUseGeolocation) {
  const getCurrentPositionOptions = props?.getCurrentPositionOptions || options
  let location = null as GeolocationPosition | null
  let error = null as IGeolocationState['error']
  let isError = false
  let loading = false 
  let isMounted = false

  function manageGeolocationState() {
    const onSuccessCallback = (data: GeolocationPosition) => {
      props?.onSuccess && props.onSuccess(data)
      location = data
      loading = false
      isError = false
      error = null
    }

    const onErrorCallback = (data: GeolocationPositionError) => {
      props?.onError && props.onError(data)
      error = data
      isError = true
      loading = false
      location = null
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

    return {
      requestGeolocation,
      isMounted,
      isError,
      error,
      loading,
      data: location
    }
  }

  return manageGeolocationState as unknown as IUseGeolocationReturn
}