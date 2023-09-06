import crypto from 'crypto';
import {Snowflake, SnowflakeOpts} from "nodejs-snowflake";
import {getCountUser} from "../models/user";

const SECRET = 'ANTONIO-REST-API';

export const authentication = (salt: string, password: string): string => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

export const random = () => crypto.randomBytes(128).toString('base64');
export  const renderId = () =>{
    // const snowflakeOpts: SnowflakeOpts = {
    //     instance_id: 2,
    // };
    // const n = new Snowflake(snowflakeOpts);

    for (let i = 0; i < 1000000; i++) {
        const count = getCountUser() ;
        console.log("count",count );
        return count;
    }
}
