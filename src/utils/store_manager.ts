const saveToken = (token: string) =>{
    localStorage.setItem("token",token)
}
const getToken = ()=>{
    return localStorage.getItem("token")
}
const saveRefreshToken = (refreshToken: string)=>{
    localStorage.setItem("refreshToken",refreshToken)
}
const getRefreshToken = ()=>{
    return localStorage.getItem("refreshToken")
}
export {
    getRefreshToken,
    saveRefreshToken,
    getToken,
    saveToken
}