from django.shortcuts import render
from .serializers import ProductSerializer, BrandSerializer, CategorySerializer, ProductCreateSerializer, CategoryCreateSerializer, BrandCreateSerializer
from .models import Product, Brand, Category
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status

# Create your views here.

class CategoryViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = Category.objects.all()
        category = get_object_or_404(queryset, pk=pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = CategoryCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
class BrandViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Brand.objects.all()
        serializer = BrandSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = Brand.objects.all()
        brand = get_object_or_404(queryset, pk=pk)
        serializer = BrandSerializer(brand)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = BrandCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class ProductViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Product.objects.all()
        brand = request.query_params.get('brand', None)
        if brand:
            queryset = queryset.filter(brand__id=int(brand))
        category = request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__id= int(category))
            categories = Category.objects.filter(parent_category__id=category)
            i = 0
            while(i < len(categories)):
                categories = list(categories) + list(Category.objects.filter(parent_category__id=categories[i].id))
                queries = Product.objects.all().filter(category__id= int(categories[i].id))
                queryset = [*queryset,*queries]
                i+=1
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = Product.objects.all()
        product = get_object_or_404(queryset, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = ProductCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception= True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
