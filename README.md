# 1. Ans : 

### These all are used to declare variables. But there's a nuance between them . 

* var : oldest version for declaring variable . var is function-scoped , can be reassigned and redeclared . 

* let : let is block-scoped , cannot be redeclared in same scope  but can be reassigned .

* const : it's also block-scoped . cannot be redeclared or reassigned.  more preferable if there is  no need to reassign. 


# 2. Ans : 

### The spread operator (...) spreads elements of an array, object, or string into individual items.

## Main uses:

* Combine arrays/objects. 
    
* Pass array elements as function arguments .




# 3. Ans : 

* map() : creates a new array by applying a function to each element . Returns a new  array of the same length . 

* filter() : creates a new array with elements that pass a condition . Return a new array with filtered elements .

* forEach() : executes a function on each array element . Return undefined. 



# 4. Ans : 

### Arrow function is a shorter syntax for writing functions in JavaScript. Introduced in ES6 . 


## Old version for writing function : 

```javascript
function add(a,b){
return a+b ; 
}

Arrow function : 

const add = (a,b) =>{
return a+b; 
};
```


# 5.Ans : 

### Template literals are string literals that allow multiline strings and embed variables with ${} using backticks  ( `  ) instead of quotes(" ") .  

## Example : 
```javascript
const name = "Ahmed";
const age = 30;

const message = `Hello, my name is ${name} and I am ${age} years old .`;
```
