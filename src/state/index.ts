import { IGeolocationState } from '../types'
import { schema } from './schema'

function geolocationStateProxy(schema: any) {
  const handler: ProxyHandler<IGeolocationState> = new Proxy(schema, {
    get: function (target, property, receiver) {
      return Reflect.get(target, property, receiver)
    },
    set: function (target, property, value) {
      target.onChange && target.onChange()
      return Reflect.set(target, property, value)
    },
  })

  return new Proxy(schema, handler)
}

const GeolocationState: IGeolocationState = geolocationStateProxy(schema)

export default GeolocationState
