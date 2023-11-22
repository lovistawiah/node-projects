const Task = require("./models/Task")
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    } catch (e) {
        res.status(500).json(e)
    }
}
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch (e) {
        res.status(500).json({ message: e })
    }
}
const getSingleTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })
        if (!task) {
            return res.status(404).json({ msg: `no task id ${taskID}` })
        }
        res.status(200).json({ task })
    } catch (e) {
        res.status(500).json({ msg: e })
    }
}
const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const { name, completed } = req.body
        const task = await Task.findOneAndUpdate({ _id: taskID }, { name, completed }, { new: true })
        if (!task) {
            return res.status(404).json({ msg: `no update!` })
        }
        res.status(200).json({ task })
    } catch (e) {
        res.status(500).json({ msg: e })
    }
}
const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOneAndDelete({ _id: taskID })
        if (!task) {
            return res.status(404).json({ msg: `no task id ${taskID}` })
        }
        res.status(200).json({ task })
    } catch (e) {
        res.status(500).json({ msg: e })
    }

}

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}