const express = require('express')
const ipfsAPI = require('ipfs-api');
const multer = require('multer');
const mime    =   require('mime');
const Web3 = require('web3')
const fs = require('fs');
const bodyParser = require('body-parser');


const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' })

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // Set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
}
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//MULTER CONFIG: to get file photos to temp server storage
// const multerConfig = {

//     storage: multer.diskStorage({
//         //Setup where the user's file will go
//         destination: function (req, file, next) {
//             next(null, './public/photo-storage');
//         },

//         //Then give the file a unique name
//         filename: function (req, file, next) {
//             console.log(file);
//             const ext = file.mimetype.split('/')[1];
//             next(null, file.fieldname + '-' + Date.now() + '.' + ext);
//         }
//     }),

//     //A means of ensuring only images are uploaded. 
//     fileFilter: function (req, file, next) {
//         if (!file) {
//             next();
//         }
//         const image = file.mimetype.startsWith('image/');
//         if (image) {
//             console.log('photo uploaded');
//             next(null, true);
//         } else {
//             console.log("file not supported");
//             app.post('/upload', multer(multerConfig).single('photo'), function (req, res) {
//                 res.send('Complete!');
//             });
//             //TODO:  A better message response to user on failure.
//             return next();
//         }
//     }
// };

var storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
    }
  });
var upload = multer({ storage : storage }).array('userPic');


app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
app.use('/', express.static(__dirname + '/public'));

app.get('/addfile', function (req, res) {
    const fileBuffer = req.file;

    ipfs.files.add(fileBuffer, function (err, file) {
        if (err) {
            console.log(err);
        }
        console.log(file)
    })

})
app.post('/upload', function (req, res) {
    upload(req,res,function(err) {
        console.log(req.body.user);
	    console.log(req.body.email);
		console.log(req.files); 
	});
    console.log('Complete!');
});

app.post('/getfile', function (req, res) {

    //This hash is returned hash of addFile router.
    const validCID = req.hashCode;

    ipfs.files.get(validCID, function (err, files) {
        files.forEach((file) => {
            console.log(file.path)
            console.log(file.content.toString('utf8'))
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

