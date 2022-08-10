import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {CategoryService} from '../shared/service/category.service';
import {Category} from '../shared/models/category';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    constructor(private modalService: NgbModal, private fb: FormBuilder, private categoryService: CategoryService) {
    }
    categories: Category;

    ngOnInit() {
        this.categoryService.getAll().subscribe(categories => {
            this.categories = categories;
            console.log(categories);
        });
    }
}
