import { v4 as uuidv4 } from 'uuid';

export const getUUID = () => {
    let uuidtoken = localStorage.getItem('UUIDTOKEN')
    if (!uuidtoken) {
        const uuid = uuidv4()
        localStorage.setItem('UUIDTOKEN', uuid)
        uuidtoken = uuid
    }
    return uuidtoken
}