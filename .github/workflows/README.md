## Checklist for testing Mock endpoints

| endpoint            | Method   | Object                | expected result | Status |
| ------------------- | -------- | --------------------- | --------------- | ------ |
| '/test-orders/{id}' | 'GET'    | Order receiving by ID | '200 OK'        | xx     |
| '/test-orders/{id}' | 'PUT'    | Order update          | '200 OK'        | xx     |
| '/test-orders/{id}' | 'DELETE' | Order deleting        | '200 OK'        | xx     |

## ( Risk API Checklist)

## Loan decision API checklist

| #   | Scenario                                                        | Request (ключевые параметры)                                                          | Expected status | Expected result                                                                |
| --- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------ |
| 1   | Молодой клиент, маленький доход и относительно крупный кредит   | income = 450, debt = 0, age = 19, employed = true, loanAmount = 1500, loanPeriod = 18 | 200 OK          | riskDecision = "negative", riskLevel = "Very High Risk", riskPeriods = []      |
| 2   | Стабильный доход, без долгов, маленький кредит на короткий срок | income = 2200, debt = 0, age = 32, employed = true, loanAmount = 600, loanPeriod = 6  | 200 OK          | riskDecision = "positive", riskLevel = "Medium Risk", riskPeriods = [6, 9, 12] |
| 3   | Тот же клиент, кредит на более долгий срок                      | income = 2200, debt = 0, age = 32, employed = true, loanAmount = 600, loanPeriod = 24 | 200 OK          | riskDecision = "positive", riskLevel = "Medium Risk", riskPeriods = [6, 9, 12] |

[//]: # '## Risk API Checklist'
[//]: #
[//]: # '| #   | Case                    | Expected Status Code | Expected Result                                         |'
[//]: # '| --- | ----------------------- | -------------------- | ------------------------------------------------------- |'
[//]: # '| 1   | Low risk                | 200 OK               | riskLevel = "Low Risk", riskDecision = "positive"       |'
[//]: # '| 2   | Medium risk             | 200 OK               | riskLevel = "Medium Risk", riskDecision = "positive"    |'
[//]: # '| 3   | High risk               | 200 OK               | riskLevel = "High Risk", riskDecision = "positive"      |'
[//]: # '| 4   | Very high risk          | 200 OK               | riskLevel = "Very High Risk", riskDecision = "negative" |'
[//]: # '| 5   | Invalid — zero income   | 400 Bad Request      | validation error message                                |'
[//]: # '| 6   | Invalid — negative debt | 400 Bad Request      | validation error message                                |'
[//]: # '| 7   | Underage applicant      | 200 OK               | riskLevel = "High Risk"                                 |'
[//]: # '| 8   | Unemployed applicant    | 200 OK               | riskLevel = "Very High Risk"                            |'
