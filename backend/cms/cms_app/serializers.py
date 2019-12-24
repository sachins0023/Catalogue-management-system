from .models import Product, Brand, Category
from rest_framework import serializers

class ParentCategorySeralizer(serializers.ModelSerializer):
    '''
    Serialization of Parent Category model
    '''
    class Meta:
        model = Category
        fields = ['id', 'name']

class CategorySerializer(serializers.ModelSerializer):
    '''
    Serialization of Category model
    '''
    parent_category = ParentCategorySeralizer()
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent_category', 'count_products', 'get_breadcrumbs']

class CategoryCreateSerializer(serializers.ModelSerializer):
    '''
    Serialization of Category model
    '''
    class Meta:
        model = Category
        fields = ['name', 'parent_category']

class BrandCreateSerializer(serializers.ModelSerializer):
    '''
    Serialization of Brand model
    '''
    class Meta:
        model = Brand
        fields = ['id', 'name']

class BrandSerializer(serializers.ModelSerializer):
    '''
    Serialization of Brand model
    '''
    class Meta:
        model = Brand
        fields = ['id', 'name', 'count_products']
        
class ProductSerializer(serializers.ModelSerializer):
    '''
    Serialization of Product model for listing
    '''
    category = CategorySerializer()
    brand = BrandSerializer()
    specifications = serializers.JSONField()
    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'brand', 'specifications']
        
class ProductCreateSerializer(serializers.ModelSerializer):
    '''
    Serialization of Product model only for creation
    '''
    specifications = serializers.JSONField()
    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'brand', 'specifications']
