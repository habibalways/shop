//get elements
const product_form = document.getElementById('product-form');
const msg = document.querySelector('.msg');
const product_list = document.getElementById('product_list');
const single_product = document.querySelector('.single_product');
const product_udpate_form = document.getElementById('product-udpate-form');


//get all products
const getAllProducts = () => {
    const data = readLSData('Product');
    
    // chceck exits data
    if (!data) {
        product_list.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">No Product data found</td>
            </tr>
        `
    }
    //show all data in list
    if (data) {
        
        // init value
        let list = '';
        let final_amount = 0;
        // loop for product data show from localstorage
        data.map((item, index) => {
            final_amount += (item.price * item.quantity);
            list += `
            <tr>
                <td>${index + 1}</td>
                <td><img style="width:70px; height:70px; object-fit:cover; border-radius:4px;border:1px solid #ddd" src="${item.photo}" alt=""></td>
                <td>${item.name}</td>
                <td>${item.price} BDT</td>
                <td>${item.quantity}</td>
                <td>${item.price * item.quantity} BDT</td>
                <td>
                    <a class="btn btn-info btn-sm product_view" data-bs-toggle="modal"  product_index="${index}" href="#single_product_show"><i class="fas fa-eye"></i></a>
                    <a class="btn btn-success btn-sm product_edit"   product_index="${index}" href="#shop_modal_edite" data-bs-toggle="modal"><i class="fas fa-edit"></i></a>
                    <a class="btn btn-danger btn-sm product_delet"   product_index="${index} href=""><i class="fas fa-trash"></i></a>
                </td>
         </tr>
       
            `
        });
        list += ` <tr>
                <td colspan="6" class="text-end">total amount = ${final_amount} BDT</td>
                <td></td>
        </tr>`
        
        product_list.innerHTML = list;
    }

};
getAllProducts();
//submit product data
product_form.onsubmit = (e) => {
    
    e.preventDefault();
    //get form data from Formdata object
    let form_data = new FormData(e.target);
    let Product_data = Object.fromEntries(form_data.entries());
    let {name, price, photo, quantity} = Object.fromEntries(form_data.entries());
    
    
    // form validation
    if (!name|| !price || !photo || !quantity) {
        msg.innerHTML = setAlert('All fields are required!');
    } else {
        createLSdata('Product', Product_data);
        msg.innerHTML = setAlert('data stable', 'success');
        e.target.reset();
        getAllProducts();
    }
   
}
// daynamic single product show

product_list.onclick = (e) => {
    e.preventDefault();
    // product single view
    if (e.target.classList.contains('product_view')) {
        let index = e.target.getAttribute('product_index');
        let data = readLSData("Product");
        const { name, price, photo } = data[index];
        single_product.innerHTML = `
        <img style="width:300px; object-fit:cover; border-radius:4px;border:1px solid #ddd"  src="${photo}" alt="">
        <h3>${name}</h3>
        <p>Price:${price}</p>
        `
    }
    //product edite
    if (e.target.classList.contains('product_edit')) {
        let index = e.target.getAttribute('product_index');
    // get product value
    let data = readLSData('Product');
    let { name, photo, quantity, price } = data[index];
    //value set

 
    product_udpate_form.innerHTML=` <div class="my-3">
                        <label for="">Name</label>
                        <input name="name" value=${name} type="text" class="form-control">
                    </div>
                    <div class="my-3">
                        <label for="">Price</label>
                        <input name="price" value=${price} type="text" class="form-control">
                    </div>
                    <div class="my-3">
                        <label for="">Quantity</label>
                        <input name="quantity" value=${quantity} type="text" class="form-control">
                    </div>
                    <div class="my-3">
                        <label for="">Index</label>
                        <input name="index" value=${index} type="text" class="form-control">
                    </div>
                    <div class="my-3">
                        <img style="width:100%; margin:auto; display: block;  object-fit:cover; border-radius:4px;border:1px solid #ddd" src="${photo}" alt="">
                    </div>
                    <div class="my-3">
                        <label for="">Photo</label>
                        <input name="photo" value=${photo} type="text" class="form-control">
                    </div>
                    <div class="my-3">
                        <input type="submit" class="w-100 btn-primary btn" value="Update Now">
                    </div>
    `
    }
    // product delet
    if (e.target.classList.contains('product_delet')) {
        // get data index
        let index = e.target.getAttribute('product_index');
        let data = readLSData('Product');
        //delete index data
        data.splice(index, 1);
        // update data relaod
        updateLsdata('Product', data);
        getAllProducts();
        
    }
   
        
    
}

// update form submit
product_udpate_form.onsubmit = (e) => {
    e.preventDefault();
    // get form data
    const form_data = new FormData(e.target);
    let {name, photo, quantity,index,price} = Object.fromEntries(form_data.entries());
  
    //get all data
    let all_data = readLSData("Product");
    all_data[index] = { name, photo, quantity, index, price };
    //update your data
    updateLsdata('Product', all_data);
    getAllProducts();
}

