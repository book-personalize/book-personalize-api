import request from 'request'
import P from 'bluebird'

import { naver } from 'common/config'
import messages from 'common/messages/messages'
import { type } from 'common/utils/type'

export default class BookService {
  findBookThroughNaverBookApi = async (
    bookTitle,
    start,
    count,
    _0 = type(bookTitle, 'string'),
    _1 = type(start, 'number'),
    _2 = type(count, 'number'),
  ) => {
    const books = await this._requestNaver(bookTitle, start, count)

    if (books.total === 0) {
      const notFoundError = new Error('NotFoundError')
      notFoundError.code = messages.B001.code
      notFoundError.details = messages.B001.detail

      throw notFoundError
    }

    return books
  }

  _requestNaver = (bookTitle, start, count) => {
    const options = {
      url: `${naver.host}?d_titl=${encodeURI(bookTitle)}&start=${start}&display=${count}`,
      headers: {
        'X-Naver-Client-Id': `${naver.clientId}`,
        'X-Naver-Client-Secret': `${naver.clientSecret}`,
      },
    }

    return new P((resolve, reject) =>
      request.get(options, (err, res) => {
        if (err) {
          return reject(err)
        }

        const body = JSON.parse(res.body)
        return resolve(body)
      }),
    )
  }
}
