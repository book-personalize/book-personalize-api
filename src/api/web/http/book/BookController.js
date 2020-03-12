import { route, GET, before } from 'awilix-express'
import { query } from 'express-validator'
import Status from 'http-status'
import { badRequest, notFound, success } from '../../response'
import { beforeValidation } from '../../validation'

@route('/book')
export default class BookController {
  constructor({ bookService }) {
    this.bookService = bookService
  }

  @route('/search')
  @GET()
  @before([
    query('query')
      .isString()
      .notEmpty(),
    query('start')
      .isNumeric()
      .optional(),
    query('count')
      .isNumeric()
      .optional(),
  ])
  findThroughNaverBookApi = async (req, res, next) => {
    try {
      beforeValidation(req)

      const { query: bookTitle } = req.query
      const start = Number(req.query.start) || 1
      const count = Number(req.query.count) || 10

      const book = await this.bookService.findBookThroughNaverBookApi(bookTitle, start, count)

      return success(res, Status.OK)(book)
    } catch (error) {
      if (error.message === 'ValidationError') {
        return badRequest(res, { code: error.code, message: error.details })
      }

      if (error.message === 'NotFoundError') {
        return notFound(res, { code: error.code, message: error.details })
      }

      next(error)
    }
  }
}
