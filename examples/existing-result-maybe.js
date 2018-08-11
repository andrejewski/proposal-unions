function isValueType (type) {
  return type.type === 'value'
}

export class Result {
  static error (error) {
    return new Result({ type: 'error', data: error })
  }

  static value (value) {
    return new Result({ type: 'value', data: value })
  }

  constructor (result) {
    const isResult = result && (result.type === 'error' || result.type === 'value');
    if (!isResult) {
      throw new Error('Result must be either an error or value');
    }
    this.type = result.type
    this.data = result.data
  }

  match (valueCallback, errorCallback) {
    return isValueType(this)
      ? valueCallback(this.data)
      : errorCallback(this.data)
  }

  map (valueCallback) {
    return isValueType(this)
      ? Result.value(valueCallback(this.data))
      : Result.error(this.data)
  }

  mapError (errorCallback) {
    return isValueType(this)
      ? Result.value(this.data)
      : Result.error(errorCallback(this.data))
  }

  withDefault (value) {
    return isValueType(this)
      ? this.data
      : value
  }

  toJSON () {
    return { type: this.type, data: this.data }
  }
}

export class Maybe {
  static value (data) {
    return new Maybe({ type: 'value', data })
  }

  static nothing () {
    return new Maybe({ type: 'nothing' })
  }

  constructor (maybe) {
    const isMaybe = maybe && (maybe.type === 'nothing' || maybe.type === 'value');
    if (!isMaybe) {
      throw new Error('Maybe must be either a value or nothing');
    }
    this.type = maybe.type
    this.data = maybe.data
  }

  match (valueCallback, nothingCallback) {
    return isValueType(this)
      ? valueCallback(this.data)
      : nothingCallback()
  }

  map (valueCallback) {
    return isValueType(this)
      ? Maybe.value(valueCallback(this.data))
      : Maybe.nothing()
  }

  withDefault (value) {
    return isValueType(this)
      ? this.data
      : value
  }

  toJSON () {
    return isValueType(this)
      ? { type: this.type, data: this.data }
      : { type: 'nothing' }
  }
}