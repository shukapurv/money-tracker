from django.urls import path

from .views import *

app_name = "transaction"

urlpatterns = [
    path("", TransactionListView.as_view(), name="transaction_list"),
    path("<int:pk>/", TransactionDetailView.as_view(),
         name="expense_detail"),
    path("relation/", AllTransactionsUsersRelation.as_view(),
         name="transaction-user-relation")
]
