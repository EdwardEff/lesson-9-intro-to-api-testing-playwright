import { StatusCodes } from 'http-status-codes'
import { test, expect, type APIRequestContext } from '@playwright/test'

const LOAN_DECISION_URL = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

type LoanRequest = {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number
}

type LoanDecision = {
  riskScore: number
  riskLevel: string
  riskPeriods: number[]
  applicationId: string
  riskDecision: string
}

type LoanExample = {
  title: string
  request: LoanRequest
  expectedStatus: number
  expectedDecision: 'positive' | 'negative'
  expectedLevel: string
  expectedPeriods: number[]
}

const examples: LoanExample[] = [
  {
    title: 'молодой клиент, маленький доход и относительно крупный кредит',
    request: {
      income: 450,
      debt: 0,
      age: 19,
      employed: true,
      loanAmount: 1500,
      loanPeriod: 18,
    },
    expectedStatus: StatusCodes.OK,
    expectedDecision: 'negative',
    expectedLevel: 'Very High Risk',
    expectedPeriods: [],
  },
  {
    title: 'стабильный доход, без долгов, маленький кредит на короткий срок',
    request: {
      income: 2200,
      debt: 0,
      age: 32,
      employed: true,
      loanAmount: 600,
      loanPeriod: 6,
    },
    expectedStatus: StatusCodes.OK,
    expectedDecision: 'positive',
    expectedLevel: 'Medium Risk',
    expectedPeriods: [6, 9, 12],
  },
  {
    title: 'тот же клиент, но кредит на более долгий срок',
    request: {
      income: 2200,
      debt: 0,
      age: 32,
      employed: true,
      loanAmount: 600,
      loanPeriod: 24,
    },
    expectedStatus: StatusCodes.OK,
    expectedDecision: 'positive',
    expectedLevel: 'Medium Risk',
    expectedPeriods: [6, 9, 12],
  },
]

async function checkExample(
  example: LoanExample,
  requestFixture: APIRequestContext,
): Promise<void> {
  const response = await requestFixture.post(LOAN_DECISION_URL, {
    data: example.request,
  })

  expect(response.status()).toBe(example.expectedStatus)

  const body: LoanDecision = await response.json()
  console.log('scenario:', example.title)
  console.log('request:', example.request)
  console.log('response:', body)

  expect(body).toHaveProperty('riskDecision')
  expect(body).toHaveProperty('riskLevel')
  expect(body).toHaveProperty('riskScore')
  expect(Array.isArray(body.riskPeriods)).toBe(true)

  expect.soft(body.riskDecision).toBe(example.expectedDecision)
  expect.soft(body.riskLevel).toBe(example.expectedLevel)
  expect.soft(body.riskPeriods).toEqual(example.expectedPeriods)

  expect.soft(body.riskScore).toBeGreaterThanOrEqual(0)
}

// Тут воспользовался помощь чата тк не помню и не понял как активировать генерацию тестов
examples.forEach((example, index) => {
  test(`loan decision case ${index + 1}: ${example.title}`, async ({ request }) => {
    await checkExample(example, request)
  })
})
