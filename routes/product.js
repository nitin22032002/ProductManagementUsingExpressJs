const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const express=require('express');
const router=express.Router();
const upload=require('./upload');
const pool=require("./mysqlconnection");
router.get('/adminadd',function(req,res){
    var b=req.query.id;
    if(b==undefined){
        // data={productid:"",productname: '',producttype: "",productprice:"",productofferprice: "",productstock:"",productimage: '',ptype: '--Select Product Type--',gst:""}
        res.render('addproduct',{status:false});
    }
    else{
        pool.query('select p.*,(select pt.producttype from productstype pt where pt.producttypeid=p.producttype) as ptype,(select pt.producttypegst from productstype pt where pt.producttypeid=p.producttype) as gst from products p where(productid=?)',[b],function(error,result){
            console.log(result);
            res.render('update',{tem:0,status:false,action:0,data:result[0],b1:"Edit",b2:"Delete",b3:"submit"});
        })
    }
});
router.get('/admin',function(req,res){
    var c=cryptr.encrypt('admin')
    var a="/product/fetch?b="+c;
    res.redirect(a);
})
router.get('/',function(req,res){
    try{
    var name=cryptr.encrypt(req.query.name)
    var state=cryptr.encrypt(req.query.state)
    var city=cryptr.encrypt(req.query.city)
    var a=req.query.a;
    }
    catch(error){
        name=req.query.name
        state=req.query.state
        city=req.query.city
        var a=0
    }
    var t=cryptr.encrypt('user')
    var a="/product/fetch?b="+t+"&a="+a+"&n="+name+"&s="+state+"&c="+city
    res.redirect(a);
})
router.get('/fetch',function(req,res){
    if(req.query.a!=undefined && req.query.a!=0){
        
        pool.query('select p.*,(select pt.producttype from productstype pt where pt.producttypeid=p.producttype) as ptype,(select pt.producttypegst from productstype pt where pt.producttypeid=p.producttype) as gst from products p where(p.producttype=?)',[req.query.a],function(error,result){
            // console.log(result);
            try{
            res.render('user',{data:result,status:true,a:req.query.a,name:cryptr.decrypt(req.query.n),state:cryptr.decrypt(req.query.s),city:cryptr.decrypt(req.query.c)})
            }
            catch(error){
            res.render('user',{data:result,status:true,a:req.query.a,name:req.query.n,state:req.query.s,city:req.query.c})
            }
        })}
    else{
pool.query('select p.*,(select pt.producttype from productstype pt where pt.producttypeid=p.producttype) as ptype,(select pt.producttypegst from productstype pt where pt.producttypeid=p.producttype) as gst from products p',function(error,result){
    if(error){
        console.log(error)
        res.render('user',{status:false,a:req.query.a,name:cryptr.decrypt(req.query.n),state:cryptr.decrypt(req.query.s),city:cryptr.decrypt(req.query.c)})
    }
    else{
        // console.log(result)
        if(cryptr.decrypt(req.query.b)=='admin'){
            res.render('admin',{data:result,status:true,a:req.query.a})
        }
        else{
            try{
            res.render('user',{data:result,status:true,a:req.query.a,name:cryptr.decrypt(req.query.n),state:cryptr.decrypt(req.query.s),city:cryptr.decrypt(req.query.c)})
            }
            catch(error){
                res.render('user',{data:result,status:true,a:req.query.a,name:req.query.n,state:req.query.s,city:req.query.c})
            }
        }
    }
})}
});
router.get('/updateimage',function(req,res){
    res.render('updateimage',{id:req.query.id});
})
router.post('/uimage',upload.single('productimage'),function(req,res){
    var image=req.file.filename;
    // console.log(req.body,image)
    var id=req.body.id;
    pool.query('update products set productimage=? where(productid=?)',[image,id],function(error,result){
        if(error){
            console.log(error)
            var a="/product/updateimage?id="+id
            res.redirect(a)
        }
        else{
        res.redirect("/product/admin")}
    })
})
router.get('/admin',function(req,res){
    var a="/product/admin"
    res.redirect(a);
});
router.post('/addproduct',upload.single('productimage'),function(req,res){
    console.log(req.body,req.files)
    var pname=req.body.pname;
    var ptype=req.body.ptype;
    var price=req.body.price;
    var oprice=req.body.oprice;
    var stock=req.body.stock;
    var image=req.file.filename
    pool.query('insert into products (productname, producttype, productprice, productofferprice, productstock, productimage) values(?,?,?,?,?,?)',[pname,ptype,price,oprice,stock,image],function(error,result){
        if(error){
            console.log(error);
            res.render('addproduct',{status:true,c:false,message:"Product Not Add Process Failed"})
        }
        else{
            res.render('addproduct',{status:true,c:true,message:"Product Add Successfully"})
        }
    })
});
router.post('/update',function(req,res){
    // console.log(req.body)
    var btn=req.body.btn;
    var id=req.body.id;
    if(btn=="edit"){
    var pname=req.body.pname;
    var ptype=req.body.ptype;
    var price=req.body.price;
    var oprice=req.body.oprice;
    var stock=req.body.stock;
    pool.query('update products set productname=?, producttype=?, productprice=?, productofferprice=?, productstock=? where(productid=?)',[pname,ptype,price,oprice,stock,id],function(error,result){
        if(error){
            console.log(error);
            res.render('update',{status:true,c:false,message:"Product Not Update"})
        }
        else{
            var a="/product/admin"
            res.redirect(a);
        }
    })}
    else{
        pool.query('delete from products where(productid=?)',[id],function(error,result){
            if(error){
                console.log(error);
            res.render('update',{status:true,c:false,message:"Product Not delete"})
            }
            else{
                var a="/product/admin"
            res.redirect(a);
            }
        })
    }
});
router.get('/fetchgst',function(req,res){
    pool.query('select producttypegst from productstype where(producttypeid=?)',[req.query.pid],function(error,result){
        if(error){
            console.log(error);
            res.status(500).json([])
        }
        else{
            res.status(200).json(result);
        }
    })
});
router.get('/fetchtype',function(req,res){
    pool.query('select producttype,producttypeid from productstype',function(error,result){
        if(error){
            console.log(error);
            res.status(500).json([])
        }
        else{
            res.status(200).json(result);
        }
    })
});
router.get('/loginsignup',function(req,res){
    if(req.query.btn=="go"){
    res.redirect('/authentication/login');}
    else{
        res.redirect('/product/')
    }
})
router.get('/purchase',function(req,res){
    pool.query('update products set productstock=? where(productid=?)',[(req.query.st-1),req.query.id],function(error,result){
        var name=req.query.name
    var state=req.query.state
    var city=req.query.city
    var a="/product/?a="+req.query.a+"&name="+name+"&state="+state+"&city="+city
        res.redirect(a);
    })
})
module.exports=router;