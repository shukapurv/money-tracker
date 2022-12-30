from django.urls import path

from . import views

app_name = "category"

urlpatterns = [
    path("", views.CategoryListView.as_view(), name="category_list"),
    path("<int:pk>/", views.CategoryDetailView.as_view(),
         name="category_detail"),
]
