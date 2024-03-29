import 'dotenv/config';
import { connectDB } from './db/postgres.js';
import {app} from './app.js';

connectDB();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running at port : ${process.env.PORT}`);
})

