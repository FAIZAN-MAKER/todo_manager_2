from django.urls import path
from .views import TaskListCreateView, TaskDetailView

urlpatterns = [
    path('', TaskListCreateView.as_callable() if hasattr(TaskListCreateView, 'as_callable') else TaskListCreateView.as_view()),
    path('<int:pk>/', TaskDetailView.as_callable() if hasattr(TaskDetailView, 'as_callable') else TaskDetailView.as_view()),
]