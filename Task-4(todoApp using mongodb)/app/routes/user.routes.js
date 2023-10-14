const UserController = require("../controller/userController")
const router = require("express").Router()

router.get("/", UserController.all)

router.get("/addPost", UserController.addPost)
router.post("/addPostLogic", UserController.addPostLogic)

router.get("/single/:id", UserController.single)

router.get("/delAll", UserController.delAll)

router.get("/del/:id", UserController.del)

router.get("/activate/:id", UserController.activate)

router.get("/search/", UserController.search);    

router.get("/edit/:id",UserController.edit)
router.get("/editLogic/:id",UserController.editLogic)


module.exports=router
