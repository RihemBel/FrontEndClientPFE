// // Products
// export interface Product {
//     id?: number;
//     title?: string;
//     description?: string;
//     type?: string;
//     brand?: string;
//     collection?: any[];
//     category?: string;
//     price?: number;
//     sale?: boolean;
//     discount?: number;
//     stock?: number;
//     new?: boolean;
//     quantity?: number;
//     tags?: any[];
//     variants?: Variants[];
//     images?: Images[];
// }
//
// export interface Variants {
//     variant_id?: number;
//     id?: number;
//     sku?: string;
//     size?: string;
//     color?: string;
//     image_id?: number;
// }
//
// export interface Images {
//     image_id?: number;
//     id?: number;
//     alt?: string;
//     src?: string;
//     variant_id?: any[];
// }

import {CategoryEntity, ImageEntity, ItemEntity, MarkEntity, ProductEntity, SubCategoryEntity} from './product.entity';
import {any} from 'codelyzer/util/function';
import {newArray} from '@angular/compiler/src/util';

export class Product {
    id?: number;
    title?: string;
    description?: string;
    type?: string;
    brand?: string;
    collection?: any[];
    category?: string;
    price?: number;
    sale?: boolean;
    discount?: number;
    stock?: number;
    new?: boolean;
    quantity?: number;
    tags?: any[];
    variants?: Variants[];
    images?: Images[];


    static fromProductEntity(productEntity: ProductEntity) {
        const dto = new Product();
        dto.id = productEntity.id;
        dto.title = productEntity.name;
        dto.description = productEntity.description;
        dto.type = SubCategoryDto.fromSubCategory(productEntity.subCategory).name;
        dto.brand = MarkDto.fromMark(productEntity.mark).name;
        dto.collection = null;
        dto.category = SubCategoryDto.fromSubCategory(productEntity.subCategory).name;
        dto.price = productEntity.price;
        dto.sale = false;
        dto.discount = null;
        dto.stock = productEntity.qttInStock;
        dto.new = false;
        dto.tags = null;
        dto.variants = Variants.fromVariant(productEntity);
        dto.images = Images.fromImage(productEntity) ;

        return dto;
    }
    static fromProductEntityWithQuantity(productEntity: ProductEntity, quantity: number) {
        const dto = new Product();
        dto.id = productEntity.id;
        dto.title = productEntity.name;
        dto.description = productEntity.description;
        dto.type = SubCategoryDto.fromSubCategory(productEntity.subCategory).name;
        dto.brand = MarkDto.fromMark(productEntity.mark).name;
        dto.collection = null;
        dto.category = SubCategoryDto.fromSubCategory(productEntity.subCategory).name;
        dto.price = productEntity.price;
        dto.sale = false;
        dto.discount = null;
        dto.stock = productEntity.qttInStock;
        dto.new = false;
        dto.quantity = quantity;
        dto.tags = null;
        dto.variants = Variants.fromVariant(productEntity);
        dto.images = Images.fromImage(productEntity) ;

        return dto;
    }
}




export class MarkDto {
    id: number;
    name: string;

    static fromMark(markEntity: MarkEntity) {
        const dto = new MarkDto();
        dto.id = markEntity.id;
        dto.name = markEntity.name;

        return dto;
    }
}
export class CategoryDto {
    id: number;
    name: string;

    static fromCategory(categoryEntity: CategoryEntity) {
        const dto = new CategoryDto();
        dto.id = categoryEntity.id;
        dto.name = categoryEntity.name;

        return dto;
    }
}
export class SubCategoryDto {
    id: number;
    name: string;
    category: CategoryDto;

    static fromSubCategory(subCategoryEntity: SubCategoryEntity) {
        const dto = new SubCategoryDto();
        dto.id = subCategoryEntity.id;
        dto.name = subCategoryEntity.name;
        dto.category = subCategoryEntity.category;

        return dto;
    }
}
export class Images {
    // tslint:disable-next-line:variable-name
    image_id?: number;
    id?: number;
    alt?: string;
    src: string;
    // tslint:disable-next-line:variable-name
    variant_id?: any[];

    static fromImage(productEntity: ProductEntity) {
        const zeroSymbol = '0';
        let listDto: Images[]= new Array();
        console.log('image ' + productEntity.image.length);
        // for (let i = 0; i < productEntity.image.length; i++) {
        const dto = new Images();
            dto.image_id = productEntity.id;
            dto.id = productEntity.id;
            dto.alt = null;
            dto.src = productEntity.image;
            // @ts-ignore
            // tslint:disable-next-line:triple-equals
            dto.variant_id = productEntity.item.filter(f => f.id != zeroSymbol).map(({id}) => id);
            listDto.push(dto);
        return listDto;
    }
}
export class Variants {
    // tslint:disable-next-line:variable-name
    variant_id?: number;
    id?: number;
    sku?: string;
    size?: string;
    color?: string;
    // tslint:disable-next-line:variable-name
    image_id?: number;

    static fromVariant(productEntity: ProductEntity) {
        // @ts-ignore
        let listDto: Variants[]= new Array();
        for (let i = 0; i < productEntity.item.length; i++) {
            let dto = new Variants();
            dto.variant_id = productEntity.item[i].id;
            dto.id = productEntity.item[i].id;
            dto.sku = productEntity.item[i].sku;
            dto.size = '';
            dto.color = '';
            dto.image_id = productEntity.id;
            // @ts-ignore
            listDto.push(dto);
        }

        return listDto;
    }
}

