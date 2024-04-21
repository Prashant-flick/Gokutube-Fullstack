import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import conf from './conf/config.js'
import bodyParser from 'body-parser'

const app = express()

app.use(cors({
    origin: ['https://gokutube-frontend.vercel.app','https://gokutube.vercel.app',conf.corsOrigin],
    credentials: true,
    withCredentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://gokutube.vercel.app'); // Replace with your frontend domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.get("/", (req, res) => res.send("Express on Vercel"));


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: true, limit: '50mb'}))
app.use(express.static('public'))
app.use(cookieParser())


//router import 
import userRouter from './routes/user.router.js'
import videoRouter from './routes/video.router.js'
import subscriptionRouter from './routes/subscription.router.js'
import commentRouter from './routes/comment.router.js'
import playlistRouter from './routes/playlist.router.js'
import tweetRouter from './routes/tweet.router.js'
import likeRouter from './routes/like.router.js'

//routes delecration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/subscription", subscriptionRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/tweet", tweetRouter);
app.use("/api/v1/like", likeRouter);

export {app}