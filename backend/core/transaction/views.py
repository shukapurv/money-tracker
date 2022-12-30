from authentication.constants import current_month
from django.http import Http404
from django.http.response import HttpResponse
from django.template.loader import render_to_string
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *


class TransactionListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        try:
            results = (
                Transaction.objects.filter(id__in=UsersInTransaction.objects.filter(
                    user=request.user,
                ).values("transaction"))
                .order_by("-id")
            )

            serializer = TransactionSerializer(results, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(
                data={"message": "Unable to retrieve transactions"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def post(self, request):
        try:
            data = request.data
            category = Category.objects.get(id=data["category"])
            transaction = Transaction.objects.create(
                name=data["name"],
                amount=data["amount"],
                description=data["description"],
                category=category,
                created_by=request.user,
            )
            serializer = TransactionSerializer(transaction, many=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            return Response(
                data={"message": "Unable to create transaction"},
                status=status.HTTP_400_BAD_REQUEST,
            )


# class TransactionDetailView(APIView):
#     permission_classes = (IsAuthenticated,)

#     def get_object(self, pk):
#         try:
#             return Transaction.objects.get(pk=pk)
#         except Transaction.DoesNotExist:
#             raise Http404

#     def get(self, request, pk):
#         transaction = self.get_object(pk)
#         if request.user == transaction.user:
#             serializer = TransactionSerializer(transaction)
#             return Response(serializer.data)
#         else:
#             return Response(
#                 data={"message": "Forbidden, Not Authorized"},
#                 status=status.HTTP_401_UNAUTHORIZED,
#             )

#     def put(self, request, pk):
#         transaction = self.get_object(pk)
#         data = request.data
#         if request.user == transaction.user:
#             transaction.name = data["name"]
#             transaction.amount = data["amount"]
#             transaction.description = data["description"]
#             transaction.category_id = data["category"]
#             serializer = TransactionSerializer(transaction, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#         else:
#             return Response(
#                 data={"message": "Forbidden, Not Authorized"},
#                 status=status.HTTP_401_UNAUTHORIZED,
#             )

#     def delete(self, request, pk):
#         transaction = self.get_object(pk)
#         if request.user == transaction.user:
#             transaction.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         else:
#             return Response(
#                 data={"message": "Forbidden, Not Authorized"},
#                 status=status.HTTP_401_UNAUTHORIZED,
#             )
