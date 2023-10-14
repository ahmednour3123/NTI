const deal = require("../helper/dealWithJson")
const connectDb = require("../../models/dbConnect")
const ObjectId = require("mongodb").ObjectId
const fileName = "models/users.json"

class User{

    static addPostLogic = async(req,res)=>{
        try{
            connectDb(async(db)=>{
                await db.collection("tasks").insertOne(req.body)
                res.redirect("/")
            })
        }
        catch(e){
            res.send(e)
        }
    }
    static addPost = (req,res)=>{
        res.render("addPost", {
            pageTitle:"Add Data"
        })
    }
    
// ====================================================
static all =async(req,res)=>{
    try{
        connectDb(async(db)=>{
            const allTasks = await db.collection("tasks").find().toArray()
            res.render("all", {
                pageTitle:"All Data", 
                allTasks,
                hasData: allTasks.length
            })
        })
    }
    catch(e){
        res.send(e)
    }
}
// ====================================================

    static edit = async (req, res) => {
        try {
            connectDb(async (db) => {
                const task = await db.collection("tasks").findOne({
                    _id: new ObjectId(req.params.id)
                })
                res.render("edit", {
                    pageTitle: "Edit Data",
                    task
                })
            })
        }
        catch(e){
            res.send(e)
        }
}
    static editLogic = async (req, res) => {
        try {
            connectDb(async (db) => {
                const id = req.params.id
                const task = await db.collection("tasks")
                    .updateOne(
                        { _id: new ObjectId(id) },
                        { $set: {...req.query}}
                    )
                res.redirect(`/single/${id}`)
                task
            })
        }
        catch (e) {
            res.send(e.message)
        }
    }
// ====================================================
static single =  async(req,res)=>{
    try{
        connectDb(async(db)=>{
            const task = await db.collection("tasks").findOne({
                _id: new ObjectId(req.params.id)
            })
            res.render("single", {
                pageTitle: "Single Data",
                task
            })
        })
    }
    catch(e){
        res.send(e)
    }
}

// ====================================================
static del = async(req,res)=>{
    try{
        connectDb(async(db)=>{
            await db.collection("tasks")
                .deleteOne({
                _id: new ObjectId(req.params.id)
            })
            res.redirect("/")
        })
    }
    catch(e){
        res.send(e)
    }
}
// ====================================================
static activate = (req, res) => {
    try {
        connectDb(async(db) => {
        const task = await db.collection("tasks")
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: { status: true } }
            );
            res.redirect("/")
            task
    });
    } catch(e){
        res.send(e)
    }
    }
// ====================================================
static delAll = async(req,res)=>{
    try{
        connectDb(async(db)=>{
            await db.collection("tasks")
            .remove()
            res.redirect("/")
        })
    }
    catch(e){
        res.send(e)
    }
}
// ====================================================
    static search = async(req,res)=>{
        try {
            connectDb(async (db) => {
                const search = req.query.search
                let results = [];
                await db.collection("tasks").find(
                    {
                        $or: [
                            { title: { $regex: search } }
                            , { content: { $regex: search } }
                        ]
                    }
                ).toArray(function (err, result) {
                    result.forEach(element => {
                        results.push(element);
                    });
                    res.render("single", {
                        pageTitle: "Search Data",
                        results
                    })
                    // res.send("search")
                })
            })
        }
        catch(e){
            res.send(e)
        }
    }
}
module.exports = User