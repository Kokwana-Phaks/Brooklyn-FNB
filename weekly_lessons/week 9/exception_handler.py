#Exception handling makes your code more robust and user-friendly by gracefully handling errors rather than crashing.
#the else block will run only if no exception ran

try:
    print(x)
except NameError:
    print("variable x is not defined")
else:
    print("Everything went wrong")
    
x = -1 

if x < 0:
    raise Exception ("Sorry, no numbers below zero")