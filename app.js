var express     = require('express'),
    app         = express();

require('./mongo');

app.set('port' , process.env.PORT || 5000)
const port = app.get('port');

app.get('/', (req , res)=>{
    res.send('<h1>Hello Provide Me Service</h1>')
})

 app.listen(port , ()=>{
     console.log('Server Port >>', port);
 })   