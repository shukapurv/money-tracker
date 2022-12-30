from django.urls import path

from . import views

app_name = "transaction"

urlpatterns = [
    path("", views.TransactionListView.as_view(), name="transaction_list"),
    # path("expense/<int:pk>/", views.ExpenseDetailView.as_view(),
    #      name="expense_detail"),
]
