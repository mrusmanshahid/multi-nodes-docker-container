import * as redis from 'redis';
import { Product } from './../interfaces';
const redisClient = redis.createClient({port: 6379});

redisClient.on('connect', () => {
    console.log('Redis Client connected');
})

redisClient.on('error', (err: any) => console.log(`Something went wrong ${err}`));

const getCachedData: any = (key: any) => {
    return new Promise((resolve) => {
        redisClient.get(key, (err, data) => {
            resolve({
                data: data,
                cachekey: key,
            })
        })
    })
}

const setCacheData = (key: any, value: Array<Product>) => {
    redisClient.setex(key, 600, JSON.stringify(value));
}

export {
    getCachedData,
    setCacheData
}