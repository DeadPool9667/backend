const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose') 
const user = require('./routes/user')
const auth = require('./routes/auth')
const product = require('./routes/product')
const ticket = require('./routes/ticket')
const farmer = require('./routes/farmer')
const multer = require('multer')

const dotenv = require('dotenv');
const Ticket = require('./models/Ticket')
const Upload = require('./models/Uploads')
const fileSize = require('filesize')

const path = require('path')


dotenv.config()

const app = express()

//Connect DB
const CONNECTION_URL = `${process.env.DATABASE_URL}`
const PORT = 5000;

const size = fileSize.partial({base: 2, standard: "jedec"});

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/uploads')
    },
    filename:function(req,file,cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
})

let upload = multer({storage:storage})

let pathh = path.resolve(__dirname, 'public')

app.use(express.static(pathh))

app.use(cors())
app.use(express.json({limit: '50mb'}))

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/', (req,res) => res.send("API Running"))

app.use('/user', user)
app.use('/auth', auth)
app.use('/product', product)
app.use('/ticket', ticket)
app.use('/farmer', farmer)

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology:true
})
.then(() => app.listen(process.env.PORT || PORT, () => console.log(`Server running on port ${PORT}`)))
.catch((error) => console.log(error.message))

app.post('/request/upload', upload.array('files'), async (req,res) => {
    let ticket = await Ticket.findById(req.body.id)

    if(!ticket){
        throw new Error('Something went wrong')
    }
    let resData 
    // console.log(ticket[0].MediaClient)
    try{
        let fileArray = []
        let savedFile
        req.files.forEach(async(element) => {
            // const file = {
            //     fileName: element.originalname,
            //     filePath: element.path,
            //     fileType: element.mimetype,
            //     fileSize: size(element.size)
            // }
            
            // fileArray.push(file)

            const multipleFiles = new Upload({
                ForTicket: req.body.id,
                FileName: element.originalname,
                FilePath: element.path,
                FileType: element.mimetype,
                FileSize: size(element.size)
            });

            ticket.MediaClient.unshift(multipleFiles._id)

            savedFile = await multipleFiles.save();
        }); 
        // let files = await Upload.find({ForTicket: req.body.id})

        // for( let i=0; i<files.length; i++){
        //     fileArray = [...fileArray, files[i]._id]
        // }

        // ticket.MediaClient = [...ticket.MediaClient, ...fileArray]

        resData = await ticket.save()
        // console.log(resData)

        res.json({success: true, data:resData})
        
    }catch(error) {
        res.status(400).send(error.message);
    }
})

app.get('/download/:id', async (req,res) => {
    // console.log('Hello')
    try {
        let file = await Upload.findById(req.params.id)
        // console.log(file)
        var x = __dirname + '\\' +file.FilePath;
        res.download(x)
    } catch (error) {
        console.log(error)
    }
    
})