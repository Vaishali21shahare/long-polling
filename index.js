const express = require('express');

const app = express();

let data = "Initial data";
const waitingList = [];
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

app.get('/getData', (req, res) => {
    if(data !== req.query.lastData) {
        res.json({data});
    } else {
        waitingList.push(res);
    }
});

//Use post/put
app.get('/updateData', (req, res) => {
    data = req.query.data;

    while(waitingList.length > 0) {
        const client = waitingList.pop();
        client.json({ data })
    }

    res.send({
        success: 'Data updated successfully'
    })
});

const port = process.env.PORT || 5011;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});