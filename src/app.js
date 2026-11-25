const express = require("express")
const noteModel = require("./model/note.model")

const app = express();
app.use(express.json());

app.post("/notes",async(req,res)=>{

    const data = req.body
    await noteModel.create({
        title:data.title,
        discription:data.discription
    })
res.status(201).json({
    massage: "note created . .. ..."
})

})   

app.get("/notes/:id",async(req,res)=>{
    
    const id = req.params.id
    const notes = await noteModel.find()
    // const notes = await noteModel.findOne({
    //     title:`mtj---${id}`
    // })

    res.status(200).json({
        massage: "notes fatched successfully ",
        notes:notes
    })
})

app.delete("/notes/:id", async(req,res)=>{ 
    const id = req.params.id

    /* await noteModel.findByIdAndDelete(id)*/

await noteModel.findByIdAndDelete({_id:id})

    // await noteModel.findOneAndDelete({
    //     title:`mtj---${id}`
    // })

    res.status(200).json({
        massage:"delition complete. . . "
    })
})

app.patch("/notes/:id", async(req,res)=>{

    const id = req.params.id 
    await noteModel.findByIdAndUpdate(id,{title: req.body.title,discription:req.body.discription})

    res.status(200).json({
        massage:"notes updated successfully"
})
})

module.exports = app
