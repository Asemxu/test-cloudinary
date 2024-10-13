'use client'
import { getCldImageUrl } from 'next-cloudinary';
import { useEffect , useState } from 'react'
import fetchLib from '../utils/fetchLib';
const useImages = () => {
    const [data, setData] = useState([]);

    const FetchData = async () => {
        const response = await fetchLib()
        const data = await response.json();
        setData(data);
      };

    useEffect(() => {
        FetchData();
    }, []);



    const saveImage = async (path , publicId) => {
        const response = await fetchLib('POST' , { path , publicId})
        FetchData()
    }

    const UpdateData = async (publicId,urlNewPhoto) => {
        const response = await fetchLib('PUT',{publicId , urlNewPhoto})
        FetchData()
    }

    const changeImage = (idPhoto) => {
        const urlNewPhoto = getCldImageUrl({
            src:idPhoto,
            replaceBackground: "Add random blood to the background",
        })

        UpdateData(idPhoto,urlNewPhoto)
    }

    return {
        changeImage,
        data,
        saveImage
    }
}


export default useImages