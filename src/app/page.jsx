"use client";
import { Fragment, useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { ToastContainer, toast  , Bounce} from 'react-toastify';
import useImages from "./hooks/useImages";

export default function Home() {
  const { data , saveImage , changeImage } = useImages()
  return (
    <div className="container m-auto py-4">
      <h1 className="font-bold">Listado de mis imagenes</h1>
      <CldUploadButton
        className="btn bg-white text-black rounded-md px-4 py-2 mb-4"
        uploadPreset="test-ia"
        onSuccess={(result, { widget }) => {
          toast.success('File Uploaded!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          saveImage(result.info.url,result.info.public_id)
        }}
        onError={(result,{ widget}) => {
          toast.error('File Failed!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(error)
        }}
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles: 1,
          language: "es",
          text: {
            es: {
              or: "O",
  
              menu: {
                files: "Subir desde tu dispositivo",
              },
              local: {
                browse: "Seleccionar",
                dd_title_single: "Arrastra tu imagen aquí",
              },
            },
          },
        }}
      />
      <div className="grid grid-cols-4 gap-5">
        {data.map((test, i) => {
          return (
            <div className="relative" key={i} style={{maxHeight:"500px"}}>
              <picture  className="rounded absolute">
                <img className="object-cover" src={test.url} alt="Image"  style={{height:"100%",width:"100%"}}/>
              </picture>
              <button onClick={() => changeImage(test.public_id)} className="absolute rounded text-black bg-white px-3 py-1 t right-0 shadow-lg shadow-black-500/40">change</button>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
}
