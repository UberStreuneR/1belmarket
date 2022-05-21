import re

string = "asdfasdfasdgmail.com"

match = re.search(r'[\w.+-]+@[\w-]+\.[\w.-]+', string)
if match is None:
    print("nothing")
else:
    print(match.group(0))