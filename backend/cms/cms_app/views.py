from django.shortcuts import render
from .serializers import ProductSerializer, BrandSerializer, CategorySerializer, SpecificationsSerializer
from .models import Product, Brand, Category, Specifications
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
        serializer = CategorySerializer(data=request.data)
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
        serializer = BrandSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class ProductViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Product.objects.all()
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = Product.objects.all()
        product = get_object_or_404(queryset, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    
    def create(self, request):
        pass
    
class SpecificationsViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Specifications.objects.all()
        serializer = SpecificationsSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = Specifications.objects.all()
        specifications = get_object_or_404(queryset, pk=pk)
        serializer = SpecificationsSerializer(specifications)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = SpecificationsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)