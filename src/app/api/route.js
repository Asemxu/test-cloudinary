import fsPromises from 'fs/promises';
import path from 'path'

const filePath = path.join(process.cwd(), './src/app/data/info.json');
const jsonData = await fsPromises.readFile(filePath);
const objectData = JSON.parse(jsonData);

export async function GET() {
  return Response.json(objectData.images);
}

export async function POST(request){
  const data = await request.json()
  objectData.images.push({ url : data.path  , public_id : data.publicId})
  await fsPromises.writeFile('./src/app/data/info.json',JSON.stringify(objectData,null,2))
  return Response.json({
    status : true,
    message: "sended"
  })
}

export async function PUT(request){
  const data = await request.json()
  var elementFound = objectData.images.find( p => p.public_id === data.publicId)
  elementFound.url = data.urlNewPhoto
  await fsPromises.writeFile('./src/app/data/info.json',JSON.stringify(objectData,null,2))
  return Response.json({
    status : true,
    message: "updated"
  })
}