import { renderOrderSumary } from "../javascript/checkout/orderSummary.js";
import { loadFromStorage, cart} from "../data/cart.js";
import { loadProductsBackend, loadProductFetch } from "../data/products.js";

describe('case suite: renderOrderSummary', () => {

    beforeAll((done) => {
        loadProductFetch().then(() => {
            done();
        })
    });

    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    beforeEach(() => {

        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-payment-summary"></div>
        <div class="js-order-summary"></div>
        `;
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId : productId1,
                quantity : 2,
                deliveryOptionId: '1'
            }, {
                productId : productId2,
                quantity : 1,
                deliveryOptionId: '2'
            }]);
        });
        loadFromStorage();

        renderOrderSumary();
    });

        //test1
    it('display in the cart', () => {
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');

        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');
    });

    //test2
    it('remove item from cart', () => {
        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    });
});

