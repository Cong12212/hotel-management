import apiService from '../service/utils/axiosCustomize';


const getAllRooms = () => {
    return apiService.get('api/rooms')
    .then(res=>{
        return {
            data: res.data
        }
    })
    .catch(err=>{
        return {
            data: null,
            err
        }
    })
}
// const postCreateNewRoom = () => {}
export default { getAllRooms };