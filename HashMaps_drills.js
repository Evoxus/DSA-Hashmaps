const { HashMap } = require("./hashmap");

function main() {
  const lotr = new HashMap();

  lotr.MAX_LOAD_RATIO = 0.5;
  lotr.SIZE_RATIO = 3;

  lotr.set("Hobbit", "Bilbo");
  lotr.set("Hobbit", "Frodo");
  lotr.set("Wizard", "Gandalf");
  lotr.set("Human", "Aragorn");
  lotr.set("Elf", "Legolas");
  lotr.set("Maiar", "The Necromancer");
  lotr.set("Maiar", "Sauron");
  lotr.set("RingBearer", "Gollum");
  lotr.set("LadyOfLight", "Galadriel");
  lotr.set("HalfElven", "Arwen");
  lotr.set("Ent", "Treebeard");

  console.log("Hashmap after set: \n", JSON.stringify(lotr));
  /* Print your hash map and notice the length and items that are hashed in your hash map. Have you hashed
   * all the items you were asked to?
   * - No, it didn't.
   * Retrieve the value that is hashed in the key "Maiar" and Hobbit.
   */
  console.log("Retrieve Maiar key: ", lotr.get("Maiar"));
  console.log("Retrieve Hobbit key: ", lotr.get("Hobbit"));
  /* What are the values of Maiar and Hobbit that you have? Is there a discrepancy? Explain your answer.
   * The values of the above print are "Sauron" an "Frodo".
   * There is a discrepancy, as far as I can tell, because the first values for "Maiar" and "Hobbit" are
   * being overwritten because of a matching key. The later value is replacing the original key's value.
   * What is the capacity of your hash table after you have hashed all the above items? Explain your answer.
   * It is 24. This is because it has run through one _resize() and has tripled the size from 8 to 24.
   * This is because we set the SIZE_RATIO = 3.
   */

  /*  WhatDoesThisDo
 * DO NOT run the following code before solving the problem.
 *
 * What is the output of the following code? explain your answer.
 *
const WhatDoesThisDo = function(){
  let str1 = 'Hello World.';
  let str2 = 'Hello World.';
  let map1 = new HashMap();
  map1.set(str1,10);
  map1.set(str2,20);
  let map2 = new HashMap();
  let str3 = str1;
  let str4 = str2;
  map2.set(str3,20);
  map2.set(str4,10);

  console.log(map1.get(str1));
  console.log(map2.get(str3));
}
 * This function is going to print the values from the 2 maps. On the first line we will get: 20
 * the next will be: 10; This is again because right now if a key matches the value is being overwritten
 * by the later value being assigned.
*/

  /* 4. Remove duplicates
   * Implement a function to delete all duplicated characters in a string and keep only the first occurrence
   * of each character. For example, if the input is string “google”, the result after deletion is “gole”.
   * Test your program with a sentence as well such as "google all that you think can think of".
   */

  function removeDuplicateChar(string) {
    let unique = {};
    for (let i = 0; i < string.length; i++) {
      unique[string[i]] = string[i];
    }
    return Object.values(unique).join("");
  }

  console.log("**** removeDuplicateChar test cases ****");
  console.log("test case: 'google' -> ", removeDuplicateChar("google"));
  console.log(
    "test case: 'google all that you think can think of' -> \n",
    removeDuplicateChar("google all that you think can think of")
  );

  /* 5. Any permutation a palindrome
   * Write an algorithm to check whether any permutation of a string is a palindrome. Given the string
   * "acecarr", the algorithm should return true, because the letters in "acecarr" can be rearranged to
   * "racecar", which is a palindrome. In contrast, given the word "north", the algorithm should return false,
   * because there's no way to rearrange those letters to be a palindrome.
   */

  function anyPalindrome(string) {
    let letterCounts = {};
    let letter;
    let palindromeSum = 0;
    for (let i = 0; i < string.length; i++) {
      letter = string[i];
      letterCounts[letter] = letterCounts[letter] || 0;
      letterCounts[letter]++;
    }
    for (let letterCount in letterCounts) {
      palindromeSum += letterCounts[letterCount] % 2;
    }

    return palindromeSum < 2;
  }

  console.log("**** anyPalindrome test cases ****");
  console.log('test: "acecarr" -> ', anyPalindrome("acecarr"));
  console.log('test: "north" -> ', anyPalindrome("north"));
  console.log('test: "dad" -> ', anyPalindrome("dad"));
  console.log('test: "adcthenadcneht" -> ', anyPalindrome("adcthenadcneht"));

  /* 6. Anagram grouping
   * Write an algorithm to group a list of words into anagrams. For example, if the input was ['east', 'cars',
   * 'acre', 'arcs', 'teas', 'eats', 'race'], the output should be: [['east', 'teas', 'eats'], ['cars', 'arcs'],
   * ['acre', 'race']].
   */

  function anagramGroup(list) {
    let hash = {};

    list.forEach((string) => {
      let letters = string.split("").sort();
      hash[letters] ? hash[letters].push(string) : (hash[letters] = [string]);
    });

    const keys = Object.keys(hash);
    const values = keys.map(function (value) {
      return hash[value];
    });
    return values;
  }

  console.log("**** anagramGroup test cases ****");
  console.log(
    `test case: "['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']" \n`,
    anagramGroup(["east", "cars", "acre", "arcs", "teas", "eats", "race"])
  );

  /* 7. Separate Chaining
   * Write another hash map implementation as above, but use separate chaining as the collision resolution
   * mechanism.
   *
   * Test your hash map with the same values from the lotr hash map.
   */

  class HashMapSeparate extends HashMap {
    constructor() {
      super();
      this.buildChains();
    }
    buildChains() {
      for (let i = 0; i < this._hashTable.length; i++) {
        this._hashTable[i] = new Array();
      }
    }
  
    showDistro() {
      for (const key in this.table) {
        if(this._hashTable[key][0] !== undefined) {
          console.log(key, ' : ', this._hashTable[key]);
        }
      }
    }
  
    set(key, value) {
      const pos = HashMap._hashString(key) % this._capacity;
      let index = 0;
      if((this._hashTable[pos] === undefined) || this._hashTable[pos][index] === undefined) {
        this._hashTable[pos][index] = {
          key,
          value,
          DELETED: false,
        };
      } else {
        ++index;
        while (this._hashTable[pos][index] !== undefined ) {
          index++;
        }
        this._hashTable[pos][index] = {
          key,
          value,
          DELETED: false,
        };
      }
    }
  
    get(key) {
      const pos = HashMap._hashString(key);
      let index = 0;
      while (this._hashTable[pos][index] != key) {
        if(this._hashTable[pos][index] !== undefined) {
          return this._hashTable[pos][index]
        } else {
          return undefined;
        }
        index++;
      }
    }
  }
  console.log('**** separate chaining hashmap test case ****')
  const lotr2 = new HashMapSeparate();

  lotr2.MAX_LOAD_RATIO = 0.5;
  lotr2.SIZE_RATIO = 3;

  lotr2.set("Hobbit", "Bilbo");
  lotr2.set("Hobbit", "Frodo");
  lotr2.set("Wizard", "Gandalf");
  lotr2.set("Human", "Aragorn");
  lotr2.set("Elf", "Legolas");
  lotr2.set("Maiar", "The Necromancer");
  lotr2.set("Maiar", "Sauron");
  lotr2.set("RingBearer", "Gollum");
  lotr2.set("LadyOfLight", "Galadriel");
  lotr2.set("HalfElven", "Arwen");
  lotr2.set("Ent", "Treebeard");

  console.log("Hashmap after set: \n", JSON.stringify(lotr));
}

main();
