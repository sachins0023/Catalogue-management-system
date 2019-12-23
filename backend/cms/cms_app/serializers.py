from .models import Product, Brand, Category, Specifications
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
    Serialization of Product model
    '''
    category = CategorySerializer()
    brand = BrandSerializer()
    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'brand']
        
class SpecificationsSerializer(serializers.ModelSerializer):
    '''
    Serialization of Specifications model
    '''
    product = ProductSerializer()
    class Meta:
        model = Specifications
        fields = ['id', 'key', 'value', 'unit', 'product']