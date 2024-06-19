const a = [
    {
        supper : "s1",
        farmer : "f1",
        lot : "l1",
    },
    {
        supper : "s1",
        farmer : "f2",
        lot : "l2",
    },
    {
        supper : "s2",
        farmer : "f3",
        lot : "l3",
    },
    {
        supper : "s2",
        farmer : "f3",
        lot : "l1",
    },
]


const alls = [];
a.reduce((acc: object,obj) => {
  if (obj.supper in acc) {
  } else {
    alls.push(obj.supper)
    acc[obj.supper] = 1;
  }
  return acc
})

console.log(alls)


let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

let nameCounts = names.reduce((accumulator, currentValue) => {
  if (currentValue in accumulator) {
    accumulator[currentValue]++;
  } else {
    accumulator[currentValue] = 1;
  }
  return accumulator;
}, {});

// Output: { Alice: 2, Bob: 1, Tiff: 1, Bruce: 1 }



const nameR = [{arun:[]},{dinesh:[]}]