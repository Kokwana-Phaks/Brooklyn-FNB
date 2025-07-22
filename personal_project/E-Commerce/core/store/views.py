from django.shortcuts import render
from .models import Product

# Create your views here.

def product_list(request):
    products = Product.objects.filter(available=True)
    return render(request, 'store/product/list.html', {'products': products})

