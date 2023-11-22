// const data = {}
// data.employees = require('../model/employees.json') -for file writing
const Employee = require('../model/Employee')

const getAllEmployees = async (req, res) => {
    // res.json(data.employees)
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ message: "No employees found" })
    res.json(employees)
};

const createNewEmployee = async (req, res) => {
    const body = req.body;
    if (!body?.firstname && !body?.lastname && !body?.occupation) {
        res.json({ message: 'first name, last name and occupation are required' })
    } else {

        try {
            const result = await Employee.create({
                firstname: body.firstname,
                lastname: body.lastname,
                occupation: body.occupation
            })
            res.status(201).json(result)
        } catch (err) {
            console.log(err.message)
        }
        //adding 1 to the total length of the employees
        // const id = data.employees.length + 1
        // //create new employee
        // const newEmployee = {
        //     "id": id,
        //     "fist name": body.firstname,
        //     "last name": body.lastname,
        //     "occupation type": body.occupation
        // }
        // // add newEmployee to the last index of the employee array
        // data.employees.push(newEmployee)
        // const fetchData = data.employees
        // res.json(fetchData)
    }

};

const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ message: "ID required" })
    }
    const body = req.body;
    const foundemployee = await Employee.findOne({ _id: req.body.id }).exec()

    if (!foundemployee) return res.status(204).json({ message: `${req.body.id} does not match` })

    if (req.body?.firstname) foundemployee.firstname = body.firstname
    if (req.body?.lastname) foundemployee.lastname = body.lastname
    if (req.body?.occupation) foundemployee.occupation = body.occupation

    const result = await foundemployee.save();
    res.json(result)


    // data.employees.find(employee => {
    //     if (employee.id === req.body.id) {
    //         employee['occupation type'] = req.body.occupation;
    //         employee['first name'] = req.body.firstname;
    //         employee['last name'] = req.body.lastname;
    //         res.json(data.employees)
    //     } else {
    //         res.status(404).json(`${req.body.id} not found`)
    //     }
    // })
}

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ message: "ID required" })
    }
    const foundemployee = await Employee.findOne({ _id: req.body.id }).exec()
    if (!foundemployee) return res.status(204).json({ message: `${req.body.id} does not match` })
    const result = await foundemployee.deleteOne({ _id: req.body.id });
    res.json(result)
    // data.employees.find(employee => {
    //     if (employee.id == req.body.id) {
    //         const newEmployees = data.employees.splice(parseInt(employee.id) - 1, 1)
    //         res.json(newEmployees)
    //     } else {
    //         res.status(404).json(`${req.body.id} not found`)
    //     }
    // })
};

const getEmployee = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ message: "ID required" })
    }
    const foundemployee = await Employee.findOne({ _id: req.params.id }).exec()
    res.json(foundemployee)
    // data.employees.find(employee => {
    //     if (employee.id == req.params.id) {
    //         res.json(employee)
    //     } else {
    //         res.status(404).json(`${req.params.id} not found`)
    //     }
    // })
    // res.json(req.params.id)
}

module.exports = {
    getAllEmployees,
    getEmployee,
    createNewEmployee,
    updateEmployee,
    deleteEmployee
}