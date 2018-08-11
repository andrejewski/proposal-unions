# Proposal for Discriminated Unions

Serious Work in Progress

## Status
**Stage:** 0
**Champion:** *unassigned*

## Authors

* Chris Andrejewski (@andrejewski)

# Previous Discussions

# Motivations

# Adoption

# Proposal

# Example

```
enum Msg (
  Increment,
  Decrement
)

function update (msg, count) {
  const newCount = match msg {
    Increment (n = 1) => count + n
    Decrement (n = 1) => count - n
  }
  return Math.max(0, Math.min(newCount, 100))
}

update(Msg.Increment, 1) // 2
update(Msg.Increment(5), 1) // 6
update(Msg.Decrement, 1) // 0
update(Msg.Decrement(5), 1) // -4
```