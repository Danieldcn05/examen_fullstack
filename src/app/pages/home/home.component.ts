import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {

  categories: any[] = [];

  slides: any[] = [];

  selectedCategory: string = '';
  
  currentSlide = 0;

  isModalOpen = false;
  email: string = '';

  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    this.recipeService.getCategories().subscribe((data: any) => {
          this.categories = data.meals; 
          console.log(this.categories);
        });
  }

  getRecipesWithEvent(event: Event) {

    const target = event.target as HTMLSelectElement;
    const value = target.value;
    console.log(value);

    this.recipeService.getRecipesByCategory(value).subscribe((data: any) => {
      this.slides = data.meals;
      console.log(this.slides);
    });
  }

  getRecipes(category: string) {
    this.recipeService.getRecipesByCategory(category).subscribe((data: any) => {
      this.slides = data.meals;
      console.log(this.slides);
    });
  }

  getRandomRecipe() {
    this.recipeService.getRandomRecipe().subscribe((data: any) => {
      console.log(data);
      this.selectedCategory = data.meals[0].strCategory;
      this.getRecipes(this.selectedCategory);
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  sendRecipe() {
    this.closeModal();
  }
}