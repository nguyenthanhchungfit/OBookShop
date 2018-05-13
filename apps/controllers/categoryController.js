var bookModel = require("../models/bookModel");
var categoryModel = require("../models/categoryModel");


exports.getBooksForHomeByCategory = function(req, res){
    if(req.query.the_loai){
        var id_the_loai = req.query.the_loai;
        bookModel.getInforBooksForHomeByCategory(id_the_loai).then(function(data){
            res.render("home_item_book", {items : data.arr});
        })
    }else{
        categoryModel.getCategories().then(function(data){
            res.render("home_category_book", {items : data.arr});
        })
        res.render
    }
}