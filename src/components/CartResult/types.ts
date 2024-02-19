export type CartItem =
  | {
      title: string
      amount: number
      unit: string
      totalPrice?: number
    }
  | {
      title: string
      isLoading: true
    }
