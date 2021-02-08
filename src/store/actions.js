import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
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
                resolve('添加购物车成功')
            } else {
                context.commit(ADD_COUNTER, id)
                resolve('当前购物车商品数量加1')
            }
        })
    }
}
