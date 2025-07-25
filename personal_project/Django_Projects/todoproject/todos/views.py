from django.shortcuts import render, redirect
from .models import Task
from django.http import HttpResponse


# Create your views here.

def task_list(request):
    tasks = Task.objects.all()
    return render(request, 'todos/task_list.html', {'tasks': tasks})
    
def add_task(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        Task.objects.create(title=title)
        return redirect('task_list')
    return render(request, 'todos/add_task.html')

def delete_task(request, task_id):
    task = Task.objects.get(id=task_id)
    task.delete()
    return redirect('task_list') 
   
    
def task_list(request):
    return HttpResponse("Basic test") 



