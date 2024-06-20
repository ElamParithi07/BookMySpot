import axios from "axios";

export async function createnewtoken(email) {
    try {
        const token = localStorage.getItem('refreshToken');
        if (!token) {
            alert('Refresh Token Not found. Login again');
            return;
        }
        const response = await axios.post('http://localhost:8083/auth/refreshuser', { email, token });
        const responseData = response.data;
        console.log(responseData.authtoken);
        localStorage.setItem('authtoken', responseData.authtoken);
        console.log("new token created!");
    } catch (error) {
        alert(error);
        console.log(error);
    }
}
