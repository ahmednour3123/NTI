const deal = require("../helper/dealWithJson")
const connectDb = require("../../models/dbConnect")
const fileName = "models/users.json"
const userModel = require("../../models/myModels/user.model")
const { query } = require("express")

class User {
    static addPost = (req, res) => {
        res.render("addPost", {
            pageTitle: "Add Data"
        })
    }
    
    static addPostLogic = async (req, res) => {
        try {
            const data = new userModel(req.body)
            await data.save()
            res.redirect("/")
        }
        catch (e) {
            res.send(e)
        }
    }

    static all = async (req, res) => {
        try {
            const tasks = await userModel.find()
            res.render("all", {
                pageTitle: "All Data",
                tasks,
                hasData: tasks.length
            })
        }
        catch (e) {
            res.send(e.message)
        }
    }
    
    static edit = async (req, res) => {
        try {
            const task = await userModel.findById(req.params.id)
            res.render("edit", {
                pageTitle: "Edit Data",
                task
            })
        }
        catch (e) {
            res.send(e.message)
        }
    }
    static editLogic = async (req, res) => {
        try {
            const id = req.params.id
            await userModel.findByIdAndUpdate(id, req.query, { runValidators: true })
            res.redirect(`/single/${id}`)
        }
        catch (e) {
            res.send(e.message)
        }
    }
    static single = async (req, res) => {
        try {
            const task = await userModel.findById(req.params.id)
            res.render("single", {
                pageTitle: "single Data",
                task
            })
        }
        catch (e) {
            res.send(e.message)
        }
    }
    static del = async (req, res) => {
        try {
            await userModel.findByIdAndDelete(req.params.id)
            res.redirect("/")
        }
        catch (e) {
            res.send(e.message)
        }
    }

    static delAll = async (req, res) => {
        try {
            await userModel.deleteMany()
            res.redirect("/")
        }
        catch (e) {
            res.send(e.message)
        }
    }
    static activate = async (req, res) => {
        try {
            const id = req.params.id
            const task = await userModel.findByIdAndUpdate(id,{ status: true }, { runValidators: true })
            res.redirect("/")
            task
        }
        catch (e) {
            res.send(e)
        }
    }

    static search = async(req,res)=>{
        try{
            const search = req.query.search
            const regex = new RegExp(search)
                const task = await userModel.find(
                    {
                        $or: [
                            { title: {$regex: regex} }
                            , { content: search }
                        ]
                    }
                )
                res.render("single", {
                    pageTitle: "Search Data",
                    task
                })
            
        }
        catch(e){
            res.send(e)
        }
    }
}


module.exports = User