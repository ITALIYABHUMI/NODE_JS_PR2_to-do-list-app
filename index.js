const express = require('express')

const port = 8500;

const app = express();

app.set('view engine', 'ejs');
 
app.use(express.urlencoded());

let record = [
    {
        no: "1",
        name: "name",
        status: "on going",
    }
];
  
app.get('/', (req, res) => {
    return res.render('index', {
        record  
    })
})
    

app.get('/deletedata', (req, res) => {
    no = req.query.no;
    let ans = record.filter((val) => {
        if (val.no != no) {
            return val;
        }
    })
    record = ans;
    return res.redirect('back')
}) 

app.get('/addData', (req, res) => {
    return res.render('add') 
});

app.get('/editdata', (req, res) => {
    no = req.query.no;
    let singlerecord = record.filter((val) => {
        if (val.no == no) {
            return val;
        }
    })
    return res.render('edit', {
        single : singlerecord[0]
    });
});

app.post('/data', (req, res) => {
    let obj = {
        no: req.body.no, 
        name: req.body.name,
        status: req.body.status,
    }
    record.push(obj);
    return res.render('index',{
        record
    })
})
 
app.post('/upadtedata', (req, res) => {
    no :req.query.no;
    let u_data = record.filter((val) => {
        if (val.no == no) {
           val.no = req.body.no;
           val.name = req.body.name;
           val.status = req.body.status;
        }
        return val;
    }) 
    record = u_data;
    return res.redirect('/');
}) 

app.listen(port, (error) => {
    if (error) {
        console.log("server not start");
        return false;
    }
    console.log("server start : " + port);
});