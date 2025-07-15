import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProductService } from '../adminservice/add-product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent  {
}