import axios from "axios";

export const apiInstance = axios.create({
    baseURL:'http://localhost:8000'
})

apiInstance.interceptors.response.use((response):any => {
    console.log('요청이 성공적으로 처리되었습니다.',response)
}, async (error) => {
    console.log(`${error.response.status} CODE ERROR!`)
    const refreshtoken = localStorage.getItem('refreshToken')
    console.log(refreshtoken)
    if (refreshtoken) {
        const response = await axios.post('http://localhost:8000/v1/auth/refresh',{'refresh':refreshtoken});
        
        console.log(response)

        const {accessToken, refreshToken} = response.data.data;

        console.log('accessToken :', accessToken, 'refreshToken :',refreshToken)
        localStorage.clear()
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        const originalRequest = error.config
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
        return apiInstance(originalRequest)
    };
        
    } 
)