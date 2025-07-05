#Unorded collection of units
#add and remove but dont allow duplicates

my_set = {1, 2, 3, 4, 5}
print(my_set)


my_set.add(6)
print(my_set)

my_set.remove(3)
print(my_set)

set1 = {1, 2, 3}
set2 = {3, 4, 5}

#union add both the set together and remove duplicate

union_set = set1.union(set2)
print(union_set)

#intersection, finds the common 

inte_set = set1.intersection(set2)
print(inte_set)

#difference,find the element that appear or present in a set but doesnt appear on the other set

dif_set = set1.difference(set2)
print(dif_set)

