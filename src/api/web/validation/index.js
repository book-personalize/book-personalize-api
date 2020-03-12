import { validationResult } from 'express-validator'
import messages from '../../common/messages/messages'

export const beforeValidation = (req) => {
  const errorFormatter = ({ location, msg, param }) => `${location}[${param}]: ${msg}`

  const errors = validationResult(req).formatWith(errorFormatter)

  if (!errors.isEmpty()) {
    const error = new Error('ValidationError')
    error.code = messages.P000.code
    error.details = errors.array({ onlyFirstError: true })[0]

    throw error
  }
}
