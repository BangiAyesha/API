const Employee = require("../db/employeeSchema");

async function getData() {
    return await Employee.find({});
}

async function login(data) {
    console.log(data.email);
    return await Employee.findOne({
        $and: [{ email: data.email }, { password: data.password }],
    });
}

async function deleteData(id) {
    await Employee.deleteOne({ _id: id }, (err) => {
        if (err) {
            throw err;
        }
    });
}

async function updateData(id, data) {
    await Employee.updateOne({ _id: id }, { $set: data }, (err) => {
        if (err) {
            throw err;
        } else {
            return data;
        }
    });
}

async function postData(data) {
    console.log(data);
    let ins = await new Employee(data);
    ins.save((err) => {
        if (err) {
            throw err;
        }
    });
}

module.exports = { getData, postData, updateData, deleteData, login };
