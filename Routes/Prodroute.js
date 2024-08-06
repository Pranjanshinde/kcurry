const express=require("express");
const {Prodmodel}=require("../models/prodmodel");

const prodrouter=express.Router();

prodrouter.post("/",async(req,res)=>{
    try {
      console.log(req.body,1);
        const post=new Prodmodel(req.body);
        await post.save();
        res.send({"msg":"new product added"});
    } catch (error) {
      res.send({"msg":error.message});  
    }
});

prodrouter.get("/",async(req,res)=>{
    try {
      const {material,product,text}  =req.query;
      let obj1={}
      if(material)
      {
        obj1={material:material}
      }
      if(product)
      {
        obj1={...obj1,product:product}
      }
    //   if(text)
    //   {
    //     obj1={...obj1,$text: { $search: text }}
    //   }
      
      let Prods=await Prodmodel.find(obj1);
      if(text)
      {
        Prods=Prods.filter((item,index)=>{
            return (item.title.includes(text));
        })
      }
      console.log(Prods);
      res.send(Prods);
    } catch (error) {
      res.send({"msg":error.message});  
    }
});

prodrouter.get("/:id",async(req,res)=>{
    try {
      const {id}=req.params;
      console.log(id);
      let prods=await Prodmodel.findOne({_id:id});
      res.send(prods);
    } catch (error) {
      res.send({"msg":error.message});  
    }
  });

  prodrouter.patch("/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        console.log(id);
        await Prodmodel.findByIdAndUpdate({_id:id},req.body);
        res.send({"msg":"product edited successfully"});
    } catch (error) {
      res.send({"msg":error.message});  
    }
});

prodrouter.delete("/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        console.log(id);
        await Prodmodel.findByIdAndDelete({_id:id});
        res.send({"msg":"product deleted successfully"});
    } catch (error) {
      res.send({"msg":error.message});  
    }
});


module.exports={prodrouter}