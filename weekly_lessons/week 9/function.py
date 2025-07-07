#Structure code and reuse it 

def greet(name):
    print(f"Hello, {name}")


greet("VUSI")


def add(a, b):
    return a + b

result = add(4, 5)

print(result)

def factorial(n):
    if n == 0:
        return 1
    else:
        return n*factorial(n-1)
    

def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}")
    

greet("james")

def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}")
    
greet("david", "Good Morning")