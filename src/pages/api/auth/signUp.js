import axios from 'axios'
export default async ({email, fname, lname, password}) => {

    const body = {user: {
        email: email,
        password: password,
        fname: fname,
        lname: lname
      }
    }

   return await axios.post('http://localhost:3001/signup', body)
}