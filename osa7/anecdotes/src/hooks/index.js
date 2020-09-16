import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  class HideReset {
    constructor() {
      // spread-syntaksi toimii vain avain-arvopareille, jotka ovat olion omistamia
      this.type = type
      this.value = value
      this.onChange = onChange
    }
  }
  // olio ei omista resettiä
  HideReset.prototype.reset = reset

  const hideReset = new HideReset()

  return hideReset
}
