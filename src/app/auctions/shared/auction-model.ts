export class Auction{
    id: number
    name: string
    description: string
    startTime: Date
    endTime: Date
    imageUrl: string
    categoryId: number
    supplierId: number
    buyNowPrice: number
    sold: boolean

}

/*
id - Auktionens id
name - Auktionens namn
description - Auktionens beskrivning
startTime - Auktionens starttid
endTime - Auktionens sluttid
imageUrl - Auktionens bild
categoryId - Auktionens kategori id
supplierId - Auktionens leverantörs id
buyNowPrice - Auktionens acceptpris
sold - Om auktionen är såld eller inte 
*/