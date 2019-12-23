from .models import Product, Brand, Category
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    '''
    Serialization of Category model
    '''
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent_category', 'get_breadcrumbs']
        
class BrandSerializer(serializers.ModelSerializer):
    '''
    Serialization of Brand model
    '''
    class Meta:
        model = Brand
        fields = ['id', 'name']
        
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
