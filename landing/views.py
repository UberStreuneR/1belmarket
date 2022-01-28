from django.shortcuts import render

# Create your views here.
from django.views.generic import View

class TestView(View):
    def get(self, *args, **kwargs):
        context = {
            "title": "home"
        }
        return render(self.request, "landing/test.html", context=context)