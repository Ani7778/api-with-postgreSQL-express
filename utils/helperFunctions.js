const extractSequlizeResponse = function (data){
    if(data instanceof Array){
        if(data[0]){
            return data[0];
        }
    }
}

module.exports = {
    extractSequlizeResponse
}
