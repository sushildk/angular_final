export class Rooms{
    _id:string;
    address:string;
    numberOfRoom: Number
    phoneNumber:string;
    price:string;
    description:string;
    categories:string;
    constructor(details:any){
        this._id =details._id || '';

        this.address =details.address || '';
        this.numberOfRoom = details.numberOfRoom || '';
        this.price = details. price || '';
        this.phoneNumber = details. phoneNumber || '';
        this.description = details.description || '';
        this.categories = details.categories || '';


    }
}