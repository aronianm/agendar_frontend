
const payloadHeaders = () => {
    return {headers: {
                Authorization: `${sessionStorage['token']}`
           }}
}
export {payloadHeaders}