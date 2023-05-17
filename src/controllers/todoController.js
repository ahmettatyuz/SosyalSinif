const axios = require("axios");
const todolistGetir = async (req, res, next) => {
    const token = req.cookies.token;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const todo = await axios.get(process.env.BASE_URL +"/api/todo",config);
    // console.log(todo.data);
    res.render("index", { page: "todolist", userSession: req.userSession ,todo:todo.data});

}

module.exports = {
    todolistGetir
}