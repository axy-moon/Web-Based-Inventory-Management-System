/*

---> id in Pop up
----> Other in type

*/


import React, { useState,useRef,useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from "primereact/checkbox";
import { Dialog } from 'primereact/dialog';
import Axios from "axios";

import { Toast } from 'primereact/toast';

import ImageUploader from "../commonComponents/ImageUploader";



import "primereact/resources/themes/tailwind-light/theme.css"; 
import '../css/product.css'
import { type } from "@testing-library/user-event/dist/type";





const AddProduct = () => {
    const toast = useRef(null);
    const [id,setId] = useState(null);


    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Product Details Inserted Successfully', life: 2000});
    }
    const [selectedCat, setSelectedCat] = useState(null);
    const [newType,setNewType] = useState(null);
    const [newCat,setNewCat] = useState(null);
    const [visible, setVisible] = useState(false);
    const [totalCost,setTotalCost] = useState('');
    const [categoryList,setCategoryList] = useState([]);
    const [categoryListHasValue,setCategoryListHasValue] = useState(false)
    const [typeList,setTypeList]=useState([])
    const [typeListHasValue,setTypeListHasValue] = useState(false)

    const [CategoryOther,setCategoryOther] = useState(false);
    const [ItemTypeOther,setItemTypeOther] = useState(false);

    useEffect(() => {
        Axios.post("http://localhost:8000/uniqueCategory").then((res)=>{
          var arr=res.data.category;
          console.log('length',arr.length)
          if(arr.length){
            console.log(res.data.category);
            //categoryList.push(res.data.category);
            setCategoryList(res.data.category);
            setCategoryList((prevItems) => [...prevItems, "Others"])
            setCategoryListHasValue(true);
            handleCategory()
          }
          else{
            categoryList.length=0;
            setCategoryListHasValue(false);
          }
        })
    }, [selectedCat]);

    useEffect(() => {
        Axios.post("http://localhost:8000/uniqueCategory").then((res)=>{
          var arr=res.data.category;
          console.log('length',arr.length)
          if(arr.length){
            console.log(res.data.category);
            //categoryList.push(res.data.category);
            setCategoryList(res.data.category);
            setCategoryList((prevItems) => [...prevItems, "Others"])
            setCategoryListHasValue(true);
            handleCategory()
          }
          else{
            categoryList.length=0;
            setCategoryListHasValue(false);
          }
        })
    }, [selectedCat]);

    const handleCategory = () => {
      if( selectedCat === "Others"){
          setCategoryOther(true);
          setItemTypeOther(true);
      }
      else{
          setCategoryOther(false);
      }
        Axios.post("http://localhost:8000/getUniqueItemtype",{
          itemcategory: selectedCat
        }).then((res)=>{
            var arr=res.data.item_type;
            if(arr.length){
              console.log(res.data.item_type);
              //typeList.push(res.data.item_type);
              setTypeList(res.data.item_type)
              setTypeList((prevItems) => [...prevItems, "Others"])
              setTypeListHasValue(true);
              handleItemType()
            }
            else{
              typeList.length=0;
              setTypeListHasValue(false);
            }
          })
  } 

    const handleItemType = (e) =>{
      setSelectedType(e.target.value)
      if(selectedType === "Others"){
        setItemTypeOther(true) 
      }
      else{
        setItemTypeOther(false);
      }
    }

    const [rent, setRent] = useState(false);
    const [sales, setSales] = useState(false);


    const handleCheck = () => {
        setRent(!rent)
    }
    const handleCheckSales = () => {
        setSales(!sales)
    }



    const [selectedType, setSelectedType] = useState(null);


    //Form Values
    const [purchaseCost,setPurchaseCost] = useState('');
    const [quantity,setQuantity] = useState('');
    const [notes,setNotes] = useState('');
    const [depositAmount,setDepositAmount] = useState('');
    const [salesPrice,SetSalesPrice] = useState('');
    const [productID,setProductID] = useState('');


    const handleSubmit = (e) => {
        setVisible(false)

       

        var itemCategory;
        var itemType;
        if(CategoryOther) {
          itemCategory = newCat;
          itemType = newType; }
        else {
          itemCategory = selectedCat;
          itemType = selectedType; }
          

        setTotalCost(purchaseCost * quantity);
        console.log(selectedCat)
        console.log(selectedType)
        console.log("Purchase Cost",purchaseCost)
        console.log("Product ID",productID)
        console.log("Quantity",quantity)
        console.log("Total Cost",totalCost)
        console.log("Notes",notes)
        console.log("Deposit Amount",depositAmount)
        console.log("Sales Price",salesPrice)
        console.log("New Cat: " , newCat);
        console.log("New Type: ", newType)
        Axios.post("http://localhost:8000/genId").then((res) => {
          id = "PRD" + res.data.seq1;
          if(rent == true && sales == true){
            Axios({
              method:"post",
              url:"http://localhost:8000/addProduct",
              data:{

                item_category: itemCategory,
                item_type: selectedType,
                product_id:id,
                purchase_cost: purchaseCost,
                notes: notes,
                quantity: quantity,
                rent: rent,
                sales: sales,
                deposit_amt: depositAmount,
                sales_amt: salesPrice,
              }
            }).then((response)=>{
              showSuccess();
            })
          }
          else if(rent == true && sales == false){
            Axios({
              method:"post",
              url:"http://localhost:8000/addProduct",
              data:{
                item_category: itemCategory,
                item_type: itemType,
                product_id:id,
                purchase_cost: purchaseCost,
                notes: notes,
                quantity: quantity,
                rent: rent,
                sales: sales,
                deposit_amt: depositAmount,
              }
            }).then((response)=>{
              showSuccess();
            })
          }
          else if(rent == false && sales == true){
            Axios({
              method:"post",
              url:"http://localhost:8000/addProduct",
              data:{
                item_category: itemCategory,
                item_type: itemType,
                product_id:id,
                purchase_cost: purchaseCost,
                notes: notes,
                quantity: quantity,
                rent: rent,
                sales: sales,
                sales_amt: salesPrice,
              }
            }).then((response)=>{
              showSuccess();
            })
          }
      
        })
      

        }

        
          
    const popup =(e)=> {
        e.preventDefault()

        setVisible(true)
    }

    const clearForm = () => {
        setSelectedCat(null);
        setSelectedType(null);
        setProductID('');
        setPurchaseCost('');
        setQuantity('');
        setNotes('');
        setDepositAmount('');
        SetSalesPrice('');
        setRent(false);
        setSales(false);
    }

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={handleSubmit} autoFocus />
        </div>
    );



    return(

        <div className="addprod">
        <Toast ref={toast} />

        <h2>ADD PRODUCT</h2>
        <form>
        <div className="ap-grid">
        <div className="card flex flex-column md:flex-row top gap-3">

            <div className="bsform">
            <div className="flex-1 p-inputgroup">
                <Dropdown value={selectedCat}  onChange={(e)=>setSelectedCat(e.target.value)} options={categoryList}
                    placeholder="Select a Category" className="dp"/>
            </div>

            { CategoryOther && <div className="p-inputgroup flex-1">
             <span className="p-inputgroup-addon">
                    <i className="pi pi-bookmark-fill"></i>
                </span>
                <InputText   value={newCat} placeholder="New Category" onChange={(e)=>setNewCat(e.target.value)}  />
            </div>}


           


            

             { ItemTypeOther && <div className="p-inputgroup flex-1">
             <span className="p-inputgroup-addon">
                    <i className="pi pi-tag"></i>
                </span>
                <InputText value={newType} placeholder="New Item Type" onChange={(e)=>setNewType(e.target.value)} />
            </div>}

           <div className="flex-1 p-inputgroup">
            <Dropdown value={selectedType}  options={typeList}  onChange={handleItemType} placeholder="Select a Type" className="dp"/>
             </div>

             {/* <div className="p-inputgroup flex-1">
             <span className="p-inputgroup-addon">
                    <i className="pi pi-hashtag"></i>
                </span>
                <InputText placeholder="Product ID" onInput={(e)=>setProductID(e.target.value)}/>
            </div> */}

             <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon" style={{'color':'black'}}>₹</span>
                <InputText placeholder="Purchase Cost" onInput={(e)=>setPurchaseCost(e.target.value)}/>
                <span className="p-inputgroup-addon">/unit</span>
            </div>

            <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
                    <i className="pi pi-angle-double-right"></i>
                </span>
                <InputText placeholder="Quantity" onInput={(e)=>setQuantity(e.target.value)}  />
            </div>

            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                <span class="material-symbols-outlined gicon">payments</span>
                </span>
                <InputText disabled placeholder="Total Cost" value={quantity * purchaseCost} required />
            </div>

            <div className="p-inputgroup-check flex-1">
                        <Checkbox className="check" name="check"  onChange={handleCheck} checked={rent}></Checkbox>
                        <label for="check">Rent</label>
                        <Checkbox className="check" name="check" onChange={handleCheckSales} checked={sales}></Checkbox>
                        <label for="check">Sales</label>
                    </div>
                    {rent &&
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">₹</span>
                        <InputText placeholder="Deposit Amount"  onInput={(e) => setDepositAmount(e.target.value)}  />
                    </div>}
                    {sales && 
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">₹</span>
                        <InputText placeholder="Sales Price"  onInput={(e) => SetSalesPrice(e.target.value)} />
                    </div> }
                    <div className="flex-1" style={{'marginTop' : '30px'}}>
                    <span className="p-float-label">
                        <InputTextarea id="notes" onInput={(e) => setNotes(e.target.value)} rows={4} cols={35} />
                        <label htmlFor="notes">Notes</label>
                    </span>
                    </div>

                    <div className="fbtns">
                    <Button label="Cancel" severity="danger" raised icon="pi pi-times" onClick={clearForm} />
                    <Button label="Add" raised severity="success" icon="pi pi-check" onClick={popup}  />
                    </div>
            
            </div>


            </div>
            

             <Dialog header="Product Details" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <div className="dialog-span">
                    <span>Product ID: {id}</span>
                    <span> Purchase Cost : {purchaseCost}</span> 
                    <span>Quantity : {quantity}</span> 
                    <span> Total Cost : { purchaseCost*quantity } </span>
                </div>
            </Dialog> 































            <div className="card flex flex-column md:flex-row gap-3 bflex">
                <div className="lform">
                   
                </div>
                <div className="rform">
                    
                    

                </div>
            </div>

        </div>

        {/* <div className="card flex flex-wrap justify-content-center gap-3">
        <Button label="Add Product" icon="pi pi-plus"/>
        
        </div>
 */}
        </form>
        </div>
    );
}

export default AddProduct;