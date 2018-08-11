enum Result (Error, Value) {
  map (fn) {
    return match this {
      Error => this
      Value x => fn(x)
    }
  }

  mapError (fn) {
    return match this {
      Error e => fn(e)
      Value => this
    }
  }

  withDefault (defaultValue) {
    return match this {
      Error => defaultValue
      Value value => value 
    }
  }
}

enum Maybe (Value, Nothing) {
  map (fn) {
    return match this {
      Value x => fn(x)
      Nothing => this
    }
  }

  withDefault (defaultValue) {
    return match this {
      Value value => value 
      Nothing => defaultValue
    }
  }
}