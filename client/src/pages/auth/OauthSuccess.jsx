import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

const OauthSuccess = () => {
    const [searchParms] = useSearchParams();
    const {setAuth} = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        const token = searchParms.get('token')
        const email = searchParms.get('email')
        const name = searchParms.get('name')
        const profilePic = searchParms.get('profilePic')

        console.log("00000|||||||00000000 ", token, email, name, profilePic)

        if(token ){
           
                const user = {name, email, profilePic};
                setAuth({user, token})
                console.log({user, token}, "-->>>>> HERE LOOK FOR OAUTH <<<<<--")
                axios.defaults.headers.common["Authorization"] = token;
                console.log(axios.defaults.headers.common["Authorization"])
                localStorage.setItem('movie-auth', JSON.stringify({user, token}))
                localStorage.setItem('oauth-done', true);
        
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
           
            setTimeout(() => navigate('/'), 100);

        } else{
            navigate('/Login')
        }

        
    },[])

  return (
    <div>
        <h1>Logging.... through OAuth google</h1>
    </div>
  )
}

export default OauthSuccess
