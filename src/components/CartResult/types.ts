export type CartItem =
  | {
      title: string
      amount: number
      unit: string
      id: number
      price: number
      totalPrice?: number
      link: string
    }
  | {
      title: string
      isLoading: true
    }
