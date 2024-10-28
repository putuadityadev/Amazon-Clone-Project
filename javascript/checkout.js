import {renderOrderSumary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import { loadProductsBackend, loadProductFetch } from "../data/products.js";
import { updateCartItemsQuantity } from "../data/cart.js";
//import "../data/cart-class.js";
//import "../data/backend-pratice.js";

async function loadPage() {
    await loadProductFetch();
    renderOrderSumary();
    renderPaymentSummary();
    updateCartItemsQuantity();
    console.log('load Page Succes')
}

loadPage();
/*
loadProductFetch().then(() => {
    renderOrderSumary();
    renderPaymentSummary();
});
*/
/*
loadProductsBackend(() => {
    renderOrderSumary();
    renderPaymentSummary();
});
*/