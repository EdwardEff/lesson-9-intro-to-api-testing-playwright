import { test, expect } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

const BASE_URL = 'https://backend.tallinn-learning.ee/test-orders'

test.describe('Order API basic tests', () => {
  test('GET /test-orders/{id} should return 200 OK', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/1`)
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('PUT /test-orders/{id} should return 200 OK', async ({ request }) => {
    const requestHeaders = {
      api_key: '1234567890123456',
      'Content-Type': 'application/json',
    }

    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0,
    }

    const response = await request.put(`${BASE_URL}/1`, {
      data: requestBody,
      headers: requestHeaders,
    })
    console.log(response.status())
    console.log(await response.json())
    expect(response.status()).toBe(StatusCodes.OK)
  })

  test('DELETE /test-orders/{id} should return 204', async ({ request }) => {
    const requestHeaders = {
      api_key: '1234567890123456',
      'Content-Type': 'application/json',
    }

    const response = await request.delete(`${BASE_URL}/1`, {
      headers: requestHeaders,
    })
    expect(response.status()).toBe(StatusCodes.NO_CONTENT)
  })
})
