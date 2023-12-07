# Test Documentation
### Assumptions on requirements
* Orange HRM is testing the Vacancy management and Employment management features
* It should be able to create, search, update, and delete vacancy records.
* It should be able to use the API to create employee create, search, update, and delete employee records.

### Summary of Automated Tests
| Test | Type | Automated? |
|------|------|------------|
| It should be able to login successfully | E2E | Yes |
| It should be able to create a vacancy record | E2E | Yes |
| It should be able to search for an existing vacancy record | E2E | Yes |
| It should be able to update an existing vacancy record | E2E | Yes |
| It should be able to delete an existing vacancy records | E2E | Yes |
| It should be able to retrieve a session cookie | API | No |
| It should be able to create an employee record | API | No |
| It should be able to retrieve an employee record | API | No |
| It should be able to update an employee record | API | No |
| It should be able to delete an employee record | API | No |

### How to run the tests
#### Requirements
1. Nodejs
#### Installation
1. Run `npm install`
2. Running the tests headlessly: `npx playwright test`
3. Running the tests with head: `npx playwright test --headed`
4. Checking the test report: `npx playwright show-report`
