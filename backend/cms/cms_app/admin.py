from django.contrib import admin
from .models import Product, Brand, Category, Specifications

# Register your models here.

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'category')
    
    
@admin.register(Brand)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name',)
    
@admin.register(Category)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent_category',)
    
@admin.register(Specifications)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('key', 'value', 'unit', 'product')