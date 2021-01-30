import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
    [ADD_COUNTER](state, payload) {
        state.cartList[payload].count++
    },
    [ADD_TO_CART](state, payload) {
        payload.count = 1;
        payload.checked = true
        state.cartList.push(payload);
    }
}
