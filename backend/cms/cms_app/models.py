from django.db import models
import jsonfield
# Create your models here.


class Category(models.Model):
    '''
    Category model has a tree structure connected to parent_category field which is a foreign to Category itself.
    The name of different category objects are unique.
    This will be displayed using breadcrumbs in the frontend
    '''
    
    name = models.CharField(max_length=250, help_text= "The name of the field should be unique", unique= True)
    parent_category = models.ForeignKey("Category", null=True, blank=True, on_delete= models.CASCADE, help_text= "This can be null")
    date_created = models.DateTimeField(auto_now_add=True, help_text= "When category was created")
    last_modified = models.DateField(auto_now=True, help_text= "When category was last modified")
    
    def __str__(self):
        '''
        Returns the category with the category name.
        '''
        return self.name

    def count_products(self):
        return Product.objects.filter(category=self).count()
    
    def get_breadcrumbs(self):
        '''
        Returns a list of the breadcrumbs
        '''
        breadcrumbs = []
        category = self
        
        while category.parent_category:
            breadcrumbs.append(category.name)
            category = category.parent_category
        breadcrumbs.append(category.name)
        breadcrumbs.reverse()
        
        return breadcrumbs
    

class Brand(models.Model):
    '''
    Brand model has name unique.
    '''
    name = models.CharField(max_length=250, unique= True)
    date_created = models.DateTimeField(auto_now_add=True, help_text= "When brand was created")
    last_modified = models.DateField(auto_now=True, help_text= "When brand was last modified")
        
    def __str__(self):
        '''
        Returns the brand with the brand name.
        '''
        return self.name

    def count_products(self):
        return Product.objects.filter(brand=self).count()
    
    
class Product(models.Model):
    '''
    Product model has name unique.
    category and brand are foreign keys to Category and Brand models.
    Product can have multiple specifications. 
    '''
    name = models.CharField(max_length=250, unique= True, help_text= "The name of the product which is unique")
    date_created = models.DateTimeField(auto_now_add=True, help_text= "When product was created")
    last_modified = models.DateField(auto_now=True, help_text= "When product was last modified")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, help_text= "The category the product belongs to")
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, help_text= "The brand the product belongs to")
    specifications = jsonfield.JSONField()
    
    def __str__(self):
        '''
        Returns the product with the product name.
        '''
        return self.name
    
