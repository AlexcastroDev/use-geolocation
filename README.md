# use-geolocation-api

No dependencies, just Closure, Proxy and Geolocation. ( Native API )

## Installation

Using npm

```bash
npm install use-geolocation-api
```

using yarn

```bash
yarn add use-geolocation-api
```

## Usage

```javascript
import React from 'react'
import useGeolocation from 'use-geolocation-api'

React.useEffect(() => {
 useGeolocation({ requestLocationOnMount: true, onSuccess: (data) => console.log(data) })
}, [])
```

## Properties

Closure

```javascript
 onSuccess?: (data: GeolocationPosition) => void
 onError?: (error: GeolocationPositionError) => void
 getCurrentPositionOptions?: PositionOptions
 requestLocationOnMount?: boolean
```

Return
```javascript
location: GeolocationPosition | null
error: GeolocationPositionError | null
loading: boolean
requestGeolocation: () => void
```



## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)