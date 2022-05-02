from django import forms


class ExcelForm(forms.Form):
    file = forms.FileField()