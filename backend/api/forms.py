from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
import re

class ExcelForm(forms.Form):
    file = forms.FileField()


class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()

    def clean(self):
        cleaned_data = super().clean()

        cleaned_email = self.cleaned_data.get('email')
        # email_match = re.search(r'[\w.+-]+@[\w-]+\.[\w.-]+', cleaned_email)
        if cleaned_email is None:
            raise forms.ValidationError("Incorrect email")
        cleaned_password1 = self.cleaned_data.get('password1')
        cleaned_password2 = self.cleaned_data.get('password2')
        if cleaned_password1 != cleaned_password2:
            raise forms.ValidationError("Passwords don't match")
         

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']