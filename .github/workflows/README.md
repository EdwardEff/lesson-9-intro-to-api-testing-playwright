## Checklist for testing Mock endpoints

| endpoint            | Method   | Object                | expected result | Status |
|---------------------|----------|-----------------------|-----------------|--------|
| '/test-orders/{id}' | 'GET'    | Order receiving by ID | '200 OK'        | xx     |
| '/test-orders/{id}' | 'PUT'    | Order update          | '200 OK'        | xx     |
| '/test-orders/{id}' | 'DELETE' | Order deleting        | '200 OK'        | xx     |


## Risk API Checklist

| # | Case                    | Expected Status Code | Expected Result                                         |
|---|-------------------------|----------------------|---------------------------------------------------------|
| 1 | Low risk                | 200 OK               | riskLevel = "Low Risk", riskDecision = "positive"       |
| 2 | Medium risk             | 200 OK               | riskLevel = "Medium Risk", riskDecision = "positive"    |
| 3 | High risk               | 200 OK               | riskLevel = "High Risk", riskDecision = "positive"      |
| 4 | Very high risk          | 200 OK               | riskLevel = "Very High Risk", riskDecision = "negative" |
| 5 | Invalid — zero income   | 400 Bad Request      | validation error message                                |
| 6 | Invalid — negative debt | 400 Bad Request      | validation error message                                |
| 7 | Underage applicant      | 200 OK               | riskLevel = "High Risk"                                 |
| 8 | Unemployed applicant    | 200 OK               | riskLevel = "Very High Risk"                            |
