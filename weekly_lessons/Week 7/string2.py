#Advanced Concepts - strings 

message = "HELLO, WORLD, is yours"

#index

'''
print(message [0])
print(message[1])
print(message[-1])

'''

# find the length 

'''
print(len(message))
'''

print(message.strip()) #Remove leading and trailling whitespace
print(message.lower()) #Convert all character to lowercase
print(message.split(',')) #split the string into a list based on the comma
print(message.upper()) #upper method

#replace method

text = "Hello World"
new_text = text.replace("World", "Python")
print(new_text)

#replace all occurance

text2 = "apple orange apple banana apple"
new_text2 = text2.replace("apple", "fruit")
print(new_text2)

#replace only a specific number of occurences(count parameter)

text3 = "apple orange apple bananan apple"
new_text3 = text3.replace("apple", "fruit", 2) #only firt 2 replacements
print(new_text3)