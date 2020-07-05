const express = require ('express');

const server  = express();
server.use(express.json());


const  projects  = [];



function checkProjectExists(req,res,next){
    const { id } = req.params;
    const project = projects.find(l=>l.id ==id);

    if(!project){
        return res.status(400).json({erro: `Project not found`})
    }
    next();
}

//Middleware Global  -Count Request  + Time request
server.use((req,res, next)=>{
    console.time('Request');
    console.count("Number of requests");

    next();
    console.timeEnd('Request');
})





//All Projects
server.get ('/projects', (req,res)=>{
    
    return res.json(projects);
});


//Create Projects
server.post('/projects', (req,res)=>{
    const  {id, title} = req.body;

    const project  = {
        id,
        title,
        task:[]
    };
    projects.push(project);
    
    return res.json(project);
});
// Project Change
server.put('/projects/:id', checkProjectExists, (req,res)=>{
    const { id } =  req.params;
    const { title } = req.body;

    const project = projects.find(l =>l.id == id);

    project.title  = title;

    return res.json(project);
});


// Delete Projects
server.delete('/projects/:id',checkProjectExists, (req,res)=>{
    const { id }  = req.params;
    
    const projectIndex = projects.findIndex(l => l.id == id);

    projects.splice(projectIndex, 1);

    return res.send();
})

//Title addition in Task
server.post('/projects/:id/task', checkProjectExists, (req,res)=>{
    const { id } =  req.params;
    const { title } = req.body;

    const project  = projects.find(l=>l.id == id);
    project.task.push(title);

    return res.json(project);
});

// Change of Title of the Task
server.put('/projects/:id/task', checkProjectExists,(req,res)=>{
    const { id } = req.params;
    const { title  } = req.body;

    const project = projects.find(l =>l.id == id);
    project.task = title;

    return res.send(project);

})


server.listen(3000);