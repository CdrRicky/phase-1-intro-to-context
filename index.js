// Your code here
function createEmployeeRecord(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(recordOfRecords) {
    return recordOfRecords.map(createEmployeeRecord);
}

const getHour = function(dateTime) {
    return parseInt(dateTime.match(/\d{4}$/)[0])
}

const getDate = function(dateTime) {
    return dateTime.match(/\d{4}-\d{2}-\d{2}/)[0]
}

function createTimeInEvent(employees, timeIn) {
    employees.timeInEvents.push({
        type: "TimeIn",
        date: getDate(timeIn),
        hour: getHour(timeIn)
    })
    return employees;
}

function createTimeOutEvent(employees, timeOut) {
    employees.timeOutEvents.push({
        type: "TimeOut",
        date: getDate(timeOut),
        hour: getHour(timeOut)
    })
    return employees;
}

function hoursWorkedOnDate(employees, dateGiven) {
    let timeIn = employees.timeInEvents.find(event => 
        event.date == dateGiven)
    let timeOut = employees.timeOutEvents.find(event => 
        event.date == dateGiven)
    let totalTime = (timeOut.hour - timeIn.hour) / 100
    return totalTime;
}

function wagesEarnedOnDate(employees, dateGiven) {
    let hours = hoursWorkedOnDate(employees, dateGiven)
    return employees.payPerHour * hours;
}

function allWagesFor(employees) {
    return employees.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employees, event.date)
    }, 0)
}

function calculatePayroll(employeeRecord) {
    return employeeRecord.reduce((total, employee) => {
        return total + allWagesFor(employee)
    }, 0)
}