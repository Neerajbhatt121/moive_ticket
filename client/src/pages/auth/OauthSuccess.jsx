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

        console.log("token rrrrrrrrrrrrrr",searchParms)

        if(token !== null){
            const user = {name, email, profilePic};

            setAuth({user, token})
            localStorage.setItem('movie-auth', JSON.stringify({user, token}))
            console.log("auth localStorage here",localStorage.getItem('movie-auth'))
            navigate('/')

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
