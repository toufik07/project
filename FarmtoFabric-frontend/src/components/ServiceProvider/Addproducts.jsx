import React from 'react'

export default function Addproducts() {
  return (
   <div className=" md:ml-64 p-2 shadow-md">
    <form class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Title</label>
          <input type="text" class="form-control border  border-dark" id="inputEmail4" value="" onChange={
            (e) =>{
            //  setTitle(e.target.value)
            }
          }/>
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Category</label>
          <select id="inputState" class="form-select border  border-dark" value="" onChange={
            (e) =>{
            //  setCat(e.target.value)
            }
          }>
            <option selected>Choose...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="inputAddress" class="form-label">Price</label>
          <input type="number" class="form-control border  border-dark" id="inputAddress" value="" onChange={
            (e) =>{
            //  setPrice(e.target.value)
            }
          }/>
        </div>
        <div class="col-md-4">
          <label for="inputAddress2" class="form-label">MRP</label>
          <input type="number" class="form-control border  border-dark" id="inputAddress2" value="" onChange={
            (e) =>{
            //  setMrp(e.target.value)
            }
          }/>
        </div>

        <div class="col-md-4">
          <label for="inputState" class="form-label">Image</label>
          <input type="url" name="" id="inputCity" class="form-control border  border-dark" value="" onChange={
            (e) =>{
            //  setImage(e.target.value)
            }
          }/>
        </div>
        <div class="col-md-8">
          <label for="inputCity" class="form-label">Description</label>
          <textarea name="" id="" cols="30" rows="5" class="form-control border  border-dark" value=""
          onChange={(e)=>{
            // setDesc(e.target.value)
          }}
          ></textarea>
        </div>
        <div class="col-md-12">
          <button type="submit" class="btn bg-blue-500 text-white hover:bg-blue-400" >Submit</button>
        </div>
      </form>
   </div>
  )
}
