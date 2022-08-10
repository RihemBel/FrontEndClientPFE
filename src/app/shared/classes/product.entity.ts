import {Images, MarkDto, Product, SubCategoryDto, Variants} from './product';

export class ProductEntity {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    hasVariant?: boolean;
    sku?: string;
    qttInStock?: number;
    subCategory?: SubCategoryEntity;
    mark?: MarkEntity;
    image?: string;
    item?: ItemEntity[];

//     static fromProduct(product: Product) {
//     const dto = new ProductEntity();
//     dto.id = product.id;
//     dto.name = product.title;
//     dto.description = product.description;
//     dto.subCategory.name = product.type;
//     dto.mark.name = product.brand;
//     dto.price = product.price;
//     dto.qttInStock = product.stock;
//     dto.item = ItemEntity.fromVariant(product);
//     dto.images = ImageEntity.fromImage(product);
//
//     return dto;
// }
}


export interface SubCategoryEntity {
    id: number;
    name: string;
    category: CategoryEntity;
}

export interface CategoryEntity {
    id: number;
    name: string;
}

export interface ImageEntity {
    id: number;
    name: string;
    avatar: string;

//     static fromImage(product: Product) {
//     const zeroSymbol = '0';
//     let listDto: ImageEntity[]= new Array();
//     console.log('image ' + product.image.length);
//     // for (let i = 0; i < productEntity.image.length; i++) {
//     const dto = new Images();
//     dto.id = productEntity.id;
//     dto.alt = null;
//     dto.src = productEntity.image;
//     // @ts-ignore
//     // tslint:disable-next-line:triple-equals
//     dto.variant_id = productEntity.item.filter(f => f.id != zeroSymbol).map(({id}) => id);
//     listDto.push(dto);
//     return listDto;
// }
}
export interface ItemEntity {
    id: number;
    name: string;
    description: string;
    price: string;
    qttInStock: string;
    sku: string;
    image: ImageEntity;
}

export interface MarkEntity {
    id: number;
    name: string;
}
