const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

const PORT = config.get('port')



app.use(express.json({
    extended: true
}))
//  1:34:00

// регистрация роутеров,которые по-разному будут отработывать запросы 
app.use('/api/auth', require('./routes/authRouter'))
app.use('/api/post', require('./routes/postRouter'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => { // любой get запрос
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start() {
    try {

        await mongoose.connect(config.get('mongoUrl'), {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true, // commented out currently
            //useNewUrlParser: true, useUnifiedTopology:true
        }, () => { console.log("work");
         })

        // mongoose
        //     .connect(config.get('mongoUrl'), {
        //         useUnifiedTopology: true,
        //         useNewUrlParser: true,
        //     })
        //     .then(() => console.log('DB Connected!'))
        //     .catch(err => {
        //         console.log(`DB Connection Error: ${err.message}`);
        //     });

        //     mongoose.connect(config.get('mongoUrl'), {useNewUrlParser: true})
        // .then(()=>console.log("DB server connect"))
        // .catch(e => console.log("DB error", e));


        app.listen(PORT, () => console.log("work"))
    } catch (error) {
        console.log("error ", error)
        process.exit(1) // выйти из процесса nodejs
    }
}

start();