module.exports = ( redisClient, uid, cb ) => {
    if( redisClient && uid ){
        redisClient.hgetall( uid, ( err, obj )=>{
            if(err) {
                console.log(err);
                return
            }
            cb( obj )
        })
    } else cb(null)
}