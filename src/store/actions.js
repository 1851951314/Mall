import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
    addCart(context, payload) {
        let arr = context.state.cartList
        let id = -1
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].iid === payload.iid) {
                id = i
                break
            }
        }
        if (id == -1) {
            context.commit(ADD_TO_CART, payload)
        } else {
            context.commit(ADD_COUNTER, id)
        }
    }
}
