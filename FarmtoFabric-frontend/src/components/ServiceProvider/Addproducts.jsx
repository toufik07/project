import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function AddProducts() {
  const [title, setTitle] = useState('');
  const [desc, setDescription] = useState('');
  const [mrp, setMrp] = useState();
  const [price, setPrice] = useState();
  const [image,setImageFile] = useState(null)
  let { id , name , pid} = useParams()
  const nevigate = useNavigate()


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image); // Append image file
    formData.append('desc', desc);
    formData.append('mrp', mrp);
    formData.append('price', price);
    formData.append('sid',id);

    if(pid){
       handleUpdate(formData)
    }
    else{
      axios.post('http://localhost:5000/products', formData ,{
        headers: { 'Content-Type': 'multipart/form-data' }, // This is important for file upload
      })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message)
          setTitle('')
          setImageFile(null)
          setDescription('')
          setPrice('')
          setMrp('')
        })
        .catch((err) => {
          console.error('Error uploading the product:', err);
        });
      }
  };

  const handleUpdate =(formData) => {
    axios.put('http://localhost:5000/product/' + pid, formData,{
      headers: { 'Content-Type': 'multipart/form-data' },})
      .then((res) => {
        alert(res.data.message);
         nevigate('/sprovider/'+id +'/' + name + '/products');  // Navigate back to the product list
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });

  }

  useEffect(() => {
    if (pid) {
      axios.get('http://localhost:5000/product/' + pid)
        .then((res) => {
          console.log(res.data);
           setTitle(res.data[1])
          // setCat(res.data[3])
          setDescription(res.data[2])
          setPrice(res.data[5])
          setMrp(res.data[4])
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  },[])

  return (
    <div className="md:max-w-4xl p-6 bg-white rounded-md md:mx-auto">
      <div className="text-left">
        <div className="mb-4">
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="col-span-2">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Image <span className="text-red-500">*</span>
              </label>
              <input type="file" onChange={handleImageChange} />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={desc}
            onChange={(event) => setDescription(event.target.value)}
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                MRP <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                value={mrp}
                onChange={(event) => setMrp(event.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Save
        </button>
      </div>
    </div>
  );
}
