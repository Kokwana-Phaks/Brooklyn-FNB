# turple are imutable, can not be change or modified
# allow duplicates
# suitable for storing coordinates or data that can not be changed during excution.

my_tuples = (1, 2, 3, 4, 5)

print(my_tuples)
print(my_tuples[0])
print(my_tuples[2])
print(my_tuples[-1])

turple1 = (1, 2, 3)
tuple2 =(4, 5,6) # can be also used in list 
rep_tuple = turple1 * 3 # repeat the turples

conc_tuple = turple1 + tuple2
print(conc_tuple)
print(rep_tuple)
