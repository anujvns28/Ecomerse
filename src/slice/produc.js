import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    value: [],
    cart:localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
    wishlist:localStorage.getItem("wishlist") 
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
    recentlyView : localStorage.getItem("recentlyView")
    ? JSON.parse(localStorage.getItem("recentlyView"))
    : [],
    cartTotalPrice : []
}
export const counterSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFilterProduct(state, value) {
            state.product = value.payload
        },
        addToCart(state, value) {
        const pro = value.payload;  
        const index =   state.cart.findIndex((item) => item._id === pro._id)
        if(index === -1){
            state.cart.push(value.payload)
            toast.success('Shouse Added')
            localStorage.setItem("cart", JSON.stringify(state.cart))   
        }else{
            toast.error("Shouse Alredy in cart")
        }
        },
        removeCart(state,value){
        const index = state.cart.findIndex((item) => item._id === value.payload._id)    
        state.cart.splice(index,1)   
        localStorage.setItem("cart",JSON.stringify(state.cart))   
        },

        addToWishlist(state,value) {
         const product = value.payload;
         const index = state.wishlist.findIndex((item) => item._id === product._id);
         if(index === -1){
            state.wishlist.push(product);
            toast.success("Shouse Added To Wishlist");
            localStorage.setItem("wishlist",JSON.stringify(state.wishlist))
         }else{
            toast.error("Shouse Alredy in Wishlist");
         }
        },
        removeToWishlist(state,value){
            const product = value.payload;
            const index = state.wishlist.findIndex((item) => item._id === product._id);
            state.wishlist.splice(index,1);
            localStorage.setItem("wishlist",JSON.stringify(state.wishlist))
        },
        addToRecentlyView(state,value){
            const product = value.payload;
            const index = state.recentlyView.findIndex((item) => item._id === product._id);
            if(index === -1 ){
               if(state.recentlyView.length <= 5){
                state.recentlyView.splice(0,0,product);
               localStorage.setItem("recentlyView",JSON.stringify(state.recentlyView))
               }else{
                state.recentlyView.pop();
                state.recentlyView.splice(0,0,product);
                localStorage.setItem("recentlyView",JSON.stringify(state.recentlyView))
               }
            }
        },
        addPrice(state,value){
            let pro = value.payload;
            const index = state.cartTotalPrice.findIndex((item) =>(item.productId ===pro.productId))
            console.log(index,"pringitn index ji")
            if(index >= 0){
                state.cartTotalPrice.splice(index,1,pro)
            }else{
                state.cartTotalPrice.push(pro)
            }
        },
        removePrice(state,value){
            let proId = value.payload;
            const index = state.cartTotalPrice.findIndex((item) =>(item.productId === proId))
            state.cartTotalPrice.splice(index,1);
        }

    }
        
})

// Action creators are generated for each case reducer function
export const {
    setFilterProduct,
    addToCart,
    removeCart,
    addToWishlist,
    removeToWishlist,
    addToRecentlyView,
    addPrice,
    removePrice
} = counterSlice.actions

export default counterSlice.reducer