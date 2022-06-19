
let createEmployeeRecord = (array) => {
    return {
        familyname:array[1],
        title:array[2],
        payPerHour:[3],
        timeInEvents:[],
        timeOutEvents:[],

    }
}

let createEmployeeRecords = (employeeData) => {
    return employeeData.map(row => {
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = dates => {
    let [date, hour] = dates.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let createTimeOutEvent = dates => {
    let [date, hour] = dates.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let hoursWorkedOnDate = expectedDate => {
    let timeIn = this.timeInEvents.find(e => {
        return e.date === expectedDate
    })

    let timeOut = this.timeOutEvents.find(e => {
        return e.date === expectedDate
    })

    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = dateExpected => {
    let baseWages = hoursWorkedOnDate.call(this, dateExpected) * this.payPerHour
    return parseFloat(baseWages.toString())
}


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) 

    return payable
}

let findEmployeeByFirstName = (srcArray, firstName) =>{
  return srcArray.find(rec => {
    return rec.firstName === firstName
  })
}

let calculatePayroll = arrayOfEmployeeRecords => {
    return arrayOfEmployeeRecords.reduce((memo, rec) => {
        return memo + allWagesFor.call(rec)
    }, 0)
}