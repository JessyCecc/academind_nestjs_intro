export class Product {
    // public -> will automatically set this.id, this.title, ...
    constructor(public id: string,
                public title: string,
                public desc: string,
                public price: number
    ) {};
}