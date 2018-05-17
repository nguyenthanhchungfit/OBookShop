var bookModel = require("../models/bookModel");
var authorModel = require("../models/authorModel")


exports.GetAuthorbyID = function(req, res){
    var tacGia = authorModel.getAuthorbyID(req.params.id)
    tacGia.then(function(tac_gia){
        tacgia = tac_gia[0]
        
        idSachTuTacGia = bookModel.getBookbyIDAuthor(req.params.id)
        idSachTuTacGia.then(function(sach){

            var ListTacGia = authorModel.getAuthor()
            ListTacGia.then(function(listTacGia){
                var result = {
                    tacgia: tacgia,
                    sach: sach,
                    listTacGia: listTacGia
                }
                res.render("detail_author", {data: result});
            })
        })

    })
    
}

exports.author_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Author List');
};