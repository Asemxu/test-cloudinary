const fetchLib = async (method = 'GET',body = {}) => {
    var response
    if(method === 'GET')
        response = await fetch("/api/")
    else
        response = await fetch("/api/", {
            method,
            body : JSON.stringify(body)
        })

    return response
}

export default fetchLib