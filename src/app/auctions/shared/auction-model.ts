export class Auction{
    id: number
    name: string
    description: string
    startTime: Date
    endTime: Date
    imageUrl: string = "https://www.timberblock.com/wp-content/uploads/default-placeholder-300x300.png"
    categoryId: number
    supplierId: number
    buyNowPrice: number
    sold: boolean

}

